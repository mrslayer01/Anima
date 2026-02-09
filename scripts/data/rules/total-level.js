import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class TotalLevelRule extends BaseRule {
  Initialize(system) {
    if (system.level === undefined) system.level = 0;
  }

  Derived(system) {
    this.Initialize(system);

    system.level = (system.classes || []).reduce(
      (total, cls) => total + (toNum(cls.level) || 0),
      0
    );
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    // Detect if any class level changed
    (oldSystem.classes || []).forEach((cls, index) => {
      const path = `system.classes.${index}.level`;
      const newVal = foundry.utils.getProperty(updateData, path);

      if (newVal !== undefined && newVal !== cls.level) {
        changed.push(index);
      }
    });

    return changed;
  }

  RecalcUpdated(system, name) {
    system.level = (system.classes || []).reduce(
      (total, cls) => total + (toNum(cls.level) || 0),
      0
    );
  }

  Update(updateData, oldSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);
    if (changed.length > 0) {
      this.RecalcUpdated(newSystem);
    }
    return changed;
  }
}
