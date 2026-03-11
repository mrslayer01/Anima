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
      width: 650,
      height: "auto"
    });
  }

  getData() {
    const actor = game.actors.get(this.actorId);
    const grouped = {};

    // Normalize actor spell names
    const knownNames = new Set(
      actor.items
        .filter((i) => i.type.toLowerCase() === "spell")
        .map((i) => i.name.trim().toLowerCase())
    );

    for (const spell of Object.values(ABF_SPELLS)) {
      const path = spell.path ?? "Unknown";
      const spellLevel = spell.level ?? 0;

      // Normalize path key to match actor data
      const normalized = path.charAt(0).toUpperCase() + path.slice(1).toLowerCase();

      // Actor's current level in this path
      const actorPathLevel = actor.system.mystic.paths[normalized]?.level ?? 0;

      // Normalize spell name for duplicate detection
      const spellName = spell.name.trim().toLowerCase();

      // Skip duplicates
      if (knownNames.has(spellName)) continue;

      // Only show unlocked spells
      if (spellLevel <= actorPathLevel) {
        if (!grouped[normalized]) grouped[normalized] = [];
        grouped[normalized].push(spell);
      }
    }

    return {
      groupedSpells: grouped,
      type: "spell"
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
    const spellDoc = await GetSpell(spellName);

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

async function GetSpell(spellName) {
  const pack = game.packs.get("abf-system.abf-items");
  if (!pack) {
    ui.notifications.error("Spell compendium not found.");
    return;
  }

  const index = await pack.getIndex();

  // Find ALL entries with the same name
  const nameMatches = index.filter((e) => e.name.toLowerCase() === spellName.toLowerCase());

  if (nameMatches.length === 0) {
    ui.notifications.error(`Spell "${spellName}" not found in compendium.`);
    return;
  }

  // Load each matching document and pick the freeAccess one
  let spellDoc = null;

  for (const entry of nameMatches) {
    const doc = await pack.getDocument(entry._id);
    if (doc.system.spellType === "Spell") {
      spellDoc = doc;
      break;
    }
  }

  if (!spellDoc) {
    ui.notifications.error(`Spell "${spellName}" exists, but no Free Access version was found.`);
    return;
  }

  // At this point spellDoc is the correct FA spell
  return spellDoc;
}
