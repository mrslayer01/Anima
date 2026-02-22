import { UpdateWeapon } from "../../data/rules/items/weapon-calculations.js";
import { WEAPON_SIMILARITY_MODIFIERS } from "../../utils/lookup.js";

export function ItemListeners(sheet, html) {
  html.find(".quality-select").on("change", async (ev) => {
    const quality = ev.currentTarget.value;

    await sheet.item.update({
      "system.quality.value": quality
    });

    sheet.render(false);
  });

  html.find(".currency-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.cost.type": type
    });

    sheet.render(false);
  });

  html.find(".availability-select").on("change", async (ev) => {
    const availability = ev.currentTarget.value;

    await sheet.item.update({
      "system.availability": availability
    });

    sheet.render(false);
  });

  html.find(".weapon-type").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.weaponType": type
    });

    //sheet.render(false);
  });

  html.find(".sec-weapon-type").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.secondaryWeaponType": type
    });

    sheet.render(false);
  });

  html.find(".prim-attk-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.primaryAtkType": type
    });

    sheet.render(false);
  });

  html.find(".sec-attk-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.secondaryAtkType": type
    });

    sheet.render(false);
  });

  html.find(".handling").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.handling": type
    });

    sheet.render(false);
  });

  html.find(".modifier-select").on("change", async (ev) => {
    const name = ev.currentTarget.value;

    const modValue = WEAPON_SIMILARITY_MODIFIERS[name] ?? 0;

    await sheet.item.update({
      "system.modifier.name": name,
      "system.modifier.value": modValue
    });

    sheet.render(false);
  });

  //Armor
  html.find(".armor-armorClass-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.armorClass": type
    });

    sheet.render(false);
  });

  html.find(".armor-location-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    // unequip the piece of armor.

    await sheet.item.update({
      "system.location": type
    });

    sheet.render(false);
  });

  html.find(".armor-is-enchanted").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".armor-is-enchanted").on("click", (ev) => {
    const actor = sheet.object;
    const enchanted = actor.system.isEnchanted;

    actor.update({
      "system.isEnchanted": !enchanted
    });

    sheet.render(); // refresh UI
  });

  html.find(".ammo-edit").click((ev) => {
    const row = $(ev.currentTarget).closest(".ammo-row");
    const ammoId = row.data("ammo-id");

    const weapon = sheet.item;
    const actor = weapon.actor;

    const ammoItem = actor.items.get(ammoId);
    if (!ammoItem) return ui.notifications.error("Ammo item not found.");

    ammoItem.sheet.render(true);
  });

  html.find(".ammo-equip-toggle").on("click", async (ev) => {
    const row = $(ev.currentTarget).closest(".ammo-row");
    const ammoId = row.data("ammo-id");

    const actor = sheet.actor;
    const item = sheet.actor.items.get(ammoId);

    const current = item.system.equipped ?? false;

    // Unequip any other weapon aside from a shield.
    const otherEquipped = actor.items.find(
      (i) => i.type === "ammo" && i.id !== ammoId && i.system.equipped
    );

    if (otherEquipped) {
      await otherEquipped.update({ "system.equipped": false });
    }

    await item.update({
      "system.equipped": !current
    });

    await UpdateWeapon(actor);

    sheet.render(false);
  });

  html.find(".ammo-delete").click(async (ev) => {
    const row = $(ev.currentTarget).closest(".ammo-row");
    const ammoId = row.data("ammo-id");

    const actor = sheet.actor;

    // Find the parent weapon ID from the row
    const parentItemId = row.closest("[data-item-id]")?.data("item-id");
    const parentItem = actor.items.get(parentItemId);

    if (!parentItem) {
      return ui.notifications.error("Parent weapon not found.");
    }

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this ammo?</p>"
    });

    if (!confirmed) return;

    // 1. Remove ammo reference from weapon.system.ammo[]
    const updatedAmmo = (parentItem.system.ammo ?? []).filter((a) => a.id !== ammoId);

    await parentItem.update({
      "system.ammo": updatedAmmo
    });

    // 2. Delete the embedded ammo item from the actor
    await actor.deleteEmbeddedDocuments("Item", [ammoId]);
  });
}
