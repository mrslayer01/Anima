import { AddSpellsWindow } from "../windows/add-spells.js";

export function SpellsListeners(sheet, html) {
  // OPEN THE SELECT SPELL WINDOW
  html.find(".add-spell").click(() => {
    new AddSpellsWindow({
      actorId: sheet.actor.id
    }).render(true);
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

    // 1. Remove from system.mystic.spells[]
    const spells = foundry.utils.duplicate(actor.system.mystic.spells ?? []);
    spells.splice(index, 1);

    await actor.update({ "system.mystic.spells": spells });

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
}
