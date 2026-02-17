import { ABF_MODULES } from "../../config/modules.js";

export class AddModuleWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.selectedModule = null;
    this.moduleData = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-module-window",
      title: "Add Module",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/module.hbs",
      width: 300,
      height: "auto",
      resizable: true
    });
  }

  getData() {
    const moduleOptions = Object.keys(ABF_MODULES).sort();

    if (!this.selectedModule) {
      this.selectedModule = moduleOptions[0];
    }

    return {
      moduleOptions: moduleOptions,
      selectedModule: this.selectedModule,
      moduleData: ABF_MODULES[this.selectedModule]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const selector = html.find(".module-selector");

    selector.on("change", (event) => {
      this.selectedModule = event.target.value;
      this.render(true);
    });

    html.find(".module-cost-input").off("change");
    html.find(".module-cost-input").on("change", async (event) => {
      const newLevel = Number(event.currentTarget.value) || 0;
      if (!this.moduleData) this.moduleData = ABF_MODULES[this.selectedModule];

      this.moduleData.cost = newLevel;
    });

    html.find(".confirm-add").click(async (ev) => {
      ev.preventDefault();

      if (!this.selectedModule) return ui.notifications.warn("Select an module first.");

      if (!this.moduleData) this.moduleData = ABF_MODULES[this.selectedModule];

      const actor = game.actors.get(this.options.actorId);

      if (!ValidateDPRemaining(this.moduleData.cost, actor)) {
        return ui.notifications.error(`Not enough Development Points.`);
      }

      if (
        this.moduleData.type === "General Weapon" ||
        this.moduleData.type === "Archetypical Weapons"
      ) {
        const moduleArray = foundry.utils.duplicate(actor.system.modules.WeaponModules ?? []);
        moduleArray.push(this.moduleData);
        await actor.update({ "system.modules.WeaponModules": moduleArray });
      }

      if (this.moduleData.type === "Style") {
        const moduleArray = foundry.utils.duplicate(actor.system.modules.StyleModules ?? []);
        console.log("Style ");
        moduleArray.push(this.moduleData);

        await actor.update({ "system.modules.StyleModules": moduleArray });
      }

      if (this.moduleData.type === "Mystical") {
        const moduleArray = foundry.utils.duplicate(actor.system.modules.MysticalModules ?? []);
        console.log("Mystical ");
        moduleArray.push(this.moduleData);

        await actor.update({ "system.modules.MysticalModules": moduleArray });
      }

      if (this.moduleData.type === "Psychic") {
        const moduleArray = foundry.utils.duplicate(actor.system.modules.PsychicModules ?? []);
        console.log("Psychic ");
        moduleArray.push(this.moduleData);

        await actor.update({ "system.modules.PsychicModules": moduleArray });
      }

      this.close();
    });
  }
}

function ValidateDPRemaining(dpCost, actor) {
  const dp = actor.system.developmentPoints;
  return dp.remaining >= dpCost; // true = allowed
}
