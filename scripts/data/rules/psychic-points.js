import { BaseRule } from "./base-rule.js";

export class PsychicPointsRule extends BaseRule {
  Initialize(system) {
    //Init cost/ppPerLevel,levelInterval
    if (system.core.psychicPoints.cost === undefined) system.core.psychicPoints.cost = 0;
    if (system.core.psychicPoints.ppPerLevel === undefined)
      system.core.psychicPoints.ppPerLevel = 0;
    if (system.core.psychicPoints.levelInterval === undefined)
      system.core.psychicPoints.levelInterval = 0;
  }

  Derived(system) {
    this.Initialize(system);
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    const ppPerLevelPath = "system.core.psychicPoints.ppPerLevel";
    const levelIntervalPath = "system.core.psychicPoints.levelInterval";

    const newPpPerLevel = foundry.utils.getProperty(updateData, ppPerLevelPath);
    const newLevelInterval = foundry.utils.getProperty(updateData, levelIntervalPath);

    const oldPpPerLevel = oldSystem.core.psychicPoints.ppPerLevel;
    const oldLevelInterval = oldSystem.core.psychicPoints.levelInterval;

    if (newPpPerLevel !== undefined && newPpPerLevel !== oldPpPerLevel) {
      changed.push("ppPerLevel");
    }

    if (newLevelInterval !== undefined && newLevelInterval !== oldLevelInterval) {
      changed.push("levelInterval");
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return changed;
  }

  RecalcUpdated(system, name) {}

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
