import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";
import { ABILITIES_PRIMARIES_SCHEMA } from "./schema.js";

export class AbilitiesPrimaryRule extends BaseRule {
  Initialize(system) {
    if (system.abilities.primary.totalDPSpent === undefined)
      system.abilities.primary.totalDPSpent = 0;

    // add percent, final and current for abilityLimits
    for (const [categoryName, limit] of Object.entries(system.abilities.primary.abilityLimits)) {
      if (limit.percent === undefined) limit.percent = 0;
      if (limit.final === undefined) limit.final = 0;
      if (limit.current === undefined) limit.current = 0;
    }

    // Add all the missing fields cost, class, final, special, mastery and characteristic
    for (const [categoryName, category] of Object.entries(system.abilities.primary)) {
      for (const [name, abil] of Object.entries(category)) {
        if (categoryName != "abilityLimits") {
          if (abil.cost === undefined) abil.cost = 0;
          if (abil.class === undefined) abil.class = 0;
          if (abil.final === undefined) abil.final = 0;
          if (abil.special === undefined) abil.special = 0;
          if (name != "MAMultiple") {
            if (abil.characteristic === undefined)
              abil.characteristic = ABILITIES_PRIMARIES_SCHEMA[name].characteristic || null;
            if (abil.mastery === undefined) abil.mastery = false;
          }
        }
      }
    }
  }

  Derived(system) {
    this.Initialize(system);

    // Calculate Primary Abilities
    for (const [categoryName, category] of Object.entries(system.abilities.primary)) {
      for (const [name, abil] of Object.entries(category)) {
        if (categoryName != "abilityLimits") {
          const linkedChar = abil.characteristic;
          const charFinal = toNum(system.characteristics[linkedChar]?.final);
          const base = toNum(abil.base);
          const bonus = toNum(abil.bonus);
          const cls = toNum(abil.class);
          const special = toNum(abil.special);
          const total = base + bonus + cls + special;
          abil.final = total + charFinal;
          abil.mastery = total >= 200;
        }
      }
    }
  }

  DetectChanged(updateData, oldSystem) {
    //watches characteristics, base, bonus, class and special
    const changed = [];

    //check for any changed characterstics. Check base and bonus.
    for (const [categoryName, category] of Object.entries(oldSystem.abilities.primary)) {
      for (const [abilityName, abil] of Object.entries(category)) {
        const linkedChar = abil.characteristic;
        const charPath = `system.characteristics.${linkedChar}.base`;
        const charPathBonus = `system.characteristics.${linkedChar}.bonus`;
        const newChar = foundry.utils.getProperty(updateData, charPath);
        const newCharBonus = foundry.utils.getProperty(updateData, charPathBonus);
        const oldChar = oldSystem.characteristics[linkedChar]?.base;
        const oldCharBonus = oldSystem.characteristics[linkedChar]?.bonus;

        if (newChar !== undefined && newChar !== oldChar) {
          changed.push(abilityName);
        }

        if (newCharBonus !== undefined && newCharBonus !== oldCharBonus) {
          changed.push(abilityName);
        }
      }
    }

    //check if any base/bonus/class or special has changed
    for (const [categoryName, category] of Object.entries(oldSystem.abilities.primary)) {
      for (const [abilityName, abil] of Object.entries(category)) {
        const oldAbil = oldSystem.abilities.primary[categoryName][abilityName];
        const bonusPath = `system.abilities.primary.${categoryName}.${abilityName}.bonus`;
        const basePath = `system.abilities.primary.${categoryName}.${abilityName}.base`;
        const classPath = `system.abilities.primary.${categoryName}.${abilityName}.class`;
        const specialPath = `system.abilities.primary.${categoryName}.${abilityName}.special`;

        const newBonus = foundry.utils.getProperty(updateData, bonusPath);
        const newBase = foundry.utils.getProperty(updateData, basePath);
        const newClass = foundry.utils.getProperty(updateData, classPath);
        const newSpecial = foundry.utils.getProperty(updateData, specialPath);

        if (newBonus !== undefined && newBonus !== oldAbil.bonus) {
          changed.push(abilityName);
        }

        if (newBase !== undefined && newBase !== oldAbil.base) {
          changed.push(abilityName);
        }

        if (newClass !== undefined && newClass !== oldAbil.class) {
          changed.push(abilityName);
        }

        if (newSpecial !== undefined && newSpecial !== oldAbil.special) {
          changed.push(abilityName);
        }
      }
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return [...new Set(changed)];
  }

  RecalcUpdated(system, abilityName) {
    // Find the ability inside the nested categories
    for (const category of Object.values(system.abilities.primary)) {
      if (category[abilityName]) {
        const abil = category[abilityName];

        const linkedChar = abil.characteristic;
        const charFinal = toNum(system.characteristics[linkedChar]?.final);

        const base = toNum(abil.base);
        const bonus = toNum(abil.bonus);
        const cls = toNum(abil.class);
        const special = toNum(abil.special);

        const total = base + bonus + cls + special;

        abil.final = total + charFinal;
        abil.mastery = total >= 200;

        return; // done
      }
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
