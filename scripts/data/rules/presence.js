import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class PresenceRule extends BaseRule {
  Initialize(system) {
    if (system.presence.final === undefined) system.presence.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const lvl = toNum(system.level) || 0;
    const bonus = toNum(system.presence.bonus);

    const final = lvl === 0 ? 20 + bonus : 25 + lvl * 5 + bonus;

    system.presence.final = final;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    const newLevel = foundry.utils.getProperty(updateData, "system.level");
    const newBonus = foundry.utils.getProperty(updateData, "system.presence.bonus");

    if (newLevel !== undefined && newLevel !== oldSystem.level) changed.push("presence");
    if (newBonus !== undefined && newBonus !== oldSystem.presence.bonus) changed.push("presence");

    return changed;
  }

  RecalcUpdated(system, name) {
    const lvl = toNum(system.level) || 0;
    const bonus = toNum(system.presence.bonus);

    const final = lvl === 0 ? 20 + bonus : 25 + lvl * 5 + bonus;

    system.presence.final = final;
  }
  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);
    if (changed.length > 0) {
      this.RecalcUpdated(newSystem);
    }
    return changed;
  }
}
