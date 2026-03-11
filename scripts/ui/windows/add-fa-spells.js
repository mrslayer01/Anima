import { ABF_FREE_ACCESS_SPELLS } from "../../config/spells.js";

export class AddFASpellsWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-fa-spells-window",
      title: "Add Free Access Spell",
      classes: ["abf-character-sheet", "add-fa-spells"],
      template: "systems/abf-system/templates/actors/apps/add-spells.hbs",
      width: 650,
      height: "auto"
    });
  }

  getData() {
    const grouped = {};

    for (const spell of Object.values(ABF_FREE_ACCESS_SPELLS)) {
      const key = `${spell.minLevel}-${spell.maxLevel}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(spell);
    }

    return {
      groupedSpells: grouped,
      type: "freeAccess"
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".confirm-add").click(async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const spellName = html.find("#spell-select").val();
      const actor = game.actors.get(this.actorId);

      await this._addSpellToActor(actor, spellName);
      this.close();
    });

    html.find("#spell-select").on("change", (ev) => {
      const opt = ev.currentTarget.selectedOptions[0];

      html.find("#preview-name").text(opt.value);
      html.find("#preview-action").text(opt.dataset.action);
      html.find("#preview-cost").text(opt.dataset.cost);
      html.find("#preview-maintenance").text(opt.dataset.maintenance);
      html.find("#preview-added").text(opt.dataset.added);
      html.find("#preview-effect").html(opt.dataset.effect);

      this.setPosition({ height: "auto", width: this.options.width });
    });

    const select = html.find("#spell-select");
    // Select the first option
    const first = select.find("option").first();
    if (first.length) {
      select.val(first.val());
      select.trigger("change"); // populate preview
    }
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

    // 2. Add reference to system.mystic.freeAccessSpells[]
    const fa = foundry.utils.duplicate(actor.system.mystic.freeAccessSpells ?? []);
    fa.push(createdItem.id);

    await actor.update({ "system.mystic.freeAccessSpells": fa });

    ui.notifications.info(`Added Free Access spell: ${spellName}`);
  }
}
