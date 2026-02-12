import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class ClassesRule extends BaseRule {
  Derived(system) {
    //reset all class values.
    //loop through all the classes
    //add each classes contributions
    //stop
    const classes = system.classes || [];
    const classDetails = extractAllClassAbilityData(classes);

    const {
      allPrimaryInnateBonuses,
      allCombatAbilityCosts,
      allSupernaturalAbilityCosts,
      allPsychichAbilityCosts,
      allSecondaryAbilityCosts,
      allSecondaryInnateBonuses
    } = classDetails;

    // First, reset all class derived values
    resetAllClassDerivedFields(system);

    // Second, loop through all classes and add each classes derived values
    for (const cls of classes) {
      const level = toNum(cls.level) || 0;

      system.core.lifePoints.class += toNum(cls.lifePointsPerLevel) * level;
      system.core.lifePoints.classMultipleCost = toNum(cls.lifePointMultiple);

      system.initiative.class += toNum(cls.initiativePerLevel) * level;

      system.martialKnowledge.class += toNum(cls.martialKnowledgePerLevel) * level;

      system.abilities.primary.Psychic.PsychicPoints.ppPerLevel += toNum(cls.psychicPointsPerLevel);
      system.abilities.primary.Psychic.PsychicPoints.levelInterval = toNum(
        cls.psychicPointsInterval
      );

      PrimaryAbilities(
        cls,
        system,
        allPrimaryInnateBonuses,
        allCombatAbilityCosts,
        allSupernaturalAbilityCosts,
        allPsychichAbilityCosts,
        level
      );
      SecondaryAbilities(system, allSecondaryInnateBonuses, allSecondaryAbilityCosts, level);
    }

    // End of classes
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    //Watches class level for when it changes.

    (oldSystem.classes || []).forEach((cls, index) => {
      const lvlPath = `system.classes.${index}.level`;
      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) {
        changed.push(index);
      }
    });

    return changed;
  }

  RecalcUpdated(system, name) {
    //Init

    this.Derived(system);
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function resetAllClassDerivedFields(system) {
  system.core.lifePoints.class = 0;
  system.core.lifePoints.classMultipleCost = 0;

  system.initiative.class = 0;
  system.martialKnowledge.class = 0;

  system.abilities.primary.Psychic.PsychicPoints.ppPerLevel = 0;
  system.abilities.primary.Psychic.PsychicPoints.levelInterval = 0;
}

function PrimaryAbilities(
  cls,
  system,
  allPrimaryInnateBonuses,
  allCombatAbilityCosts,
  allSupernaturalAbilityCosts,
  allPsychichAbilityCosts,
  level
) {
  for (const [limit, value] of Object.entries(cls.abilityLimits || {})) {
    const target = system.abilities.primary.abilityLimits[limit];
    if (!target) continue;

    target.percent = toNum(value);
  }

  // Primary Ability Combat DP Costs
  for (const combat of allCombatAbilityCosts) {
    const name = normalizeAbilityName(combat.name);
    for (const [abilityName, ability] of Object.entries(system.abilities.primary.Combat)) {
      system.abilities.primary.Combat[name].cost = toNum(combat.cost);
    }
  }

  // Primary supernaturalAbilityCosts
  for (const supernatural of allSupernaturalAbilityCosts) {
    const name = normalizeAbilityName(supernatural.name);
    for (const [abilityName, ability] of Object.entries(system.abilities.primary.Supernatural)) {
      system.abilities.primary.Supernatural[name].cost = toNum(supernatural.cost);
    }
  }

  // Primary psychicAbilityCosts
  for (const psychic of allPsychichAbilityCosts) {
    const name = normalizeAbilityName(psychic.name);
    for (const [abilityName, ability] of Object.entries(system.abilities.primary.Psychic)) {
      system.abilities.primary.Psychic[name].cost = toNum(psychic.cost);
    }
  }

  for (const innate of allPrimaryInnateBonuses) {
    const name = normalizeAbilityName(innate.name);
    if (name === "Zeon") {
      system.abilities.primary.Supernatural.Zeon.class = toNum(innate.innateBonus) * level;
    } else if (system.abilities?.primary?.Combat[name]) {
      let finalClassBonus = toNum(innate.innateBonus) * level;
      if (finalClassBonus > 50) finalClassBonus = 50;
      system.abilities.primary.Combat[name].class = finalClassBonus;
    } else if (system.abilities?.primary?.Supernatural[name]) {
      system.abilities.primary.Supernatural[name].class = toNum(innate.innateBonus) * level;
    }
  }
}

function SecondaryAbilities(system, allSecondaryInnateBonuses, allSecondaryAbilityCosts, level) {
  // Apply class costs
  for (const secondary of allSecondaryAbilityCosts) {
    const name = normalizeAbilityName(secondary.name);
    for (const [abilityName, ability] of Object.entries(system.abilities.secondary[name])) {
      system.abilities.secondary[name][abilityName].cost = secondary.cost;
    }
  }

  for (const innate of allSecondaryInnateBonuses) {
    const name = normalizeAbilityName(innate.name);
    const value = toNum(innate.innateBonus) * level;

    for (const category of Object.values(system.abilities.secondary)) {
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
}

//#region Extra Functions

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
    allCombatAbilityCosts: extractCostMap(classes, "primaryAbilityCosts"),
    allSupernaturalAbilityCosts: extractCostMap(classes, "supernaturalAbilityCosts"),
    allPsychichAbilityCosts: extractCostMap(classes, "psychicAbilityCosts"),

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

//#endregion
