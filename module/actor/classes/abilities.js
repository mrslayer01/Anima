import { toNum } from "../helpers/lookup.js";

// 1. Full initialization (prevents undefined finals)
export function initializeAllAbilities(system) {
  const classData = extractAllClassAbilityData(system);

  for (const [categoryName, category] of Object.entries(system.abilities.Primaries)) {
    for (const [abilityName, abilityData] of Object.entries(category)) {
      // Skip category-level metadata
      if (abilityName === "dpLimitPercent") continue;

      // Skip arrays (WeaponModules, MartialArts, PsychicModules)
      if (Array.isArray(abilityData)) continue;

      // Skip anything that isn't an object (numbers, strings, null)
      if (!abilityData || typeof abilityData !== "object") continue;

      // Skip objects that don't have the shape of an ability
      if (!("base" in abilityData)) continue;

      recalcPrimariesAbilities(system, categoryName, abilityName);
    }
  }

  for (const [categoryName, category] of Object.entries(system.abilities.Secondaries)) {
    for (const abilityName of Object.keys(category)) {
      recalcSecondaryAbilities(system, categoryName, abilityName, classData);
    }
  }
}

//#region Primaries

export function applyChangedPrimariesAbilities(system, actor) {
  const changed = actor._changedPrimariesAbilities;
  if (!Array.isArray(changed)) return;
  const classData = extractAllClassAbilityData(system);
  for (const { categoryName, ability } of changed) {
    recalcPrimariesAbilities(system, categoryName, ability);
  }
  delete actor._changedPrimariesAbilities;
}

export function detectChangedPrimariesAbilities(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);
  const updatedCategories = expanded.system?.abilities?.Primaries ?? {};
  for (const [categoryName, abilities] of Object.entries(updatedCategories)) {
    // NORMAL (object)
    for (const [abilityName, fields] of Object.entries(abilities)) {
      const oldAbility = oldSystem.abilities.Primaries[categoryName][abilityName];
      for (const [field, newValue] of Object.entries(fields)) {
        if (oldAbility[field] !== newValue) {
          changed.push({ category: categoryName, ability: abilityName });
          break;
        }
      }
    }
  }
  return changed;
}

export function updatePrimariesAbilities(actor, changed) {
  const system = actor.system;

  for (const { categoryName, ability } of changed) {
    recalcPrimariesAbilities(system, categoryName, ability);
  }
}

function recalcPrimariesAbilities(system, categoryName, abilityName) {
  const abilityData = system.abilities.Primaries[categoryName]?.[abilityName];
  if (!abilityData) return;

  const linkedChar = abilityData.characteristic;
  const charFinal = toNum(system.characteristics[linkedChar]?.final) || 0;

  const base = toNum(abilityData.base);
  const bonus = toNum(abilityData.bonus);
  const cls = toNum(abilityData.class);
  const special = toNum(abilityData.special);

  const total = base + bonus + cls + special;

  abilityData.final = total + charFinal;
  abilityData.undeveloped = total === 0;
}

//#endregion

//#region Secondaries
// 2. Selective recalculation (only recalc changed ability)
export function applyChangedSecondariesAbilities(system, actor) {
  const changed = actor._changedSecondariesAbilities;
  if (!Array.isArray(changed)) return;

  const classData = extractAllClassAbilityData(system);

  for (const { categoryName, ability } of changed) {
    recalcSecondaryAbilities(system, categoryName, ability, classData);
  }

  delete actor._changedSecondariesAbilities;
}

// 3. Change detection (called from update-calculations.js)
export function detectChangedSecondariesAbilities(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);

  const updatedCategories = expanded.system?.abilities?.Secondaries ?? {};

  for (const [categoryName, abilities] of Object.entries(updatedCategories)) {
    // NORMAL (object)
    for (const [abilityName, fields] of Object.entries(abilities)) {
      const oldAbility = oldSystem.abilities.Secondaries[categoryName][abilityName];

      for (const [field, newValue] of Object.entries(fields)) {
        if (oldAbility[field] !== newValue) {
          changed.push({ category: categoryName, ability: abilityName });
          break;
        }
      }
    }
  }

  return changed;
}

function recalcSecondaryAbilities(system, categoryName, abilityName, classData) {
  const abilityData = system.abilities.Secondaries[categoryName]?.[abilityName];
  if (!abilityData) return;

  // Characteristic dependency
  const linkedChar = abilityData.characteristic;
  const charFinal = toNum(system.characteristics[linkedChar]?.final) || 0;
  const base = toNum(abilityData.base);
  const bonus = toNum(abilityData.bonus);
  const cls = toNum(abilityData.class);
  const special = toNum(abilityData.special);
  const total = base + bonus + cls + special;
  abilityData.final = total + charFinal;
  abilityData.undeveloped = total === 0;
  abilityData.mastery = total >= 200;
}

export function updateSecondariesAbilities(actor, changed) {
  const system = actor.system;
  const classData = extractAllClassAbilityData(system);

  for (const { categoryName, ability } of changed) {
    recalcSecondaryAbilities(system, categoryName, ability, classData);
  }
}
//#endregion

function normalizeAbilityName(name) {
  return name
    .trim()
    .split(/\s+/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function extractCostMap(classes, key, { includeLevel = false } = {}) {
  return classes.flatMap((cls) =>
    Object.entries(cls[key] || {}).map(([name, cost]) => ({
      name: normalizeAbilityName(name),
      cost,
      ...(includeLevel ? { level: cls.level || 0 } : {})
    }))
  );
}

function extractInnateArray(classes, key) {
  return classes.flatMap((cls) =>
    (cls.innateBonuses?.[key] || []).map((bonus) => ({
      ...bonus,
      name: normalizeAbilityName(bonus.name),
      level: cls.level || 0
    }))
  );
}

function extractAllClassAbilityData(system) {
  const classes = system.classes || [];

  return {
    allPrimaryAbilityCosts: extractCostMap(classes, "primaryAbilityCosts"),
    allPrimarySupernaturalAbilityCosts: extractCostMap(classes, "supernaturalAbilityCosts"),
    allPrimaryPsychicAbilityCosts: extractCostMap(classes, "psychicAbilityCosts"),
    allPrimaryInnateBonuses: extractInnateArray(classes, "primaryAbilities"),
    allAbilityLimits: extractCostMap(classes, "abilityLimits"),

    allSecondaryAbilityCosts: extractCostMap(classes, "secondaryAbilityCosts"),
    allSecondaryInnateBonuses: extractInnateArray(classes, "secondaryAbilities")
  };
}
