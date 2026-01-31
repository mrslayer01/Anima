import { ABF_CLASSES } from "../config/classes.js";
import { AddClassWindow } from "../apps/add-class-window.js";

export class AbfActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-system", "sheet", "actor"],
      template: "systems/abf-system/templates/actors/character-sheet.hbs",
      width: 1300,
      height: 850,
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
        }
      ],
    });
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;
    data.classRegistry = ABF_CLASSES;
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".add-class").click(() => {
      new AddClassWindow({ actorId: this.actor.id }).render(true);
    });

    html.find(".delete-class").click(async (event) => {
      const index = Number(event.currentTarget.dataset.index);

      const confirmed = await Dialog.confirm({
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this class?</p>",
      });

      if (!confirmed) return;

      const classes = duplicate(this.actor.system.classes);

      // Grab the class name BEFORE deleting it
      const deletedClassName = classes[index]?.name;

      // Remove from actor
      classes.splice(index, 1);
      await this.actor.update({ "system.classes": classes });

      // Reset the class level in the registry (so re-adding starts at level 1)
      if (deletedClassName && ABF_CLASSES[deletedClassName]) {
        ABF_CLASSES[deletedClassName].level = 1;
      }
    });

    // Change class level
    html.find(".class-level-input").change(async (event) => {
      const index = Number(event.currentTarget.dataset.index);
      const newLevel = Number(event.currentTarget.value) || 1;

      const classes = duplicate(this.actor.system.classes);
      classes[index].level = newLevel;

      await this.actor.update({ "system.classes": classes });
    });

    // Ability rolls
    html.find(".abf-roll-ability").click(async (ev) => {
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
