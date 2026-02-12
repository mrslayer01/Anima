import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class ZeonRule extends BaseRule {
  Initialize(system) {
    const zeonPath = system.abilities.primary.Supernatural.Zeon;
    if (zeonPath.cost === undefined) zeonPath.cost = 0;
    if (zeonPath.class === undefined) zeonPath.class = 0;
    if (zeonPath.special === undefined) zeonPath.special = 0;
    if (zeonPath.final === undefined) zeonPath.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const zeonPath = system.abilities.primary.Supernatural.Zeon;

    //Zeon
    const baseZeon = toNum(zeonPath.base);
    const classZeon = toNum(zeonPath.class);
    const specialZeon = toNum(zeonPath.special);
    zeonPath.final = classZeon + specialZeon + baseZeon;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    const zeonPathOld = oldSystem.abilities.primary.Supernatural.Zeon;
    // Zeon
    const zeonBasePath = `${zeonPathOld}.base`;
    const zeonClassPath = `${zeonPathOld}.class`;
    const zeonSpecialPath = `${zeonPathOld}.special`;

    const newZeonBase = foundry.utils.getProperty(updateData, zeonBasePath);
    const newZeonClass = foundry.utils.getProperty(updateData, zeonClassPath);
    const newZeonSpecial = foundry.utils.getProperty(updateData, zeonSpecialPath);
    if (newZeonBase !== undefined && newZeonBase !== zeonPathOld.base) {
      changed.push("zeon");
    }

    if (newZeonClass !== undefined && newZeonClass !== zeonPathOld.class) {
      changed.push("zeon");
    }

    if (newZeonSpecial !== undefined && newZeonSpecial !== zeonPathOld.special) {
      changed.push("zeon");
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }
    return changed;
  }

  RecalcUpdated(system, name) {
    const zeonPath = system.abilities.primary.Supernatural.Zeon;

    //Zeon
    const baseZeon = toNum(zeonPath.base);
    const classZeon = toNum(zeonPath.class);
    const specialZeon = toNum(zeonPath.special);
    zeonPath.final = classZeon + specialZeon + baseZeon;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
