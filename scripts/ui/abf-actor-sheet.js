import { validateDP } from "../../Old Version For Reference/abf-system-old/module/actor/classes/dp.js";
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
      ]
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    registerSheetListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    // ADD THIS
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
