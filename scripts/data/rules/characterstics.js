import { getMaxActions, lookupCharacteristicMod } from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class CharactersiticsRule extends BaseRule {
  Initialize(system) {
    for (const [name, char] of Object.entries(system.characteristics)) {
      if (char.final === undefined) char.final = 0;
      if (char.special === undefined) char.special = 0;
    }
  }

  Derived(system) {
    //first make sure the needed fields are created by initalizing them.
    this.Initialize(system);
    const chars = system.characteristics;

    //Start logic
    //Calculate final value
    for (const [name, char] of Object.entries(chars)) {
      const base = toNum(char.base);
      const bonus = toNum(char.bonus);
      const special = toNum(char.special);
      const modifier = lookupCharacteristicMod(base + special + bonus);

      char.final = modifier;
    }

    //Calculate Max actions
    system.combat.maxActions = getMaxActions(
      toNum(chars.Agility.base),
      toNum(chars.Dexterity.base)
    );
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    for (const [name, char] of Object.entries(oldSystem.characteristics)) {
      const basePath = `system.characteristics.${name}.base`;
      const bonusPath = `system.characteristics.${name}.bonus`;

      const newBase = foundry.utils.getProperty(updateData, basePath);
      const newBonus = foundry.utils.getProperty(updateData, bonusPath);

      const oldChar = oldSystem.characteristics[name];

      if (newBase !== undefined && newBase !== oldChar.base) changed.push(name);
      if (newBonus !== undefined && newBonus !== oldChar.bonus) changed.push(name);
    }

    return [...new Set(changed)];
  }

  RecalcUpdated(system, name) {
    //handles recalculating for only the value that was passed.
    const chars = system.characteristics;
    const char = system.characteristics[name];
    if (!char) return;

    const base = toNum(char.base) || 0;
    const bonus = toNum(char.bonus) || 0;
    const special = toNum(char.special);

    char.mod = lookupCharacteristicMod(base + special + bonus);
    char.final = char.mod;
    //Calculate Max actions
    system.combat.maxActions = getMaxActions(
      toNum(chars.Agility.base),
      toNum(chars.Dexterity.base)
    );
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);
    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }
    return changed;
  }
}
