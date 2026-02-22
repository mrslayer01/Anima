import { ArmorEquipped } from "../../data/rules/items/armor-calculations.js";
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

    // Unequip any other armor in the same location
    const otherEquipped = actor.items.find(
      (i) =>
        i.type === "armor" && i.id !== itemId && i.system.location === location && i.system.equipped
    );

    if (otherEquipped) {
      await otherEquipped.update({ "system.equipped": false });
    }

    // Toggle this one
    await item.update({ "system.equipped": !current });

    // Now recompute the section from scratch based on current flags
    await ArmorEquipped(actor, location);

    sheet.render(false);
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
        await ArmorEquipped(actor, location);
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
