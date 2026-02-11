import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class KiRule extends BaseRule {
  Initialize(system) {
    // Add all the supplemental fields cost, class, final, special
    // Ki
    if (system.core.ki.cost === undefined) system.core.ki.cost = 0;
    if (system.core.ki.class === undefined) system.core.ki.class = 0;
    if (system.core.ki.special === undefined) system.core.ki.special = 0;
    if (system.core.ki.accumulationCost === undefined) system.core.ki.accumulationCost = 0;
    if (system.core.ki.final === undefined) system.core.ki.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    //ki
    const classKi = toNum(system.core.ki.class);
    const specialKi = toNum(system.core.ki.special);
    system.core.ki.final = classKi + specialKi;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    // Ki
    const kiClassPath = oldSystem.core.ki.class;
    const kiSpecialPath = oldSystem.core.ki.special;
    const newKiClass = foundry.utils.getProperty(updateData, kiClassPath);
    const newKiSpecial = foundry.utils.getProperty(updateData, kiSpecialPath);

    if (newKiClass !== undefined && newKiClass !== oldSystem.core.ki.class) {
      changed.push("ki");
    }

    if (newKiSpecial !== undefined && newKiSpecial !== oldSystem.core.ki.special) {
      changed.push("ki");
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }
    return changed;
  }

  RecalcUpdated(system, name) {
    const classKi = toNum(system.core.ki.class);
    const specialKi = toNum(system.core.ki.special);
    system.core.ki.final = classKi + specialKi;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
