import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class ExperienceRule extends BaseRule {
  Initialize(system) {
    if (system.xp.next === undefined) system.xp.next = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const lvl = toNum(system.level) || 0;
    const next = lvl + 1;

    let xp;

    if (next <= 15) {
      xp = xpTable[next];
    } else {
      xp = xpTable[15];
      for (let i = 16; i <= next; i++) {
        xp += 450;
      }
    }
    system.xp.next = xp;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    // Watch for class levels.
    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    const lvl = toNum(system.level) || 0;
    const next = lvl + 1;

    let xp;

    if (next <= 15) {
      xp = xpTable[next];
    } else {
      xp = xpTable[15];
      for (let i = 16; i <= next; i++) {
        xp += 450;
      }
    }
    system.xp.next = xp;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

const xpTable = [
  0, // 0
  0, // 1
  100, // 2
  225, // 3
  375, // 4
  550, // 5
  750, // 6
  975, // 7
  1225, // 8
  1500, // 9
  1800, // 10
  2125, // 11
  2475, // 12
  2850, // 13
  3250, // 14
  3675 // 15
];
