import { UpdateArmor } from "../data/rules/items/armor-calculations.js";
import { UpdateWeapon, WeaponBaseCalculations } from "../data/rules/items/weapon-calculations.js";
import { ARMOR_SECTIONS, DAMAGE_TYPES, TABLE_ITEM_TYPES } from "../utils/lookup.js";
import { toNum } from "../utils/numbers.js";
import { registerSheetListeners } from "./listeners.js";
import { ValidateDP } from "./validators/validate-dp-abilities.js";
import { ValidateInputs } from "./validators/validate-inputs.js";

export class AbfActorSheet extends foundry.appv1.sheets.ActorSheet {
  constructor(...args) {
    super(...args);

    // Track expanded secondary rows so they stay open after updates
    this._expandedSecondaries = new Set();
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-character-sheet", "abf-system", "sheet", "actor"],
      template: "systems/abf-system/templates/actors/character-sheet.hbs",
      width: 1580,
      height: 1180,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main"
        },
        {
          navSelector: ".sub-tabs",
          contentSelector: ".tab.main",
          initial: "character"
        },
        {
          navSelector: ".sub-tabs[data-group='main-sub']",
          contentSelector: ".tab.main",
          initial: "character"
        },
        {
          navSelector: ".sub-tabs[data-group='mystic-sub']",
          contentSelector: ".tab.mystic",
          initial: "mysticMain"
        },
        {
          navSelector: ".sub-tabs[data-group='psychic-sub']",
          contentSelector: ".tab.psychic",
          initial: "psychicMain"
        },
        {
          navSelector: ".sub-tabs[data-group='ability-sub']",
          contentSelector: ".tab.abilities",
          initial: "primaries"
        }
      ],
      dragDrop: [
        {
          dragSelector: ".item",
          dropSelector: "[data-table]"
        }
      ]
    });
  }

  async _onDropItem(event, data) {
    const item = await Item.fromDropData(data);
    if (!item) return;

    // Which table was dropped onto?
    const table = event.target.closest("[data-table]");
    if (!table) return;

    const tableName = table.dataset.table;

    const allowed = TABLE_ITEM_TYPES[tableName];
    if (!allowed.includes(item.type))
      return ui.notifications.warn("That item cannot go in this table.");

    // Add item to actor
    const created = await this.actor.createEmbeddedDocuments("Item", [item.toObject()]);

    // Recompute weapon section if it's a weapon automatically.
    if (item.type === "weapon") {
      await UpdateWeapon(this.actor);
    }

    if (item.type === "armor") {
      await UpdateArmor(this.actor);
    }

    return created;
  }

  activateListeners(html) {
    super.activateListeners(html);

    registerSheetListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    data.ARMOR_SECTIONS = ARMOR_SECTIONS;
    data.DAMAGE_TYPES = DAMAGE_TYPES;

    // Build tables dynamically from actor items
    data.system.items = {
      commonGoods: this.actor.items.filter((i) => i.type === "commonGood"),
      weapons: this.actor.items.filter((i) => i.type === "weapon"),
      armor: this.actor.items.filter((i) => i.type === "armor")
      // add more tables here
    };

    data.expandedSecondaries = this._expandedSecondaries;

    // Resolve path spells
    this.SpellData(data);
    data.kiAbilities = data.system.abilities.primary.Combat.Ki.abilities;

    return data;
  }

  SpellData(data) {
    const spellItems = (this.actor.system.mystic.spells ?? [])
      .map((id) => this.actor.items.get(id))
      .filter((i) => i);

    // Resolve free access spells
    const faSpellItems = (this.actor.system.mystic.freeAccessSpells ?? [])
      .map((id) => this.actor.items.get(id))
      .filter((i) => i);

    // Expose full lists
    data.system.mystic.spellItems = spellItems;
    data.system.mystic.faSpellItems = faSpellItems;

    // Active lists
    const activePath = spellItems.filter((s) => s.system.active);
    const activeFA = faSpellItems.filter((s) => s.system.active);

    data.system.mystic.activeSpells = [...activePath, ...activeFA];

    // 1. Get the actor's FA slots
    const slots = this.actor.system.mystic.freeAccessSpellSlots;

    // 2. Only include unlocked ranges (max > 0)
    const unlockedBands = Object.keys(slots)
      .map((n) => toNum(n))
      .filter((band) => slots[band].max > 0)
      .sort((a, b) => a - b);

    // 3. Group spells by maxLevel band
    const grouped = {};
    for (const spell of faSpellItems) {
      const band = toNum(spell.system.maxLevel);
      if (!grouped[band]) grouped[band] = [];
      grouped[band].push(spell);
    }

    // 4. Sort spells inside each band
    for (const band of Object.keys(grouped)) {
      grouped[band].sort((a, b) => a.name.localeCompare(b.name));
    }

    // 5. Build final ordered list (always include unlocked bands)
    const orderedFA = [];
    for (const band of unlockedBands) {
      orderedFA.push({
        band,
        spells: grouped[band] ?? [],
        current: slots[band].current,
        max: slots[band].max
      });
    }

    data.system.mystic.faSpellGroups = orderedFA;
  }

  async _onChangeInput(event) {
    const input = event.target;
    const name = input.name;

    // TEXT FIELDS (aspects, notes, etc.)
    if (input.type === "text") {
      const value = input.value;
      await this.actor.update({ [name]: value });
      return;
    }

    let value = toNum(input.value);

    // Input Validation
    value = ValidateInputs(name, value, input);

    value = ValidateDP(name, value, input, this.actor);

    // Apply update
    await this.actor.update({ [name]: value });
    this.render(false);
  }
}
