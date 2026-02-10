import { registerSheetListeners } from "./listeners.js";

export class AbfActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-character-sheet", "abf-system", "sheet", "actor"],
      template: "systems/abf-system/templates/actors/character-sheet.hbs",
      width: 1530,
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

    // NUMBER FIELDS
    let value = Number(input.value);

    // Only validate characteristics
    const isCharacteristic = name.startsWith("system.characteristics.");
    const isResistance = name.startsWith("system.resistances.");
    const isAbility = name.startsWith("system.abilities.Secondaries.");
    const isCurrency = name.startsWith("system.currency.");
    const isCore = name.startsWith("system.core.");

    if (isCharacteristic) {
      // Characteristic can't go above 20 or below 0
      if (name.endsWith(".base") && value < 1) {
        value = 1;
        input.value = 1;
      }

      if (name.endsWith(".bonus") && value < 0) {
        value = 0;
        input.value = 0;
      }

      if (value > 20) {
        value = 20;
        input.value = 20;
      }
    }

    if (isAbility) {
      // Base cannot go below 1
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isCurrency) {
      // Currency cannot go below 0
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isCore) {
      // Fatigue cannot go below 0
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isResistance) {
      // resistance cannot go below 0
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    // Apply update
    await this.actor.update({ [name]: value });
  }
}
