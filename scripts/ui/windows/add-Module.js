import { ABF_MARTIAL_ARTS, ABF_MODULES } from "../../config/modules.js";
import { toNum } from "../../utils/numbers.js";

export class AddModuleWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
    this.costOverrides = {};

    this.search = "";
    this.filterType = "All";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "module-browser",
      title: "Module Browser",
      classes: ["abf-character-sheet", "module-browser"],
      template: "systems/abf-system/templates/actors/apps/module-browser.hbs",
      width: 800,
      height: 700,
      resizable: true,
      scrollY: [".module-list"]
    });
  }

  getData() {
    // Convert modules
    let modules = Object.entries(ABF_MODULES).map(([key, data]) => ({
      key,
      isMartialArt: false,
      ...data
    }));

    // Convert martial arts
    let martialArts = Object.entries(ABF_MARTIAL_ARTS).map(([key, data]) => ({
      key,
      isMartialArt: true,
      ...data
    }));

    // Merge into one unified list
    let items = [...modules, ...martialArts];

    // Filter by type
    if (this.filterType !== "All") {
      items = items.filter((m) => m.type === this.filterType);
    }

    // Search filter
    if (this.search.trim().length > 0) {
      const s = this.search.toLowerCase();
      items = items.filter((m) => m.name.toLowerCase().includes(s));
    }

    return {
      modules: items,
      search: this.search,
      filterType: this.filterType,
      types: [
        "All",
        "General Weapon",
        "Archetypical Weapons",
        "Style",
        "Mystical",
        "Psychic",
        "Martial Art"
      ]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Search
    html.find(".module-search").on("change", (ev) => {
      this.search = ev.currentTarget.value;
      this.render(true);
    });

    // Type filter
    html.find(".module-filter").on("change", (ev) => {
      this.filterType = ev.currentTarget.value;
      this.render(true);
    });

    // Manual cost editing
    html.find(".module-cost-input").on("change", (ev) => {
      const key = ev.currentTarget.dataset.key;
      const value = toNum(ev.currentTarget.value) || 0;

      this.costOverrides[key] = value;
    });

    // Add module
    html.find(".add-module").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;

      // Pull from either registry
      const base = ABF_MODULES[key] ?? ABF_MARTIAL_ARTS[key];
      const moduleData = foundry.utils.duplicate(base);

      // Apply cost override
      if (this.costOverrides[key] !== undefined) {
        moduleData.cost = this.costOverrides[key];
      }

      const actor = game.actors.get(this.actorId);

      // Martial arts DO use DP
      if (!ValidateDPRemaining(moduleData.cost, actor)) {
        return ui.notifications.error("Not enough Development Points.");
      }

      if (!ValidateModuleCategoryLimit(actor, moduleData)) {
        return ui.notifications.error("Module exceeds category limit.");
      }

      // Insert into correct array
      let path;

      if (moduleData.type === "Martial Art") {
        path = "system.modules.MartialArts";
      } else {
        path = {
          "General Weapon": "system.modules.WeaponModules",
          "Archetypical Weapons": "system.modules.WeaponModules",
          Style: "system.modules.StyleModules",
          Mystical: "system.modules.MysticalModules",
          Psychic: "system.modules.PsychicModules"
        }[moduleData.type];
      }

      if (!path) {
        return ui.notifications.error("Unknown module type.");
      }

      const arr = foundry.utils.duplicate(foundry.utils.getProperty(actor, path) ?? []);
      arr.push(moduleData);

      await actor.update({ [path]: arr });

      ui.notifications.info(`Added ${moduleData.name}`);
    });
  }
}

function ValidateDPRemaining(dpCost, actor) {
  if (actor.system.settings.ignoreDPLimit) return true;
  const dp = actor.system.developmentPoints;
  return dp.remaining >= dpCost; // true = allowed
}

const MODULE_CATEGORY_MAP = {
  // Types
  "General Weapon": "Combat",
  "Archetypical Weapons": "Combat",
  Style: "Combat",
  Mystical: "Supernatural",
  Psychic: "Psychic",
  "Martial Art": "Combat",

  // Groups
  WeaponModules: "Combat",
  StyleModules: "Combat",
  MysticalModules: "Supernatural",
  PsychicModules: "Psychic",
  MartialArts: "Combat"
};

function ValidateModuleCategoryLimit(actor, moduleData) {
  if (actor.system.settings.ignoreDPLimit) return true;

  const dp = actor.system.developmentPoints;
  const limits = actor.system.abilities.primary.abilityLimits;

  // Map module type → primary category
  const category = MODULE_CATEGORY_MAP[moduleData.type];
  if (!category) return true;

  const percent = toNum(limits[category].percent) || 0;
  const limit = (dp.final * percent) / 100;

  // Calculate current spent in this category
  const currentSpent = dp.spentRecords
    .filter((r) => {
      const mapped = MODULE_CATEGORY_MAP[r.category] || r.category;
      return mapped === category;
    })
    .reduce((sum, r) => sum + toNum(r.amount) * toNum(r.cost), 0);

  const newTotal = currentSpent + toNum(moduleData.cost);

  return newTotal <= limit;
}
