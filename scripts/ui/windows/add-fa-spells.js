import { ABF_FREE_ACCESS_SPELLS } from "../../config/spells.js";
import { toNum } from "../../utils/numbers.js";

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
    const actor = game.actors.get(this.actorId);
    const slots = actor.system.mystic.freeAccessSpellSlots ?? {};

    // Build a set of FA spell names the actor already knows
    const knownNames = new Set(
      actor.items
        .filter((i) => i.type.toLowerCase() === "spell" && i.system.spellType === "freeAccess")
        .map((i) => i.name.trim().toLowerCase())
    );

    // Only include bands with available slots
    const unlockedBands = Object.entries(slots)
      .filter(([band, data]) => toNum(data.max) > 0 && toNum(data.current) < toNum(data.max))
      .map(([band]) => toNum(band));

    // Only include spells from bands with available slots
    let unlockedSpells = Object.values(ABF_FREE_ACCESS_SPELLS).filter((spell) =>
      unlockedBands.includes(toNum(spell.maxLevel))
    );

    // Filter out spells closed to ANY granting path
    // unlockedSpells = unlockedSpells.filter((spell) => {
    //   const band = toNum(spell.maxLevel);
    //   const slot = slots[band];

    //   const grantingPaths = (slot.path ?? []).map((p) => p.toLowerCase());
    //   const cp = spell.closedPaths ?? {};
    //   const closed = [(cp.path1 ?? "none").toLowerCase(), (cp.path2 ?? "none").toLowerCase()];

    //   for (const g of grantingPaths) {
    //     if (closed.includes(g)) return false;
    //   }

    //   return true;
    // });

    // Remove duplicates (actor already knows this FA spell)
    unlockedSpells = unlockedSpells.filter((spell) => {
      const spellName = spell.name.trim().toLowerCase();
      return !knownNames.has(spellName);
    });

    // Group spells ONLY by min-max range
    for (const spell of unlockedSpells) {
      const key = `${spell.minLevel}-${spell.maxLevel}`;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(spell);
    }

    for (const spell of unlockedSpells) {
      spell.closedFormatted = formatClosedPaths(spell.closedPaths);
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
      html.find("#preview-type").text(opt.dataset.type);
      html.find("#preview-action").text(opt.dataset.action);
      html.find("#preview-cost").text(opt.dataset.cost);
      html.find("#preview-maintenance").text(opt.dataset.maintenance);
      html.find("#preview-maintenance").text(opt.dataset.restriction);
      html.find("#preview-added").text(opt.dataset.added);
      html.find("#preview-closed").text(opt.dataset.closed);
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

    // 2. Add reference to system.mystic.freeAccessSpells[]
    const fa = foundry.utils.duplicate(actor.system.mystic.freeAccessSpells ?? []);
    fa.push(createdItem.id);

    // 3. Increment the correct slot band
    const band = toNum(spellDoc.system.maxLevel);
    const slots = foundry.utils.duplicate(actor.system.mystic.freeAccessSpellSlots);

    if (!slots[band]) {
      console.warn(`Missing slot band ${band} in freeAccessSpellSlots`);
    } else {
      slots[band].current = (slots[band].current ?? 0) + 1;
    }

    // 4. Update actor
    await actor.update({
      "system.mystic.freeAccessSpells": fa,
      "system.mystic.freeAccessSpellSlots": slots
    });

    ui.notifications.info(`Added Free Access spell: ${spellName}`);
  }
}

function formatClosedPaths(cp) {
  if (!cp) return "";

  const list = [];

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  if (cp.path1) list.push(cap(cp.path1));
  if (cp.path2) list.push(cap(cp.path2));

  return list.join(", ");
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
    if (doc.system.spellType === "freeAccess") {
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
