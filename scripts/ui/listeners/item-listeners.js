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

    sheet.render(false);
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
}
