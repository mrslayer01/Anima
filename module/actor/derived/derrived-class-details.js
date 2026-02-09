import { toNum } from "../helpers/lookup.js";

export function applyClassBonuses(system) {
  const classes = system.classes || [];
  const classDetails = extractAllClassAbilityData(classes);

  const { allPrimaryInnateBonuses, allSecondaryAbilityCosts, allSecondaryInnateBonuses } =
    classDetails;

  resetClassFields(system);

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
    system.core.psychicPoints.perLevel += toNum(cls.psychicPointsPerLevel);
    system.core.psychicPoints.interval = toNum(cls.psychicPointsInterval);

    //#region Primary Abilities
    // Ability Limits
    for (const [limit, value] of Object.entries(cls.abilityLimits || {})) {
      const target = system.abilities.Primaries.abilityLimits[limit];
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
        system.abilities.Primaries.Combat[key].cost = toNum(cost);
      }
    }

    // Primary supernaturalAbilityCosts
    for (const [name, cost] of Object.entries(cls.supernaturalAbilityCosts || {})) {
      const key = normalizeAbilityName(name);
      if (key === "Zeon") {
        system.core.zeon.cost = toNum(cost);
      } else {
        system.abilities.Primaries.Supernatural[key].cost = toNum(cost);
      }
    }

    // Primary psychicAbilityCosts
    for (const [name, cost] of Object.entries(cls.psychicAbilityCosts || {})) {
      const key = normalizeAbilityName(name);
      if (key === "PsychicPoints") {
        system.core.psychicPoints.cost = toNum(cost);
      } else {
        system.abilities.Primaries.Psychic[key].cost = toNum(cost);
      }
    }

    for (const innate of allPrimaryInnateBonuses) {
      const name = normalizeAbilityName(innate.name);
      if (name === "Zeon") {
        system.core.zeon.class = toNum(innate.innateBonus) * level;
      } else if (system.abilities?.Primaries?.Combat[name]) {
        let finalClassBonus = toNum(innate.innateBonus) * level;
        if (finalClassBonus > 50) finalClassBonus = 50;
        system.abilities.Primaries.Combat[name].class = finalClassBonus;
      } else if (system.abilities?.Primaries?.Supernatural[name]) {
        system.abilities.Primaries.Supernatural[name].class = toNum(innate.innateBonus) * level;
      }
    }
    //#endregion

    //#region Secondaries

    // Apply class costs
    for (const secondary of allSecondaryAbilityCosts) {
      const name = normalizeAbilityName(secondary.name);
      for (const [abilityName, ability] of Object.entries(system.abilities.Secondaries[name])) {
        system.abilities.Secondaries[name][abilityName].cost = secondary.cost;
      }
    }

    for (const innate of allSecondaryInnateBonuses) {
      const name = normalizeAbilityName(innate.name);
      const value = toNum(innate.innateBonus) * level;

      for (const category of Object.values(system.abilities.Secondaries)) {
        const ability = category[name];
        if (ability) {
          ability.class = value;
          if (innate.reducedCost > 0) {
            ability.cost = innate.reducedCost;
          }
          break;
        }
      }
    }

    //#endregion
  }
}

function resetClassFields(system) {
  system.core.lifePoints.class = 0;
  system.initiative.class = 0;
  system.martialKnowledge.class = 0;

  system.core.psychicPoints.perLevel = 0;
  system.core.psychicPoints.interval = 0;

  system.core.ki.costKi = 0;
  system.core.ki.costAccumulation = 0;
  system.core.zeon.cost = 0;
  system.core.psychicPoints.cost = 0;
  system.core.zeon.class = 0;

  const groups = [
    system.abilities.Primaries.Combat,
    system.abilities.Primaries.Supernatural,
    system.abilities.Primaries.Psychic
  ];

  for (const group of groups) {
    if (!group) continue;

    for (const ability of Object.values(group)) {
      ability.cost = 0;
      if ("class" in ability) {
        ability.class = 0;
      }
    }
  }

  for (const category of Object.values(system.abilities.Secondaries)) {
    for (const ability of Object.values(category)) {
      ability.cost = 0;
      ability.class = 0;
    }
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
  const limits = system.abilities.Primaries.abilityLimits;

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

  const limits = system.abilities.Primaries.abilityLimits;
  limits.Combat.current = totals.Combat;
  limits.Psychic.current = totals.Psychic;
  limits.Supernatural.current = totals.Supernatural;
}
