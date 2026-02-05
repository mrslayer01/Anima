import { ABF_CLASSES } from "../config/classes.js";
import { registerSheetListeners } from "./listeners.js"

export class AbfActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-character-sheet", "abf-system", "sheet", "actor"],
      template: "systems/abf-system/templates/actors/character-sheet.hbs",
      width: 1530,
      height: 1160,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main",
        },
        {
          navSelector: ".sub-tabs",
          contentSelector: ".tab.main",
          initial: "character",
        },
        {
          navSelector: ".sub-tabs[data-group='main-sub']",
          contentSelector: ".tab.main",
          initial: "character",
        },
        {
          navSelector: ".sub-tabs[data-group='mystic-sub']",
          contentSelector: ".tab.mystic",
          initial: "mysticMain",
        },
        {
          navSelector: ".sub-tabs[data-group='psychic-sub']",
          contentSelector: ".tab.psychic",
          initial: "psychicMain",
        }
      ],
    });
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
    const isAbility = name.startsWith("system.abilities.");

    if (isCharacteristic) {
      // Base cannot go below 1
      if (name.endsWith(".base") && value < 1) {
        value = 1;
        input.value = 1;
      }
      // Base cannot go above 20
      if (name.endsWith(".base") && value > 20) {
        value = 20;
        input.value = 20;
      }

      // Bonus cannot go below 0
      if (name.endsWith(".bonus") && value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isAbility) {
      // Base cannot go below 1
      if (name.endsWith(".base") && value < 0) {
        value = 0;
        input.value = 0;
      }

      // Bonus cannot go below 0
      if (name.endsWith(".bonus") && value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    // Apply update
    await this.actor.update({ [name]: value });
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;
    data.classRegistry = ABF_CLASSES;
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    registerSheetListeners(this, html);

    // Ability rolls
    html.find(".abf-roll-ability").off("click");
    html.find(".abf-roll-ability").on("click", async (ev) => {
      ev.preventDefault();

      const ability = ev.currentTarget.dataset.ability;
      if (!ability) return;

      const value = this.actor.system?.abilities?.[ability]?.value ?? 0;

      const roll = new Roll("1d100 + @value", { value });
      await roll.evaluate();
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Ability Roll: ${ability}`,
      });
    });
  }
}
