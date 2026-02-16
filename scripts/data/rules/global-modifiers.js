import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

// What global modifiers do
// Physical: Anything based on Strength, Agility, or Dexterity.
// Action: Anything that counts as an action during combat time.
// Natural: Movement‑related and agility‑based skills.
// Perception: Anything involving senses, especially vision and hearing.

export class GlobalModsRule extends BaseRule {
  Initialize(system) {
    for (const mod of Object.values(system.globalModifiers)) {
      if (mod.base === undefined) mod.base = 0;
      if (mod.special === undefined) mod.special = 0;
      if (mod.armor === undefined) mod.armor = 0;
      if (mod.final === undefined) mod.final = 0;
      if (!Array.isArray(mod.currentMods)) mod.currentMods = [];
    }
  }

  Derived(system) {
    this.Initialize(system);

    calculateModifiers(system);

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
  for (const [modName, mod] of Object.entries(system.globalModifiers)) {
    // Reset totals
    mod.base = 0;
    mod.special = 0;
    mod.armor = 0;
    mod.movement = 0;

    // Rebuild totals from currentMods
    for (const entry of mod.currentMods) {
      if (entry.type === "base") mod.base += toNum(entry.value);
      if (entry.type === "special") mod.special += toNum(entry.value);
      if (entry.type === "armor") mod.armor += toNum(entry.value);
      if (entry.type === "movement") mod.movement += toNum(entry.value);
    }
  }
}
