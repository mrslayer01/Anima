import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

// What global modifiers do
// Physical: Anything based on Strength, Agility, or Dexterity.
// Action: Anything that counts as an action during combat time.
// Natural: Movement‑related and agility‑based skills.
// Perception: Anything involving senses, especially vision and hearing.

export class GlobalModsRule extends BaseRule {
  Initialize(system) {
    // globalModfiers Physical, Action, Natural and Perception
    for (const mod of Object.values(system.globalModifiers)) {
      if (mod.base === undefined) mod.base = 0;
      if (mod.special === undefined) mod.special = 0;
      if (mod.armor === undefined) mod.armor = 0;
      if (mod.final === undefined) mod.final = 0;
    }
  }

  Derived(system) {
    this.Initialize(system);
    // Calculate all modifiers
    calculateModifiers(system);

    // Calculate final values
    for (const mod of Object.values(system.globalModifiers)) {
      mod.final = mod.base + mod.special + mod.armor;
    }
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    for (const modName of Object.keys(oldSystem.globalModifiers)) {
      const oldMod = oldSystem.globalModifiers[modName];

      // BASE
      const newBase = foundry.utils.getProperty(
        updateData,
        `system.globalModifiers.${modName}.base`
      );

      if (newBase !== undefined && newBase !== oldMod.base) {
        changed.push(modName);
      }

      // SPECIAL
      const newSpecial = foundry.utils.getProperty(
        updateData,
        `system.globalModifiers.${modName}.special`
      );

      if (newSpecial !== undefined && newSpecial !== oldMod.special) {
        changed.push(modName);
      }

      // ARMOR
      const newArmor = foundry.utils.getProperty(
        updateData,
        `system.globalModifiers.${modName}.armor`
      );

      console.log(newArmor);

      if (newArmor !== undefined && newArmor !== oldMod.armor) {
        changed.push(modName);
      }
    }

    return [...new Set(changed)];
  }

  RecalcUpdated(system, name) {
    // Calculate all modifiers
    calculateModifiers(system);

    // First, Calculate final values
    for (const mod of Object.values(system.globalModifiers)) {
      mod.final = mod.base + mod.special + mod.armor;
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

function calculateModifiers(system) {
  let PhysicalBase = 0;
  let PhysicalSpecial = 0;
  let PhysicalArmor = 0;

  let ActionBase = 0;
  let ActionSpecial = 0;

  let NaturalBase = 0;
  let NaturalSpecial = 0;
  let NaturalArmor = 0;

  let PerceptionBase = 0;
  let PerceptionSpecial = 0;
  let PerceptionArmor = 0;

  // Physical

  system.globalModifiers.Physical.base = PhysicalBase;
  system.globalModifiers.Physical.special = PhysicalSpecial;

  if (system.globalModifiers.Physical.armor > 0) {
    // an armor modifier is already applied, add to it.
  }

  // Action

  // Fatigue
  ActionBase += toNum(system.core.fatigue.actionPenalty);

  system.globalModifiers.Action.base = ActionBase;
  system.globalModifiers.Action.special = ActionSpecial;

  // Natural

  system.globalModifiers.Natural.base = NaturalBase;
  system.globalModifiers.Natural.special = NaturalSpecial;

  // Perception

  system.globalModifiers.Perception.base = PerceptionBase;
  system.globalModifiers.Perception.special = PerceptionSpecial;
}
