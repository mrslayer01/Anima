import { DEFAULT_AMMO_DATA } from "../../config/default-item-data.js";
import { UpdateWeapon } from "../../data/rules/items/weapon-calculations.js";
import { WEAPON_SIMILARITY_MODIFIERS } from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";
import { TechniqueEffectBrowser } from "../windows/technique-effect-browser.js";
import { TechniqueEffectWindow } from "../windows/technique-effect-window.js";

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

  html.find(".path-select").on("change", async (ev) => {
    const path = ev.currentTarget.value;

    await sheet.item.update({
      "system.path": path
    });

    sheet.render(false);
  });

  html.find(".action-select").on("change", async (ev) => {
    const action = ev.currentTarget.value;

    await sheet.item.update({
      "system.action": action
    });

    sheet.render(false);
  });

  html.find(".spellType-select").on("change", async (ev) => {
    const spellType = ev.currentTarget.value;

    await sheet.item.update({
      "system.spellType": spellType
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

  html.find(".add-ammo").on("click", async (ev) => {
    const actor = sheet.actor;

    const name = await Dialog.prompt({
      title: "Create Ammo",
      label: "Ammo Name",
      callback: (html) => html.find("input").val(),
      content: `
      <p>Enter the name of the new ammo:</p>
      <input type="text" style="width:100%;" />
    `
    });

    if (!name) return;

    // 1. Create the ammo item on the actor
    if (!actor) {
      ui.notifications.error("Can only add ammo to a weapon belonging to a character!");
      return;
    }
    const [ammo] = await actor.createEmbeddedDocuments("Item", [
      {
        name,
        type: "ammo",
        system: foundry.utils.deepClone(DEFAULT_AMMO_DATA)
      }
    ]);

    // 2. Find the weapon this button belongs to
    const weaponId = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
    const weapon = actor.items.get(weaponId);

    if (!weapon) {
      ui.notifications.error("Could not find weapon to attach ammo.");
      return;
    }

    // 3. Append ammo ID to weapon.system.ammo[]
    const updatedAmmo = [...(weapon.system.ammo ?? []), { id: ammo.id }];

    await weapon.update({
      "system.ammo": updatedAmmo
    });

    ui.notifications.info(`Added custom ammo: ${name}`);

    sheet.render(false);
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
    sheet.render(false);
  });

  Techniques(sheet, html);
}

function Techniques(sheet, html) {
  html.find(".ki-is-active").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".ki-is-active").on("click", (ev) => {
    const item = sheet.object;
    const active = item.system.active;

    item.update({
      "system.active": !active
    });

    sheet.render(); // refresh UI
  });

  html.find(".technique-toggle-maintained").off("click");
  html.find(".technique-toggle-maintained").on("click", async (ev) => {
    const item = sheet.object;
    const index = Number(ev.currentTarget.dataset.index);

    const effects = foundry.utils.duplicate(item.system.effects);
    const current = effects[index].maintained;

    effects[index].maintained = !current;

    await item.update({ "system.effects": effects });

    sheet.render(false);
  });

  html.find(".ki-level-select").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.level": type
    });

    sheet.render(false);
  });

  html.find(".technique-primary-char-input").on("change", async (ev) => {
    const type = ev.currentTarget.value;

    await sheet.item.update({
      "system.primaryCharacteristic.char": type
    });

    sheet.render(false);
  });

  html.find(".technique-add-secondary").on("click", async (event) => {
    const item = sheet.object;
    const secondaries = foundry.utils.duplicate(item.system.secondaryCharacteristics);

    // Add a new blank entry
    secondaries.push({ char: "Agility", kiCost: 0 });

    await item.update({ "system.secondaryCharacteristics": secondaries });
  });

  html.find(".technique-secondary-char-input").on("change", async (event) => {
    const item = sheet.object;
    const index = toNum(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const secondaries = foundry.utils.duplicate(item.system.secondaryCharacteristics);
    secondaries[index].char = value;

    await item.update({ "system.secondaryCharacteristics": secondaries });
  });

  html.find(".technique-secondary-ki-input").on("change", async (event) => {
    const item = sheet.object;
    const index = toNum(event.currentTarget.dataset.index);
    const value = toNum(event.currentTarget.value);

    const secondaries = foundry.utils.duplicate(item.system.secondaryCharacteristics);
    secondaries[index].kiCost = value;

    await item.update({ "system.secondaryCharacteristics": secondaries });
  });

  html.find(".technique-secondary-delete").off("click");
  html.find(".technique-secondary-delete").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const item = sheet.object;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this secondary?</p>"
    });

    if (!confirmed) return;

    const secondaries = foundry.utils.duplicate(item.system.secondaryCharacteristics);

    secondaries.splice(index, 1);

    await item.update({ "system.secondaryCharacteristics": secondaries });
  });

  html.find(".technique-add-effect").on("click", async (ev) => {
    const item = sheet.object;
    new TechniqueEffectBrowser({
      actorId: sheet.actor.id,
      itemId: item.id
    }).render(true);
  });

  html.find(".technique-clickable-effect").on("click", (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const item = sheet.object;

    const effect = item.system.effects[index];

    new TechniqueEffectWindow(effect, item, {
      effectIndex: index
    }).render(true);
  });

  html.find(".technique-delete-effect").off("click");
  html.find(".technique-delete-effect").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const item = sheet.object;

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this effect?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    const effects = foundry.utils.duplicate(item.system.effects);
    const deletedEffectName = effects[index]?.name;

    // Remove the effect
    effects.splice(index, 1);

    await item.update({ "system.effects": effects });

    ui.notifications.info(`Removed Technique Effect: ${deletedEffectName}`);
  });

  html.find(".ammo-edit").click((ev) => {});

  html.find(".ammo-delete").click(async (ev) => {});
}
