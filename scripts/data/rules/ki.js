import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class KiRule extends BaseRule {
  Initialize(system) {
    // Add all the supplemental fields cost, class, final, special
    // Ki
    const kiPath = system.abilities.primary.Combat.Ki;
    const kiAccuPath = system.abilities.primary.Combat.KiAccumulation;
    if (kiPath.base === undefined) kiPath.base = 0;
    if (kiPath.cost === undefined) kiPath.cost = 0;
    if (kiPath.class === undefined) kiPath.class = 0;
    if (kiPath.special === undefined) kiPath.special = 0;
    if (kiPath.final === undefined) kiPath.final = 0;
    if (kiAccuPath.cost === undefined) kiPath.kiAccumulation.cost = 0;
    if (kiAccuPath.final === undefined) kiPath.kiAccumulation.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const kiPath = system.abilities.primary.Combat.Ki;
    const kiAccuPath = system.abilities.primary.Combat.KiAccumulation;
    //ki
    const baseKi = toNum(kiPath.base);
    const classKi = toNum(kiPath.class);
    const specialKi = toNum(kiPath.special);
    kiPath.final = classKi + specialKi + baseKi;
    //ki accumulation

    kiAccuPath.final = toNum(kiAccuPath.base);
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    const oldSystemKiPath = oldSystem.abilities.primary.Combat.Ki;
    const oldSystemKiAccuPath = oldSystem.abilities.primary.Combat.KiAccumulation;

    // Ki
    const kiBasePath = `${oldSystemKiPath}.base`;
    const kiClassPath = `${oldSystemKiPath}.base`;
    const kiSpecialPath = `${oldSystemKiPath}.base`;
    const newKiBase = foundry.utils.getProperty(updateData, kiBasePath);
    const newKiClass = foundry.utils.getProperty(updateData, kiClassPath);
    const newKiSpecial = foundry.utils.getProperty(updateData, kiSpecialPath);

    if (newKiBase !== undefined && newKiBase !== oldSystemKiPath.base) {
      changed.push("ki");
    }

    if (newKiClass !== undefined && newKiClass !== oldSystemKiPath.class) {
      changed.push("ki");
    }

    if (newKiSpecial !== undefined && newKiSpecial !== oldSystemKiPath.special) {
      changed.push("ki");
    }

    // Ki Accumulation
    const kiAccuBasePath = `${oldSystemKiAccuPath}.base`;
    const newKiAccuBase = foundry.utils.getProperty(updateData, kiAccuBasePath);
    if (newKiAccuBase !== undefined && newKiAccuBase !== oldSystemKiAccuPath.base) {
      changed.push("kiAccu");
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }
    return changed;
  }

  RecalcUpdated(system, name) {
    const kiPath = system.abilities.primary.Combat.Ki;
    const kiAccuPath = system.abilities.primary.Combat.KiAccumulation;
    //ki
    const baseKi = toNum(kiPath.base);
    const classKi = toNum(kiPath.class);
    const specialKi = toNum(kiPath.special);
    kiPath.final = classKi + specialKi + baseKi;
    //ki accumulation

    kiAccuPath.final = toNum(kiAccuPath.base);
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
