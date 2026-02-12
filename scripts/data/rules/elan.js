import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class ElanRule extends BaseRule {
  Derived(system) {
    if (!Array.isArray(system.elans)) return;

    for (const elans of system.elans) {
      if (!elans.elan) elans.elan = {};

      const current = toNum(elans.elan.current);
      const special = toNum(elans.elan.special);
      const bonus = toNum(elans.elan.bonus);
      const spent = toNum(elans.elan.spent);

      elans.elan.final = current + special;

      elans.elan.remaining = current + bonus - spent;
    }
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    //Watches class level for when it changes.

    (oldSystem.elans || []).forEach((elan, index) => {
      const elanCurrent = `system.elans.${index}.elan.current`;
      const elanBonus = `system.elans.${index}.elan.bonus`;

      const newCurrent = foundry.utils.getProperty(updateData, elanCurrent);
      const newBonus = foundry.utils.getProperty(updateData, elanBonus);

      if (newCurrent !== undefined && newCurrent !== elan.elan.current) {
        changed.push(index);
      }

      if (newBonus !== undefined && newBonus !== elan.elan.bonus) {
        changed.push(index);
      }
    });

    return changed;
  }

  RecalcUpdated(system, name) {
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
