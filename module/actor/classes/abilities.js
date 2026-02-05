import { toNum } from "../helpers/lookup.js";

// 1. Full initialization (prevents undefined finals)
export function initializeAllAbilities(system) {
  const classData = extractAllClassAbilityData(system);

  for (const [categoryName, category] of Object.entries(system.abilities)) {
    for (const abilityName of Object.keys(category)) {
      recalcAbility(system, categoryName, abilityName, classData);
    }
  }
}

// 2. Selective recalculation (only recalc changed ability)
export function applyChangedAbilities(system, actor) {
  const changed = actor._changedAbilities;
  if (!Array.isArray(changed)) return;

  const classData = extractAllClassAbilityData(system);

  for (const { categoryName, ability } of changed) {
    recalcAbility(system, categoryName, ability, classData);
  }

  delete actor._changedAbilities;
}

// 3. Change detection (called from update-calculations.js)
export function detectChangedAbilities(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);

  const updatedCategories = expanded.system?.abilities ?? {};

  for (const [categoryName, abilities] of Object.entries(updatedCategories)) {

    // NORMAL (object)
    for (const [abilityName, fields] of Object.entries(abilities)) {
      const oldAbility = oldSystem.abilities[categoryName][abilityName];

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

export function updateAbilities(actor, changed) {
  const system = actor.system;
  const classData = extractAllClassAbilityData(system);

  for (const { categoryName, ability } of changed) {
    recalcAbility(system, categoryName, ability, classData);
  }
}


function normalizeAbilityName(name) {
  return name
    .trim()
    .split(/\s+/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function extractCostMap(classes, key, { includeLevel = false } = {}) {
  //console.log(classes);
  return classes.flatMap(cls =>
    Object.entries(cls[key] || {}).map(([name, cost]) => ({
      name: normalizeAbilityName(name),
      cost,
      ...(includeLevel ? { level: cls.level || 0 } : {})
    }))
  );
}

function extractInnateArray(classes, key) {
  return classes.flatMap(cls =>
    (cls.innateBonuses?.[key] || []).map(bonus => ({
      ...bonus,
      name: normalizeAbilityName(bonus.name),
      level: cls.level || 0
    }))
  );
}

function recalcAbility(system, categoryName, abilityName, classData) {
  const abilityData = system.abilities[categoryName]?.[abilityName];
  if (!abilityData) return;

  const {
    allSecondaryAbilityCosts,
    allSecondaryInnateBonuses
  } = classData;

  // Apply class costs
  for (const secondary of allSecondaryAbilityCosts) {
    if (secondary.name === categoryName) {
      abilityData.cost = secondary.cost;
    }
  }

  // Apply innate bonuses
  const innate = allSecondaryInnateBonuses.find(b => b.name === abilityName);
  if (innate) {
    abilityData.class = innate.innateBonus * innate.level;
    if (innate.reducedCost > 0) {
      abilityData.cost = innate.reducedCost;
    }
  }

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

function extractAllClassAbilityData(system) {
  const classes = system.classes || [];

  return {
    allSecondaryAbilityCosts: extractCostMap(classes, "secondaryAbilityCosts"),
    allSecondaryInnateBonuses: extractInnateArray(classes, "secondaryAbilities")
  };
}