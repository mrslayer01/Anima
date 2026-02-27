import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";
import { DAMAGE_TYPES } from "../../utils/lookup.js";

export class AdvantageRule extends BaseRule {
  Initialize(system) {
    //Init

    calculateAdvantages(system);
  }

  Derived(system) {
    this.Initialize(system);
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    return changed;
  }

  RecalcUpdated(system, name) {
    //Init
    Initialize(system);
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function calculateAdvantages(system) {
  const advantages = system.advantages || [];
  if (advantages === undefined) return;

  const hasAptitudeSubject = advantages.find((l) => l.name === "Aptitude in a Subject");
  const hasAptitudeField = advantages.find((l) => l.name === "Aptitude in a Field");
  const hasAccuteSense = advantages.find((l) => l.name === "Acute Senses");
  const hasJackOfAllTrades = advantages.find((l) => l.name === "Jack of All Trades");
  const hasNaturalArmor = advantages.find((l) => l.name === "Natural Armor");
  const hasMysticalArmor = advantages.find((l) => l.name === "Mystical Armor");
  const hasUntiring = advantages.find((l) => l.name === "Untiring");
  const hasRegen = advantages.find((l) => l.name === "Regeneration");
  const hasQuickReflexes = advantages.find((l) => l.name === "Quick Reflexes");

  if (hasAptitudeSubject !== undefined) AptitudeInASubject(system, hasAptitudeSubject);
  if (hasAptitudeField !== undefined) AptitudeInAField(system, hasAptitudeField);
  if (hasUntiring !== undefined) Untiring(system, hasUntiring);
  if (hasRegen !== undefined) Regeneration(system, hasRegen);
  if (hasQuickReflexes !== undefined) QuickReflexes(system, hasQuickReflexes);

  if (hasAccuteSense !== undefined) AccuteSenses(system);
  if (hasJackOfAllTrades !== undefined) JackOfAllTrades(system);
  if (hasNaturalArmor !== undefined || hasMysticalArmor !== undefined) ArmorAdvantages(system);
}

function AptitudeInASubject(system, adv) {
  // Handles Aptitude in a subject which reduces the chosen abilities cost by 1 or 2 depending on the cost, can't reduce below 1.
  // This will overwrite whatever the class cost is for the secondary ability.
  // Ability name is stored in the special field.
  for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
    for (const [abilityName, ability] of Object.entries(category)) {
      if (abilityName === adv.special) {
        const oldCost = toNum(system.abilities.secondary[categoryName][abilityName].cost);
        if (oldCost === 0) return; // Means a class has not been selected.

        const newCost = adv.cost;
        let finalCost = oldCost - newCost;
        if (finalCost <= 0) finalCost = 1;

        system.abilities.secondary[categoryName][abilityName].cost = finalCost;
      }
    }
  }
}

function AptitudeInAField(system, adv) {
  // Handles Aptitude in a Field which reduces the chosen abilities cost by 1, can't reduce below 1.
  // This will overwrite whatever the class cost is for the secondary ability.
  // Category name is stored in the special field.
  for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
    if (categoryName === adv.special) {
      for (const [abilityName, ability] of Object.entries(category)) {
        const oldCost = toNum(system.abilities.secondary[categoryName][abilityName].cost);
        if (oldCost === 0) return; // Means a class has not been selected.

        let finalCost = oldCost - 1;
        if (finalCost <= 0) finalCost = 1;

        system.abilities.secondary[categoryName][abilityName].cost = finalCost;
      }
    }
  }
}

function Untiring(system, adv) {
  // +3 Fatigue special; +6 or +9 with more points. 1, 2 or 3 cost
  let cost = toNum(adv.cost);
  const curSpec = toNum(system.core.fatigue.special);
  if (cost > 3) cost = 3;

  system.core.fatigue.special = curSpec + cost * 3;
}

function Regeneration(system, adv) {
  //  Increase Regeneration by 2 / 4 / 6 levels. 1, 2, or 3 cost.
  let cost = toNum(adv.cost);
  const curSpec = toNum(system.core.lifePoints.regeneration.special);
  if (cost > 3) cost = 3;

  system.core.lifePoints.regeneration.special = curSpec + cost * 2;
}

function QuickReflexes(system, adv) {
  //  +25 / +45 / +60 Initiative. 1, 2, or 3 cost.
  let cost = toNum(adv.cost);
  let bonus = 0;
  const curSpec = toNum(system.initiative.special);
  if (cost > 3) cost = 3;

  if (cost === 1) {
    bonus = 25;
  } else if (cost === 2) {
    bonus = 45;
  } else if (cost === 3) {
    bonus = 60;
  }

  system.initiative.special = curSpec + bonus;
}

function AccuteSenses(system) {
  // +30 to notice and Search added to special.
  for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
    for (const [abilityName, ability] of Object.entries(category)) {
      if (abilityName === "Notice" || abilityName === "Search") {
        const oldSpecial = toNum(system.abilities.secondary[categoryName][abilityName].special);
        const finalSpecial = oldSpecial + 30;

        system.abilities.secondary[categoryName][abilityName].special = finalSpecial;
      }
    }
  }
}

function JackOfAllTrades(system) {
  // +10 to all secondaries
  for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
    for (const [abilityName, ability] of Object.entries(category)) {
      const oldSpecial = toNum(system.abilities.secondary[categoryName][abilityName].special);
      const finalSpecial = oldSpecial + 10;

      system.abilities.secondary[categoryName][abilityName].special = finalSpecial;
    }
  }
}

function ArmorAdvantages(system) {
  // Handles both Mystical and Natural armor advantages
  const hasNaturalArmor = system.advantages.some((adv) => adv.name === "Natural Armor");
  const hasMysticalArmor = system.advantages.some((adv) => adv.name === "Mystical Armor");
  for (const type of DAMAGE_TYPES) {
    if (hasNaturalArmor) {
      //Gets +2 natural bonus to all types except energy
      if (type != "ene") {
        system.armor.total[type] += 2;
      }
    }
    if (hasMysticalArmor) {
      //Gets +4 natural energy bonus.
      if (type === "ene") {
        system.armor.total[type] += 4;
      }
    }
  }
}
