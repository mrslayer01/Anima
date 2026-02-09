import {
  PRICE_MODIFIERS,
  costToCopper,
  copperToCost,
  WEAPON_SIMILARITY_MODIFIERS
} from "./helpers/lookup.js";

export function registerSheetListeners(sheet, html) {
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

  html.find(".prim-attk-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.weapon.primaryAtkType": type
    });

    sheet.render(false);
  });

  html.find(".sec-attk-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.weapon.secondaryAtckType": type
    });

    sheet.render(false);
  });

  html.find(".modifier-select").on("change", async (ev) => {
    const name = ev.currentTarget.value;

    const modValue = WEAPON_SIMILARITY_MODIFIERS[name] ?? 0;

    await sheet.item.update({
      "system.weapon.modifier.name": name,
      "system.weapon.modifier.value": modValue
    });

    sheet.render(false);
  });
}
