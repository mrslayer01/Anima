import { toNum } from "../helpers/lookup.js";

export function applyClassBonuses(system) {
  const classes = system.classes || [];

  resetClassFields(system);

  for (const cls of classes) {
    const level = toNum(cls.level) || 0;

    // Life Points
    system.core.lifePoints.class += toNum(cls.lifePointsPerLevel) * level;

    // Initiative
    system.initiative.class += toNum(cls.initiativePerLevel) * level;

    // Martial Knowledge
    system.martialKnowledge.class += toNum(cls.martialKnowledgePerLevel) * level;

    // // Psychic Points
    // system.psychicPoints.perLevel += toNum(cls.psychicPointsPerLevel);
    // system.psychicPoints.interval = toNum(cls.psychicPointsInterval);

    // // Ability Limits
    // for (const [limit, value] of Object.entries(cls.abilityLimits || {})) {
    //   system.abilityLimits[limit] = toNum(value);
    // }

    // // Primary Ability DP Costs
    // for (const [name, cost] of Object.entries(cls.primaryAbilityCosts || {})) {
    //   const key = normalizeAbilityName(name);
    //   system.abilities.primaries[key].classCost = toNum(cost);
    // }

    // // Supernatural Ability DP Costs
    // for (const [name, cost] of Object.entries(cls.supernaturalAbilityCosts || {})) {
    //   const key = normalizeAbilityName(name);
    //   system.abilities.supernatural[key].classCost = toNum(cost);
    // }

    // // Psychic Ability DP Costs
    // for (const [name, cost] of Object.entries(cls.psychicAbilityCosts || {})) {
    //   const key = normalizeAbilityName(name);
    //   system.abilities.psychic[key].classCost = toNum(cost);
    // }

    // // Secondary Ability DP Costs
    // for (const [name, cost] of Object.entries(cls.secondaryAbilityCosts || {})) {
    //   const key = normalizeAbilityName(name);
    //   system.abilities.secondaries[key].classCost = toNum(cost);
    // }

    // // Innate Bonuses (Primary)
    // for (const bonus of cls.innateBonuses?.primaryAbilities || []) {
    //   const key = normalizeAbilityName(bonus.name);
    //   system.abilities.primaries[key].class += toNum(bonus.innateBonus);
    // }

    // // Innate Bonuses (Secondary)
    // for (const bonus of cls.innateBonuses?.secondaryAbilities || []) {
    //   const key = normalizeAbilityName(bonus.name);
    //   system.abilities.secondaries[key].class += toNum(bonus.innateBonus);
    //   if (bonus.reducedCost !== undefined) {
    //     system.abilities.secondaries[key].reducedCost = toNum(bonus.reducedCost);
    //   }
    // }

    // // Special Rules
    // if (cls.specialRules) {
    //   system.specialRules.push(cls.specialRules);
    // }
  }
}

function resetClassFields(system) {
  system.core.lifePoints.class = 0;
  system.initiative.class = 0;
  system.martialKnowledge.class = 0;

  //   system.psychicPoints.perLevel = 0;
  //   system.psychicPoints.interval = 0;

  //   for (const limit of Object.keys(system.abilityLimits)) {
  //     system.abilityLimits[limit] = 0;
  //   }

  //   for (const abil of Object.values(system.abilities.primaries)) {
  //     abil.class = 0;
  //     abil.classCost = 0;
  //   }

  //   for (const abil of Object.values(system.abilities.supernatural)) {
  //     abil.classCost = 0;
  //   }

  //   for (const abil of Object.values(system.abilities.psychic)) {
  //     abil.classCost = 0;
  //   }

  //   for (const abil of Object.values(system.abilities.secondaries)) {
  //     abil.class = 0;
  //     abil.classCost = 0;
  //     abil.reducedCost = 0;
  //   }

  //   system.specialRules = [];
}
