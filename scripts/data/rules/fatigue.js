import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";
import { AddModifier } from "../../utils/helpers.js";

export class FatigueRule extends BaseRule {
  Initialize(system) {
    if (system.core.fatigue.final === undefined) system.core.fatigue.final = 0;
    if (system.core.fatigue.actionPenalty === undefined) system.core.fatigue.actionPenalty = 0;
    if (system.core.fatigue.special === undefined) system.core.fatigue.special = 0;
  }

  Derived(system) {
    this.Initialize(system);

    system.core.fatigue.final =
      toNum(system.characteristics.Constitution.base) + toNum(system.core.fatigue.special);
    if (toNum(system.core.fatigue.final) <= 4) {
      //If has a fatigue of 4 or lower, don't start calculating until current does not match final
      if (toNum(system.core.fatigue.current) < toNum(system.core.fatigue.final)) {
        //Has spent fatigue and will start getting penalties
        system.core.fatigue.actionPenalty = fatiguePenalty[toNum(system.core.fatigue.current)];
      } else {
        system.core.fatigue.actionPenalty = 0;
      }
    } else {
      //If has a higher that 4 fatigue, calculate normally.
      system.core.fatigue.actionPenalty = fatiguePenalty[toNum(system.core.fatigue.current)] ?? 0;
    }

    AddModifier(system.globalModifiers.Action, {
      id: "fatigue",
      source: "Fatigue",
      value: system.core.fatigue.actionPenalty,
      type: "special"
    });
  }

  DetectChanged(updateData, oldSystem) {
    //watches for con base and current fatigue
    const changed = [];

    const newChar = foundry.utils.getProperty(
      updateData,
      "system.characteristics.Constitution.base"
    );

    if (newChar !== undefined && newChar !== oldSystem.characteristics.Constitution.base) {
      changed.push("Constitution");
    }

    const newCurrent = foundry.utils.getProperty(updateData, "system.core.fatigue.current");
    if (newCurrent !== undefined && newCurrent !== oldSystem.core.fatigue.current)
      changed.push("fatigue");

    return changed;
  }

  RecalcUpdated(system, name) {
    system.core.fatigue.final =
      toNum(system.characteristics.Constitution.base) + toNum(system.core.fatigue.special);
    if (toNum(system.core.fatigue.final) <= 4) {
      //If has a fatigue of 4 or lower, don't start calculating until current does not match final
      if (toNum(system.core.fatigue.current) < toNum(system.core.fatigue.final)) {
        //Has spent fatigue and will start getting penalties
        system.core.fatigue.actionPenalty = fatiguePenalty[toNum(system.core.fatigue.current)];
      } else {
        system.core.fatigue.actionPenalty = 0;
      }
    } else {
      //If has a higher that 4 fatigue, calculate normally.
      system.core.fatigue.actionPenalty = fatiguePenalty[toNum(system.core.fatigue.current)] ?? 0;
    }
    AddModifier(system.globalModifiers.Action, {
      id: "fatigue",
      source: "Fatigue",
      value: system.core.fatigue.actionPenalty,
      type: "special"
    });
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

const fatiguePenalty = {
  0: -120,
  1: -80,
  2: -40,
  3: -20,
  4: -10
};
