import { ArmorCalculate } from "../../data/rules/items/armor-calculations.js";
import { WeaponEquipped } from "../../data/rules/items/weapon-calculations.js";

export function InventoryListeners(sheet, html) {
  Items(sheet, html);
  EditItems(sheet, html);
}

function Items(sheet, html) {
  html.find(".weapon-equip-toggle").on("click", async (ev) => {
    const actor = sheet.actor;
    const itemId = ev.currentTarget.dataset.itemId;
    const item = sheet.actor.items.get(itemId);

    const current = item.system.equipped ?? false;

    // Unequip any other weapon aside from a shield.
    // const otherEquipped = actor.items.find(
    //   (i) =>
    //     i.type === "weapon" &&
    //     i.id !== itemId &&
    //     i.system.equipped &&
    //     i.system.weaponType !== "shield"
    // );

    // if (otherEquipped) {
    //   await otherEquipped.update({ "system.equipped": false });
    // }

    await item.update({
      "system.equipped": !current
    });

    await WeaponEquipped(actor, item);

    sheet.render(false);
  });

  html.find(".armor-equip-toggle").on("click", async (ev) => {
    const actor = sheet.actor;
    const itemId = ev.currentTarget.dataset.itemId;
    const item = actor.items.get(itemId);

    const current = item.system.equipped ?? false;
    const location = item.system.location;
    const armorClass = item.system.armorClass;

    // Make sure new armor is valid before proceeding, only if attempting to equip. Excluding Natural armor.
    if (!current && location !== "natural") {
      if (!ValidateArmor(actor, itemId, armorClass)) return;
    }

    //If validation succeeds, toggle equipped state and then send to armor-calculations.
    await item.update({ "system.equipped": !current });

    // Now recompute the section from scratch based on current flags
    await ArmorCalculate(actor);
    await sheet.render(false);
  });
}

function EditItems(sheet, html) {
  html.find(".item-edit").click((ev) => {
    const actor = sheet.actor;
    const itemId = $(ev.currentTarget).closest(".item-row").data("item-id");
    actor.items.get(itemId).sheet.render(true);
  });

  // Delete item
  html.find(".item-delete").click(async (ev) => {
    const actor = sheet.actor;
    const itemId = $(ev.currentTarget).closest(".item-row").data("item-id");
    const item = sheet.actor.items.get(itemId);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this item?</p>"
    });

    if (!confirmed) return;

    if (item.type === "armor") {
      // Be sure to un equip an equipped armor properly
      const oldArmorEquipped = actor.system.items.armor.find((i) => i._id === itemId).system
        .equipped;

      if (oldArmorEquipped) {
        // Old armor is still equipped, set equipped to false so it removed the supplied values.
        const location = item.system.location;
        await item.update({
          "system.equipped": false
        });
        await ArmorCalculate(actor);
      }
    }

    if (item.type === "weapon") {
      const oldWeaponEquipped = actor.system.items.weapons.find((i) => i._id === itemId)?.system
        .equipped;

      if (oldWeaponEquipped) {
        await item.update({ "system.equipped": false });
        await WeaponEquipped(actor, item);
      }

      const ammoRefs = item.system.ammo ?? [];

      if (ammoRefs.length > 0) {
        const ammoIds = ammoRefs.map((a) => a.id).filter((id) => !!id);

        // Delete the embedded ammo items
        await actor.deleteEmbeddedDocuments("Item", ammoIds);
      }
    }

    actor.deleteEmbeddedDocuments("Item", [itemId]);
  });
}

function ValidateArmor(actor, itemId, armorClass) {
  // Make sure when equipping armor, it does not exceed the allowed limit. Max 1 hard and 2 soft armor classes can be worn at the same time. Excluding Natural armor
  const softTotal = actor.items.filter(
    (i) =>
      i.type === "armor" &&
      i.id !== itemId && // Verify it's not the currently being modified item.
      i.system.armorClass === "soft" &&
      i.system.equipped &&
      i.system.location !== "natural"
  ).length;

  const hardTotal = actor.items.filter(
    (i) =>
      i.type === "armor" &&
      i.id !== itemId && // Verify it's not the currently being modified item.
      i.system.armorClass === "hard" &&
      i.system.equipped &&
      i.system.location !== "natural"
  ).length;

  // Check the current armor being equipped's armor class and see if equipping it will exceed the limit. Only if it's not already equipped.
  if (armorClass === "hard" && hardTotal + 1 > 1) {
    // Equipping armor will exceed the cap for hard armor class.
    ui.notifications.error(
      "Equipping this armor will exceed the maximum number of Hard equipment allowed."
    );
    return false;
  } else if (armorClass === "soft" && softTotal + 1 > 2) {
    // Equipping armor will exceed the cap for soft armor class.
    ui.notifications.error(
      "Equipping this armor will exceed the maximum number of Soft equipment allowed."
    );
    return false;
  }

  return true;
}
