import { BaseRule } from "../base-rule.js";
import { toNum } from "../../../utils/numbers.js";
import { ABF_KI_ABILITIES } from "../../../config/ki-dominion.js";

export class KiRule extends BaseRule {
  Initialize(system) {
    // Add all the supplemental fields cost, class, final, special
    // Ki
    const kiPath = system.abilities.primary.Combat.Ki;

    if (!kiPath.totalMk) kiPath.totalMk = 0;
    if (kiPath.totalKi === undefined) kiPath.totalKi = 0;

    for (const [name, char] of Object.entries(kiPath.characteristics)) {
      if (char.cost === undefined) char.cost = 0;
      if (char.special === undefined) char.special = 0;
      if (char.final === undefined) char.final = 0;

      if (char.kiAccumulation.cost === undefined) char.kiAccumulation.cost = 0;
      if (char.kiAccumulation.special === undefined) char.kiAccumulation.special = 0;
      if (char.kiAccumulation.final === undefined) char.kiAccumulation.final = 0;
    }

    // Create Ki Abilities Object
    if (!kiPath.abilities) kiPath.abilities = {};

    for (const [key, ability] of Object.entries(ABF_KI_ABILITIES)) {
      if (!kiPath.abilities[key]) {
        kiPath.abilities[key] = {
          name: ability.name,
          requirements: ability.requirements,
          mkCost: ability.mkCost,
          description: ability.description,
          purchased: false,
          children: ability.children || []
        };
      }
    }
  }

  Derived(system) {
    this.Initialize(system);
    const kiPath = system.abilities.primary.Combat.Ki;
    //ki
    let totalKi = 0;
    for (const [name, char] of Object.entries(kiPath.characteristics)) {
      // Set the base ki per characterstic based on it's base value. 1 - 10 is 1 for 1 ki, > 10 is 1 for 2 ki.
      const derrivedKi = lookupBaseKi(name, system);
      const base = toNum(char.base);
      const bonus = toNum(char.bonus);
      const special = toNum(char.special);

      char.final = derrivedKi + bonus + base + special;

      totalKi += toNum(char.final);

      // Set the base accumulation per characterstic based on it's value.
      const derrivedKiAccu = lookupBaseKiAccumulation(name, system);
      const baseAccu = toNum(char.kiAccumulation.base);
      const bonusAccu = toNum(char.kiAccumulation.bonus);
      const specialAccu = toNum(char.kiAccumulation.special);

      char.kiAccumulation.final = derrivedKiAccu + bonusAccu + baseAccu + specialAccu;
    }

    // Finally get the total amount of ki across all characterstics.
    kiPath.totalKi = totalKi;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    const oldKiPath = oldSystem.abilities.primary.Combat.Ki;

    for (const [name, char] of Object.entries(oldKiPath.characteristics)) {
      const basePath = `system.abilities.primary.Combat.Ki.characteristics.${name}.base`;
      const bonusPath = `system.abilities.primary.Combat.Ki.characteristics.${name}.bonus`;
      const specialPath = `system.abilities.primary.Combat.Ki.characteristics.${name}.special`;

      const baseAccuPath = `system.abilities.primary.Combat.Ki.characteristics.${name}.kiAccumulation.base`;
      const bonusAccuPath = `system.abilities.primary.Combat.Ki.characteristics.${name}.kiAccumulation.bonus`;
      const specialAccuPath = `system.abilities.primary.Combat.Ki.characteristics.${name}.kiAccumulation.special`;

      const newBase = foundry.utils.getProperty(updateData, basePath);
      const newBonus = foundry.utils.getProperty(updateData, bonusPath);
      const newSpecial = foundry.utils.getProperty(updateData, specialPath);

      const newBaseAccu = foundry.utils.getProperty(updateData, baseAccuPath);
      const newBonusAccu = foundry.utils.getProperty(updateData, bonusAccuPath);
      const newSpecialAccu = foundry.utils.getProperty(updateData, specialAccuPath);

      if (newBase !== undefined && newBase !== oldKiPath.base) changed.push(name);
      if (newBonus !== undefined && newBonus !== oldKiPath.bonus) changed.push(name);
      if (newSpecial !== undefined && newSpecial !== oldKiPath.special) changed.push(name);

      if (newBaseAccu !== undefined && newBaseAccu !== oldKiPath.kiAccumulation.base)
        changed.push(name);
      if (newBonusAccu !== undefined && newBonusAccu !== oldKiPath.kiAccumulation.bonus)
        changed.push(name);
      if (newSpecialAccu !== undefined && newSpecialAccu !== oldKiPath.kiAccumulation.special)
        changed.push(name);
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    const kiPath = system.abilities.primary.Combat.Ki;
    //ki
    for (const [name, char] of Object.entries(kiPath.characteristics)) {
      // Set the base ki per characterstic based on it's base value. 1 - 10 is 1 for 1 ki, > 10 is 1 for 2 ki.
      const derrivedKi = lookupBaseKi(name, system);
      const base = toNum(char.base);
      const bonus = toNum(char.bonus);
      const special = toNum(char.special);

      char.final = derrivedKi + bonus + base + special;

      // Set the base accumulation per characterstic based on it's value.
      const derrivedKiAccu = lookupBaseKiAccumulation(name, system);
      const baseAccu = toNum(char.kiAccumulation.base);
      const bonusAccu = toNum(char.kiAccumulation.bonus);
      const specialAccu = toNum(char.kiAccumulation.special);

      char.kiAccumulation.final = derrivedKiAccu + bonusAccu + baseAccu + specialAccu;
    }

    // Finally get the total amount of ki across all characterstics.
    kiPath.totalKi = totalKi;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function lookupBaseKi(char, system) {
  const c = toNum(system.characteristics[char]?.base) || 0;

  if (c <= 10) return c;
  return 10 + 2 * (c - 10);
}

function lookupBaseKiAccumulation(char, system) {
  const c = toNum(system.characteristics[char]?.base) || 0;

  const row = BASE_KI_ACCUMULATION_TABLE.find((r) => c >= r.min && c <= r.max);
  return row ? row.accumulation : 0;
}

const BASE_KI_ACCUMULATION_TABLE = [
  { min: 1, max: 9, accumulation: 1 },
  { min: 10, max: 12, accumulation: 2 },
  { min: 13, max: 15, accumulation: 3 },
  { min: 16, max: Infinity, accumulation: 4 }
];

function abilityRequirementsMet(ability, abilities) {
  if (!ability.requirements || ability.requirements === "None") return true;

  const req = ability.requirements;
  return Object.values(abilities).some((a) => a.name === req && a.purchased);
}
