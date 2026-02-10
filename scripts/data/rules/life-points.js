import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class LifePointsRule extends BaseRule {
  Initialize(system) {
    if (system.core.lifePoints.final === undefined) system.core.lifePoints.final = 0;
  }

  Derived(system) {
    this.Initialize(system);

    const totalCon = toNum(system.characteristics.Constitution.base) * 10;
    const totalConModifier = toNum(system.characteristics.Constitution.final);
    const baseLP = 20 + totalCon + totalConModifier;
    const lpBonus = toNum(system.core.lifePoints.bonus);
    const classLP = toNum(system.core.lifePoints.class);
    const classLPMultiple =
      toNum(system.core.lifePoints.classMultiple) * toNum(system.characteristics.Constitution.base);

    system.core.lifePoints.final = baseLP + classLP + lpBonus + classLPMultiple;
  }

  DetectChanged(updateData, oldSystem) {
    // Watch characterstics, bonus, class and classMultiple.
    const changed = [];
    // check for characteristic change
    const newChar = foundry.utils.getProperty(
      updateData,
      "system.characteristics.Constitution.final"
    );

    if (newChar !== undefined && newChar !== oldSystem.characteristics.Constitution.final) {
      changed.push("Constitution");
    }

    //Check for bonus/class and classMultiple changes
    const newBonus = foundry.utils.getProperty(updateData, "system.core.lifePoints.bonus");
    const newClass = foundry.utils.getProperty(updateData, "system.core.lifePoints.class");
    const newClassMultiple = foundry.utils.getProperty(
      updateData,
      "system.core.lifePoints.classMultiple"
    );

    if (newBonus !== undefined && newBonus !== oldSystem.core.lifePoints.bonus) changed.push("lp");
    if (newClass !== undefined && newClass !== oldSystem.core.lifePoints.class) changed.push("lp");
    if (
      newClassMultiple !== undefined &&
      newClassMultiple !== oldSystem.core.lifePoints.classMultiple
    )
      changed.push("lp");

    return changed;
  }

  RecalcUpdated(system, name) {
    //Init
    const totalCon = toNum(system.characteristics.Constitution.base) * 10;
    const totalConModifier = toNum(system.characteristics.Constitution.final);
    const baseLP = 20 + totalCon + totalConModifier;
    const lpBonus = toNum(system.core.lifePoints.bonus);
    const classLP = toNum(system.core.lifePoints.class);
    const classLPMultiple =
      toNum(system.core.lifePoints.classMultiple) * toNum(system.characteristics.Constitution.base);

    system.core.lifePoints.final = baseLP + classLP + lpBonus + classLPMultiple;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
