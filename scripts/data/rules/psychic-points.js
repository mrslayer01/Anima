import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class PsychicPointsRule extends BaseRule {
  Initialize(system) {
    //Init cost/ppPerLevel,levelInterval
    const psychicPointsPath = system.abilities.primary.Psychic.PsychicPoints;
    if (psychicPointsPath.class === undefined) psychicPointsPath.class = 0;
    if (psychicPointsPath.cost === undefined) psychicPointsPath.cost = 0;
    if (psychicPointsPath.ppPerLevel === undefined) psychicPointsPath.ppPerLevel = 0;
    if (psychicPointsPath.levelInterval === undefined) psychicPointsPath.levelInterval = 0;
    if (psychicPointsPath.final === undefined) psychicPointsPath.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const psychicPointsPath = system.abilities.primary.Psychic.PsychicPoints;
    const ppBase = toNum(psychicPointsPath.base);
    const ppClass = toNum(psychicPointsPath.class);

    psychicPointsPath.final = ppBase + ppClass;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    const psychicPointsPathOld = oldSystem.abilities.primary.Psychic.PsychicPoints;

    const ppClassPath = `${psychicPointsPathOld}.class`;
    const ppBasePath = `${psychicPointsPathOld}.base`;
    const ppPerLevelPath = `${psychicPointsPathOld}.ppPerLevel`;
    const levelIntervalPath = `${psychicPointsPathOld}.levelInterval`;
    const ppFinalPath = `${psychicPointsPathOld}.final`;

    const newClass = foundry.utils.getProperty(updateData, ppClassPath);
    const newBase = foundry.utils.getProperty(updateData, ppBasePath);
    const newPpPerLevel = foundry.utils.getProperty(updateData, ppPerLevelPath);
    const newLevelInterval = foundry.utils.getProperty(updateData, levelIntervalPath);
    const newFinal = foundry.utils.getProperty(updateData, ppFinalPath);

    if (newClass !== undefined && newClass !== psychicPointsPathOld.class) {
      changed.push("ppClass");
    }

    if (newBase !== undefined && newBase !== psychicPointsPathOld.base) {
      changed.push("ppBase");
    }

    if (newPpPerLevel !== undefined && newPpPerLevel !== psychicPointsPathOld.ppPerLevel) {
      changed.push("ppPerLevel");
    }

    if (newLevelInterval !== undefined && newLevelInterval !== psychicPointsPathOld.levelInterval) {
      changed.push("levelInterval");
    }

    if (newFinal !== undefined && newFinal !== psychicPointsPathOld.final) {
      changed.push("ppFinal");
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    const psychicPointsPath = system.abilities.primary.Psychic.PsychicPoints;
    const ppBase = toNum(psychicPointsPath.base);
    const ppClass = toNum(psychicPointsPath.class);

    psychicPointsPath.final = ppBase + ppClass;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
