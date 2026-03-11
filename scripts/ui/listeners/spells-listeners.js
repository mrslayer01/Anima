import { AddFASpellsWindow } from "../windows/add-fa-spells.js";
import { AddSpellsWindow } from "../windows/add-spells.js";

export function SpellsListeners(sheet, html) {
  // OPEN THE SELECT SPELL WINDOW
  html.find(".add-spell").click(() => {
    const win = new AddSpellsWindow({ actorId: sheet.actor.id });
    const data = win.getData();

    // Count how many spells are available across all paths
    const totalAvailable = Object.values(data.groupedSpells).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    if (totalAvailable === 0) {
      ui.notifications.warn("No spells are available to learn at your current Path levels.");
      return;
    }

    win.render(true);
  });

  // OPEN INDIVIDUAL SPELL SHEET
  html.find(".spell-entry").off("click");
  html.find(".spell-entry").click((ev) => {
    const id = ev.currentTarget.dataset.itemId;
    const item = sheet.actor.items.get(id);
    item.sheet.render(true);
  });

  // DELETE SPELL
  html.find(".delete-spell").off("click");
  html.find(".delete-spell").on("click", async (event) => {
    event.preventDefault();

    const index = Number(event.currentTarget.dataset.index);
    const itemId = event.currentTarget.dataset.itemId;
    const actor = sheet.actor;

    // Confirm dialog (same style as your other delete dialogs)
    const confirmed = await Dialog.confirm({
      title: "Delete Spell",
      content: "<p>Are you sure you want to remove this spell?</p>"
    });

    if (!confirmed) return;

    // 1. Remove from system.mystic.spells[] and system.mystic.activeSpells
    let spells = foundry.utils.duplicate(actor.system.mystic.spells ?? []);
    spells.splice(index, 1);

    await actor.update({ "system.mystic.spells": spells });

    spells = foundry.utils.duplicate(actor.system.mystic.activeSpells ?? []);
    spells.splice(index, 1);

    await actor.update({ "system.mystic.activeSpells": spells });

    // 2. Remove the embedded Item
    if (itemId) {
      await actor.deleteEmbeddedDocuments("Item", [itemId]);
    }
  });

  // TOGGLE ACTIVE FLAG ON A SINGLE SPELL
  html.find(".passive-icon.clickable.spell-active").off("click");
  html.find(".passive-icon.clickable.spell-active").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;
    const itemId = ev.currentTarget.dataset.itemId;
    const spell = actor.items.get(itemId);
    if (!spell) return;

    const isActive = spell.system.active === true;

    await actor.updateEmbeddedDocuments("Item", [
      {
        _id: itemId,
        "system.active": !isActive
      }
    ]);
  });

  // Free Access Spells

  // OPEN THE SELECT SPELL WINDOW
  html.find(".add-fa-spell").click(() => {
    const win = new AddFASpellsWindow({ actorId: sheet.actor.id });
    const data = win.getData();

    // Count how many spells are actually available
    const totalAvailable = Object.values(data.groupedSpells).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    if (totalAvailable === 0) {
      ui.notifications.warn("No Free Access spells are available to learn.");
      return;
    }

    win.render(true);
  });

  // DELETE SPELL
  html.find(".delete-fa-spell").off("click");
  html.find(".delete-fa-spell").on("click", async (event) => {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const actor = sheet.actor;

    const confirmed = await Dialog.confirm({
      title: "Delete Spell",
      content: "<p>Are you sure you want to remove this spell?</p>"
    });

    if (!confirmed) return;

    // 1. Get the spell BEFORE deleting it
    const spell = actor.items.get(itemId);
    const band = Number(spell.system.maxLevel);

    // 2. Decrement slot usage
    const slots = foundry.utils.duplicate(actor.system.mystic.freeAccessSpellSlots);
    if (slots[band]) {
      slots[band].current = Math.max(0, (slots[band].current ?? 0) - 1);
    }

    // 3. Remove from freeAccessSpells[] by ID (NOT index!)
    let fa = foundry.utils.duplicate(actor.system.mystic.freeAccessSpells ?? []);
    fa = fa.filter((id) => id !== itemId);

    // 4. Remove from activeSpells[] by ID
    let active = foundry.utils.duplicate(actor.system.mystic.activeSpells ?? []);
    active = active.filter((id) => id !== itemId);

    // 5. Update actor
    await actor.update({
      "system.mystic.freeAccessSpells": fa,
      "system.mystic.activeSpells": active,
      "system.mystic.freeAccessSpellSlots": slots
    });

    // 6. Delete the embedded Item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);
  });
}
