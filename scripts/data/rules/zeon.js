import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class ZeonRule extends BaseRule {
  Initialize(system) {
    if (system.core.zeon.cost === undefined) system.core.zeon.cost = 0;
    if (system.core.zeon.class === undefined) system.core.zeon.class = 0;
    if (system.core.zeon.special === undefined) system.core.zeon.special = 0;
    if (system.core.zeon.final === undefined) system.core.zeon.final = 0;
  }

  Derived(system) {
    this.Initialize(system);

    //Zeon
    const classZeon = toNum(system.core.zeon.class);
    const specialZeon = toNum(system.core.zeon.special);
    system.core.zeon.final = classZeon + specialZeon;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    // Zeon
    const zeonClassPath = oldSystem.core.zeon.class;
    const zeonSpecialPath = oldSystem.core.zeon.special;
    const newZeonClass = foundry.utils.getProperty(updateData, zeonClassPath);
    const newZeonSpecial = foundry.utils.getProperty(updateData, zeonSpecialPath);
    if (newZeonClass !== undefined && newZeonClass !== oldSystem.core.zeon.class) {
      changed.push("zeon");
    }

    if (newZeonSpecial !== undefined && newZeonSpecial !== oldSystem.core.zeon.special) {
      changed.push("zeon");
    }
    return changed;
  }

  RecalcUpdated(system, name) {
    const classZeon = toNum(system.core.zeon.class);
    const specialZeon = toNum(system.core.zeon.special);
    system.core.zeon.final = classZeon + specialZeon;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
