import { WeaponBaseCalculations } from "../data/rules/items/weapon-calculations.js";
import { ARMOR_SECTIONS, DAMAGE_TYPES, TABLE_ITEM_TYPES } from "../utils/lookup.js";
import { registerSheetListeners } from "./listeners.js";
import { ValidateDPAbilities } from "./validators/validate-dp-abilities.js";
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
      await WeaponBaseCalculations(this.actor);
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

    return data;
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

    let value = Number(input.value);

    // Input Validation
    value = ValidateInputs(name, value, input);

    //DP Validation
    value = ValidateDPAbilities(name, value, input, this.actor);

    // Apply update
    await this.actor.update({ [name]: value });
    this.render(false);
  }
}
