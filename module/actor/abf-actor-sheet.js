import { ABF_CLASSES } from "../config/classes.js";
import { AddClassWindow } from "../apps/add-class-window.js";
import { characteristicCheck, animaOpenRoll, resistanceCheck } from "../rolls.js";
import { difficultyMap } from "./lookup.js"

export class AbfActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-character-sheet", "abf-system", "sheet", "actor"],
      template: "systems/abf-system/templates/actors/character-sheet.hbs",
      width: 1530,
      height: 1000,
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


    html.find(".add-class").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".add-class").on("click", () => {
      new AddClassWindow({ actorId: this.actor.id }).render(true);
    });

    html.find(".char-roll").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".char-roll").on("click", ev => {
      const char = ev.currentTarget.dataset.char;
      // Pull the base from the actor to be used as the target.
      const value = this.actor.system.characteristics[char].base;
      characteristicCheck({
        value,
        label: `${char} Check`,
        actor: this.actor
      });
    });

    //Open Roll
    html.find(".open-roll").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".open-roll").on("click", ev => {
      const char = ev.currentTarget.dataset.char;

      animaOpenRoll({
        value: this.actor.system.characteristics[char].final,
        label: `${char} Open Roll`,
        actor: this.actor
      });
    });

    //Resistance Roll
    html.find(".res-roll").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".res-roll").on("click", ev => {
      const char = ev.currentTarget.dataset.char;

      new Dialog({
        title: "Resistance Check",
        content: `
          <div>
            <label><b>Difficulty:</b></label>
            <select id="diff" style="width: 100%;">
              ${Object.entries(difficultyMap).map(([value, label]) => {
                const [short, long] = label.split(" — ");
                return `
                  <option 
                    value="${value}" 
                    title="${value} — ${label}"
                    ${value === "80" ? "selected" : ""}
                  >
                    ${short}
                  </option>
                `;
              }).join("")}
            </select>
          </div>
        `,
        buttons: {
          roll: {
            label: "Roll",
            callback: html => {
              const value = this.actor.system.resistances[char].final;
              const difficulty = Number(html.find("#diff").val());

              resistanceCheck({
                value,
                difficulty,
                label: `${char} Resistance Check`,
                actor: this.actor
              });
            }
          }
        }
      }).render(true);
    });



    html.find(".delete-class").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".delete-class").on("click", async (event) => {
      const index = Number(event.currentTarget.dataset.index);

      const confirmed = await Dialog.confirm({
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this class?</p>",
      });

      if (!confirmed) return;

      const classes = foundry.utils.duplicate(this.actor.system.classes);

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
    html.find(".class-level-input").off("change");
    html.find(".class-level-input").on("change", async (event) => {
      const index = Number(event.currentTarget.dataset.index);
      const newLevel = Number(event.currentTarget.value) || 1;

      const classes = foundry.utils.duplicate(this.actor.system.classes);
      classes[index].level = newLevel;

      await this.actor.update({ "system.classes": classes });
    });

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
