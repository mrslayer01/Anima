import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";
import { RESISTANCE_SCHEMA } from "./schema.js";

export class ResistancesRule extends BaseRule {
  Initialize(system) {
    for (const [name, res] of Object.entries(system.resistances)) {
      if (res.final === undefined) res.final = 0;

      //Set Characterstic
      if (res.characteristic === undefined) {
        if (!res.characteristic) {
          res.characteristic = RESISTANCE_SCHEMA[name];
        }
      }
    }
  }

  Derived(system) {
    this.Initialize(system);

    const presence = toNum(system.presence.final);

    //Calculate final value
    for (const [name, res] of Object.entries(system.resistances)) {
      const bonus = toNum(res.bonus);
      const linkedChar = res.characteristic;
      const charFinal = toNum(system.characteristics[linkedChar]?.final);

      res.final = presence + charFinal + bonus;
    }
  }
  DetectChanged(updateData, oldSystem) {
    //Watches presence, Bonus and Linked Characterstic final.
    const changed = [];

    //Check if presence has changed
    //detect is presence changed
    const newPresence = foundry.utils.getProperty(updateData, "system.presence.final");
    if (newPresence !== undefined && newPresence !== oldSystem.presence.final) {
      changed.push(...Object.keys(oldSystem.resistances));
    }

    //Check if any bonus has changed
    for (const [name, oldRes] of Object.entries(oldSystem.resistances)) {
      const bonusPath = `system.resistances.${name}.bonus`;
      const newBonus = foundry.utils.getProperty(updateData, bonusPath);
      if (newBonus !== undefined && newBonus !== oldRes.bonus) {
        changed.push(name);
      }
    }

    for (const [abilityName, abil] of Object.entries(oldSystem.resistances)) {
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

    return [...new Set(changed)];
  }

  RecalcUpdated(system, name) {
    //re calculate the specific resistance changed. Repeating what was done Derived.
    const res = system.resistances[name];
    if (!res) return;
    const presence = toNum(system.presence.final);
    const linked = res.characteristic;
    const charFinal = toNum(system.characteristics[linked]?.final);
    const bonus = toNum(res.bonus);

    res.final = presence + charFinal + bonus;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
