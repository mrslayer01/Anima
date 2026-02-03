import { ABF_CLASSES } from "../config/classes.js";
import { AddClassWindow } from "../apps/add-class-window.js";
import { ClassInfoWindow } from "../apps/class-info.js";
import { ABF_ADVANTAGES } from "../config/advantages.js";
import { AddAdvantageWindow } from "../apps/add-advantage-window.js";
import { AdvantageInfoWindow } from "../apps/advantage-info.js";
import { ABF_DISADVANTAGES } from "../config/disadvantages.js";
import { AddDisadvantageWindow } from "../apps/add-disadvantage-window.js";
import { DisadvantageInfoWindow } from "../apps/disadvantage-info.js";
import { characteristicCheck, animaOpenRoll, resistanceCheck } from "../rolls.js";
import { difficultyMap } from "./lookup.js"

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
    
    //#region ROLLS
    //Characteristic Roll
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

//#endregion

//#region CLASS

    html.find(".add-class").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".add-class").on("click", () => {
      new AddClassWindow({ actorId: this.actor.id }).render(true);
    });

    html.find(".delete-class").off("click"); //before adding new listener, remove old to avoid duplicates
    html.find(".delete-class").on("click", async (event) => {
      const index = Number(event.currentTarget.dataset.index);

      const confirmed = await Dialog.confirm({
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this class?</p>",
      },
      {
        classes: ["abf-character-sheet"]
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

    // Click class name for information
    html.find(".clickable-class").click(ev => {
      ev.preventDefault();

      const className = ev.currentTarget.dataset.class;
      const classData = this.actor.system.classes.find(c => c.name === className);

      if (!classData) return ui.notifications.error("Class data not found");

      new ClassInfoWindow(className, { classData }).render(true);
    });

//#endregion

//#region Advanatage/Disadvantage

// -----------------------------
// ADD ADVANTAGE
// -----------------------------
html.find(".add-advantage").off("click");
html.find(".add-advantage").on("click", () => {
  new AddAdvantageWindow({ actorId: this.actor.id }).render(true);
});

// -----------------------------
// DELETE ADVANTAGE
// -----------------------------
  html.find(".delete-advantage").off("click");
  html.find(".delete-advantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this advantage?</p>",
    });

    if (!confirmed) return;

    const advantages = foundry.utils.duplicate(this.actor.system.advantages);

    const deletedName = advantages[index]?.name;

    advantages.splice(index, 1);

    await this.actor.update({ "system.advantages": advantages });
  });

  // -----------------------------
  // CLICK ADVANTAGE NAME FOR INFO
  // -----------------------------
  html.find(".clickable-advantage").off("click");
  html.find(".clickable-advantage").on("click", (ev) => {
    ev.preventDefault();

    const advName = ev.currentTarget.dataset.advantage;
    const advData = this.actor.system.advantages.find(a => a.name === advName);

    if (!advData) return ui.notifications.error("Advantage data not found");

    new AdvantageInfoWindow(advName, advData).render(true);
  });

  // -----------------------------
  // ADD DISADVANTAGE
  // -----------------------------
  html.find(".add-disadvantage").off("click");
  html.find(".add-disadvantage").on("click", () => {
    new AddDisadvantageWindow({ actorId: this.actor.id }).render(true);
  });

  // -----------------------------
  // DELETE DISADVANTAGE
  // -----------------------------
  html.find(".delete-disadvantage").off("click");
  html.find(".delete-disadvantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this disadvantage?</p>",
    });

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(this.actor.system.disadvantages);

    const deletedName = disadvantages[index]?.name;

    disadvantages.splice(index, 1);

    await this.actor.update({ "system.disadvantages": disadvantages });
  });

  // -----------------------------
  // CLICK DISADVANTAGE NAME FOR INFO
  // -----------------------------
  html.find(".clickable-disadvantage").off("click");
  html.find(".clickable-disadvantage").on("click", (ev) => {
    ev.preventDefault();

    const disName = ev.currentTarget.dataset.disadvantage;
    const disData = this.actor.system.disadvantages.find(d => d.name === disName);

    if (!disData) return ui.notifications.error("Disadvantage data not found");

    new DisadvantageInfoWindow(disName, disData).render(true);
  });


//#endregion

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
