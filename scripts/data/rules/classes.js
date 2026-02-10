import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class ClassesRule extends BaseRule {
  Derived(system) {
    const classes = system.classes || [];
    const classDetails = extractAllClassAbilityData(classes);

    const { allPrimaryInnateBonuses, allSecondaryAbilityCosts, allSecondaryInnateBonuses } =
      classDetails;

    for (const cls of classes) {
      const level = toNum(cls.level) || 0;

      // Life Points and LP Multiple Cost
      system.core.lifePoints.class += toNum(cls.lifePointsPerLevel) * level;
      system.core.lifePoints.classMultipleCost = toNum(cls.lifePointMultiple);

      // Initiative
      system.initiative.class += toNum(cls.initiativePerLevel) * level;

      // Martial Knowledge
      system.martialKnowledge.class += toNum(cls.martialKnowledgePerLevel) * level;

      // // Psychic Points
      system.core.psychicPoints.ppPerLevel += toNum(cls.psychicPointsPerLevel);
      system.core.psychicPoints.levelInterval = toNum(cls.psychicPointsInterval);

      //#region Primary Abilities
      // Ability Limits
      PrimaryAbilities(cls, system, allPrimaryInnateBonuses, level);
      //#endregion
    }
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    (oldSystem.classes || []).forEach((cls, index) => {
      const path = `system.classes.${index}.level`;
      const newVal = foundry.utils.getProperty(updateData, path);

      if (newVal !== undefined && newVal !== cls.level) {
        changed.push(index);
      }
    });

    return changed;
  }

  RecalcUpdated(system, name) {
    //Init
    const classes = system.classes || [];
    const classDetails = extractAllClassAbilityData(classes);

    const { allPrimaryInnateBonuses, allSecondaryAbilityCosts, allSecondaryInnateBonuses } =
      classDetails;
    for (const cls of classes) {
      const level = toNum(cls.level) || 0;

      // Life Points and LP Multiple Cost
      system.core.lifePoints.class += toNum(cls.lifePointsPerLevel) * level;
      system.core.lifePoints.classMultipleCost = toNum(cls.lifePointMultiple);

      // Initiative
      system.initiative.class = 0;
      system.initiative.class += toNum(cls.initiativePerLevel) * level;

      // Martial Knowledge
      system.martialKnowledge.class = 0;
      system.martialKnowledge.class += toNum(cls.martialKnowledgePerLevel) * level;

      // // Psychic Points
      system.core.psychicPoints.ppPerLevel += toNum(cls.psychicPointsPerLevel);
      system.core.psychicPoints.levelInterval = toNum(cls.psychicPointsInterval);

      //#region Primary Abilities
      // Ability Limits
      PrimaryAbilities(cls, system, allPrimaryInnateBonuses, level);
      //#endregion
    }
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function normalizeAbilityName(name) {
  return name
    .trim()
    .split(/\s+/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function extractCostMap(classToExtract, key, { includeLevel = false } = {}) {
  return classToExtract.flatMap((cls) =>
    Object.entries(cls[key] || {}).map(([name, cost]) => ({
      name: normalizeAbilityName(name),
      cost,
      ...(includeLevel ? { level: cls.level || 0 } : {})
    }))
  );
}

function extractInnateArray(classToExtract, key) {
  return classToExtract.flatMap((cls) =>
    (cls.innateBonuses?.[key] || []).map((bonus) => ({
      ...bonus,
      name: normalizeAbilityName(bonus.name),
      level: cls.level || 0
    }))
  );
}

function extractAllClassAbilityData(classes) {
  return {
    allPrimaryInnateBonuses: extractInnateArray(classes, "primaryAbilities"),

    allSecondaryAbilityCosts: extractCostMap(classes, "secondaryAbilityCosts"),
    allSecondaryInnateBonuses: extractInnateArray(classes, "secondaryAbilities")
  };
}

export function calculatePrimaryLimits(system) {
  const maxDP = system.developmentPoints.final;
  const limits = system.abilities.primary.abilityLimits;

  for (const [cat, obj] of Object.entries(limits)) {
    obj.final = maxDP * (toNum(obj.percent) / 100);
  }
}

export function calculatePrimaryCategoryTotals(system) {
  const totals = {
    Combat: 0,
    Psychic: 0,
    Supernatural: 0
  };

  for (const rec of system.developmentPoints.spentRecords) {
    if (rec.type !== "Primary") continue;
    if (!rec.category) continue;

    const dp = toNum(rec.amount) * toNum(rec.costPer);
    totals[rec.category] += dp;
  }

  const limits = system.abilities.primary.abilityLimits;
  limits.Combat.current = totals.Combat;
  limits.Psychic.current = totals.Psychic;
  limits.Supernatural.current = totals.Supernatural;
}

function PrimaryAbilities(cls, system, allPrimaryInnateBonuses, level) {
  for (const [limit, value] of Object.entries(cls.abilityLimits || {})) {
    const target = system.abilities.primary.abilityLimits[limit];
    if (!target) continue;

    target.percent = toNum(value);
  }

  // Primary Ability DP Costs
  for (const [name, cost] of Object.entries(cls.primaryAbilityCosts || {})) {
    const key = normalizeAbilityName(name);
    if (key === "Ki") {
      system.core.ki.costKi = toNum(cost);
    } else if (key === "KiAccumulation") {
      system.core.ki.costAccumulation = toNum(cost);
    } else {
      system.abilities.primary.Combat[key].cost = toNum(cost);
    }
  }

  // Primary supernaturalAbilityCosts
  for (const [name, cost] of Object.entries(cls.supernaturalAbilityCosts || {})) {
    const key = normalizeAbilityName(name);
    if (key === "Zeon") {
      system.core.zeon.cost = toNum(cost);
    } else {
      system.abilities.primary.Supernatural[key].cost = toNum(cost);
    }
  }

  // Primary psychicAbilityCosts
  for (const [name, cost] of Object.entries(cls.psychicAbilityCosts || {})) {
    const key = normalizeAbilityName(name);
    if (key === "PsychicPoints") {
      system.core.psychicPoints.cost = toNum(cost);
    } else {
      system.abilities.primary.Psychic[key].cost = toNum(cost);
    }
  }

  for (const innate of allPrimaryInnateBonuses) {
    const name = normalizeAbilityName(innate.name);
    if (name === "Zeon") {
      system.core.zeon.class = toNum(innate.innateBonus) * level;
    } else if (system.abilities?.primary?.Combat[name]) {
      let finalClassBonus = toNum(innate.innateBonus) * level;
      if (finalClassBonus > 50) finalClassBonus = 50;
      system.abilities.primary.Combat[name].class = finalClassBonus;
    } else if (system.abilities?.primary?.Supernatural[name]) {
      system.abilities.primary.Supernatural[name].class = toNum(innate.innateBonus) * level;
    }
  }
}
