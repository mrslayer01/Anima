import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class DevelopmentPointsRule extends BaseRule {
  Initialize(system) {
    const dp = system.developmentPoints;
    if (!dp.bonus) dp.bonus = 0;
    if (!dp.special) dp.special = 0;
    if (!dp.final) dp.final = 0;
    if (!dp.spent) dp.spent = 0;
    if (!dp.remaining) dp.remaining = 0;
    if (!Array.isArray(dp.spentRecords)) dp.spentRecords = [];
  }

  Derived(system) {
    this.Initialize(system);

    // Rebuild spentRecords from current ability bases
    system.developmentPoints.spentRecords = [];

    DerivedPrimaryAbilites(system);
    DerivedSecondaryAbilites(system);
    DerivedModules(system);

    // Now recalc DP totals
    recalculateDP(system);
  }

  DetectChanged(updateData, oldSystem) {
    const prim = updateData.system?.abilities?.primary;
    if (!prim) return [];

    const category = Object.keys(prim)[0];
    const ability = Object.keys(prim[category])[0];

    this._change = { category, ability };
    return ["dp"];
  }

  RecalcUpdated(system, name) {
    if (name !== "dp") return;

    const { category, ability } = this._change;

    RecalcPrimaryAbilites(system, category, ability);
    RecalcSecondaryAbilites(system, category, ability);
    DerivedModules(system);

    recalculateDP(system);
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed; // MUST be array of strings
  }
}

function recalculateDP(system) {
  const lvl = system.level || 0;
  const bonus = Number(system.developmentPoints.bonus) || 0;
  const special = Number(system.developmentPoints.special) || 0;

  const dpTable = [
    400, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000
  ];

  const base = lvl <= 15 ? dpTable[lvl] : dpTable[15] + (lvl - 15) * 100;
  system.developmentPoints.final = base + bonus + special;

  let spent = 0;
  for (const rec of system.developmentPoints.spentRecords) {
    spent += Number(rec.amount) * Number(rec.cost);
  }

  system.developmentPoints.spent = spent;
  system.developmentPoints.remaining = system.developmentPoints.final - spent;

  CalculatePrimaryAbilities(system);
  CalculateSecondaryAbilities(system);
  DerivedModules(system);
}

function updateAbilityRecord(system, category, ability, amount, cost) {
  const records = system.developmentPoints.spentRecords;
  const idx = records.findIndex((r) => r.category === category && r.ability === ability);

  if (amount === 0) {
    if (idx !== -1) records.splice(idx, 1);
    return;
  }

  if (idx !== -1) {
    records[idx].amount = amount;
    records[idx].cost = cost;
  } else {
    records.push({ category, ability, amount, cost });
  }
}

//#region Modules
function DerivedModules(system) {
  const modRoot = system.modules;
  if (!modRoot) return;

  const groups = [
    "WeaponModules",
    "StyleModules",
    "MysticalModules",
    "PsychicModules",
    "MartialArts"
  ];

  for (const group of groups) {
    const arr = modRoot[group];
    if (!Array.isArray(arr)) continue;

    for (const mod of arr) {
      if (!mod || !mod.cost || !mod.name) continue;

      system.developmentPoints.spentRecords.push({
        category: group,
        ability: mod.name,
        amount: 1,
        cost: Number(mod.cost)
      });
    }
  }
}

//#endregion

//#region Primary Abilities

function DerivedPrimaryAbilites(system) {
  for (const [categoryName, category] of Object.entries(system.abilities.primary)) {
    if (categoryName === "abilityLimits") continue;

    for (const [abilityName, abil] of Object.entries(category)) {
      const base = Number(abil.base) || 0;
      const cost = Number(abil.cost) || 0;

      if (base > 0 && cost > 0) {
        system.developmentPoints.spentRecords.push({
          category: categoryName,
          ability: abilityName,
          amount: base,
          cost
        });
      }
    }
  }
}

function RecalcPrimaryAbilites(system, category, ability) {
  if (["Combat", "Psychic", "Supernatural"].includes(category)) {
    const newBase = system.abilities.primary[category][ability].base;
    const cost = system.abilities.primary[category][ability].cost;

    updateAbilityRecord(system, category, ability, newBase, cost);
  }
}

function CalculatePrimaryAbilities(system) {
  const limits = system.abilities.primary.abilityLimits;

  // Reset current totals
  for (const cat of Object.keys(limits)) {
    limits[cat].current = 0;
  }

  // Sum DP spent per category (including modules)
  for (const rec of system.developmentPoints.spentRecords) {
    let cat = rec.category;

    // Map module groups to primary categories
    if (MODULE_CATEGORY_MAP[cat]) {
      cat = MODULE_CATEGORY_MAP[cat];
    }

    // Only count primary categories
    if (["Combat", "Psychic", "Supernatural"].includes(cat)) {
      const cost = Number(rec.amount) * Number(rec.cost);
      limits[cat].current += cost;
    }
  }

  // Compute final limit per category (percent of max DP)
  for (const cat of Object.keys(limits)) {
    const percent = Number(limits[cat].percent) || 0;
    limits[cat].final = (system.developmentPoints.final * percent) / 100;
  }

  // --- TOTAL PRIMARY DP SPENT ---
  let primaryTotal = 0;

  for (const rec of system.developmentPoints.spentRecords) {
    let cat = rec.category;

    if (MODULE_CATEGORY_MAP[cat]) {
      cat = MODULE_CATEGORY_MAP[cat];
    }

    if (["Combat", "Psychic", "Supernatural"].includes(cat)) {
      primaryTotal += Number(rec.amount) * Number(rec.cost);
    }
  }

  system.abilities.primary.totalDPSpent = primaryTotal;
}

//#endregion

//#region Secondary Abilities

function DerivedSecondaryAbilites(system) {
  for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
    for (const [abilityName, abil] of Object.entries(category)) {
      const base = Number(abil.base) || 0;
      const cost = Number(abil.cost) || 0;

      if (base > 0 && cost > 0) {
        system.developmentPoints.spentRecords.push({
          category: categoryName,
          ability: abilityName,
          amount: base,
          cost
        });
      }
    }
  }
}

function RecalcSecondaryAbilites(system, category, ability) {
  if (
    [
      "Athletics",
      "Vigor",
      "Perception",
      "Intellectual",
      "Social",
      "Subterfuge",
      "Creative"
    ].includes(category)
  ) {
    const newBase = system.abilities.secondary[category][ability].base;
    const cost = system.abilities.secondary[category][ability].cost;

    updateAbilityRecord(system, category, ability, newBase, cost);
  }
}

function CalculateSecondaryAbilities(system) {
  // --- TOTAL PRIMARY DP SPENT ---
  let secondaryTotal = 0;

  for (const rec of system.developmentPoints.spentRecords) {
    // Only count secondary categories
    if (
      [
        "Athletics",
        "Vigor",
        "Perception",
        "Intellectual",
        "Social",
        "Subterfuge",
        "Creative"
      ].includes(rec.category)
    ) {
      secondaryTotal += Number(rec.amount) * Number(rec.cost);
    }
  }

  system.abilities.secondary.totalDPSpent = secondaryTotal;
}

const MODULE_CATEGORY_MAP = {
  WeaponModules: "Combat",
  StyleModules: "Combat",
  MysticalModules: "Supernatural",
  PsychicModules: "Psychic"
};

//#endregion

//#region Misc

//#endregion
