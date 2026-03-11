import { ABF_SPELLS } from "../../config/spells.js";

export class AddSpellsWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-spells-window",
      title: "Add Spell",
      classes: ["abf-character-sheet", "add-spells"],
      template: "systems/abf-system/templates/actors/apps/add-spells.hbs",
      width: 500,
      height: "auto"
    });
  }

  getData() {
    return {
      spells: Object.values(ABF_SPELLS) // [{name, level, path, ...}]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".confirm-add-spell").click(async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const spellName = html.find("#spell-select").val();
      const actor = game.actors.get(this.actorId);

      await this._addSpellToActor(actor, spellName);
      this.close();
    });
  }

  async _addSpellToActor(actor, spellName) {
    const pack = game.packs.get("abf-system.abf-items");
    if (!pack) {
      ui.notifications.error("Spell compendium not found.");
      return;
    }

    const index = await pack.getIndex();

    const entry = index.find((e) => e.name.toLowerCase() === spellName.toLowerCase());
    if (!entry) {
      ui.notifications.error(`Spell "${spellName}" not found in compendium.`);
      return;
    }

    const spellDoc = await pack.getDocument(entry._id);

    // 1. Add as embedded Item
    const created = await actor.createEmbeddedDocuments("Item", [spellDoc.toObject()]);
    const createdItem = created[0];

    // 2. Add reference to system.mystic.spells[]
    const spells = foundry.utils.duplicate(actor.system.mystic.spells ?? []);
    spells.push(createdItem.id);

    await actor.update({ "system.mystic.spells": spells });

    ui.notifications.info(`Added spell: ${spellName}`);
  }
}
