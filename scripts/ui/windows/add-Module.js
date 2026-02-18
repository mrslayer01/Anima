import { ABF_MODULES } from "../../config/modules.js";
import { toNum } from "../../utils/numbers.js";

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
      const newLevel = toNum(event.currentTarget.value) || 0;

      if (!this.moduleData)
        this.moduleData = foundry.utils.duplicate(ABF_MODULES[this.selectedModule]);

      this.moduleData.cost = newLevel;

      //this.render(false); // refresh UI
    });

    html.find(".confirm-add").click(async (ev) => {
      ev.preventDefault();

      if (!this.selectedModule) return ui.notifications.warn("Select an module first.");

      if (!this.moduleData) this.moduleData = ABF_MODULES[this.selectedModule];

      const actor = game.actors.get(this.options.actorId);

      if (!ValidateDPRemaining(this.moduleData.cost, actor)) {
        return ui.notifications.error(`Not enough Development Points.`);
      }

      //Validate if new purchase does not exceed ability limit.

      if (!ValidateModuleCategoryLimit(actor, this.moduleData)) {
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
        moduleArray.push(this.moduleData);

        await actor.update({ "system.modules.StyleModules": moduleArray });
      }

      if (this.moduleData.type === "Mystical") {
        const moduleArray = foundry.utils.duplicate(actor.system.modules.MysticalModules ?? []);
        moduleArray.push(this.moduleData);

        await actor.update({ "system.modules.MysticalModules": moduleArray });
      }

      if (this.moduleData.type === "Psychic") {
        const moduleArray = foundry.utils.duplicate(actor.system.modules.PsychicModules ?? []);
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

const MODULE_CATEGORY_MAP = {
  "General Weapon": "Combat",
  "Archetypical Weapons": "Combat",
  Style: "Combat",
  Mystical: "Supernatural",
  Psychic: "Psychic"
};

function ValidateModuleCategoryLimit(actor, moduleData) {
  const dp = actor.system.developmentPoints;
  const limits = actor.system.abilities.primary.abilityLimits;

  // Determine which primary category this module belongs to
  const category = MODULE_CATEGORY_MAP[moduleData.type];
  if (!category) return true; // Modules without a category limit

  const percent = toNum(limits[category].percent) || 0;
  let limit = (dp.final * percent) / 100;

  // Calculate current spent in this category
  const currentSpent = dp.spentRecords
    .filter((r) => {
      // Map module groups to primary categories
      const mapped = MODULE_CATEGORY_MAP[r.category] || r.category;
      return mapped === category;
    })
    .reduce((sum, r) => sum + toNum(r.amount) * toNum(r.cost), 0);

  const newTotal = currentSpent + toNum(moduleData.cost);

  return newTotal <= limit;
}
