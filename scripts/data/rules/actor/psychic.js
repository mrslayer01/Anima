import { toNum } from "../../../utils/numbers.js";
import { BaseRule } from "../base-rule.js";

export class PsychicPointsRule extends BaseRule {
  Initialize(system) {
    //Init cost/ppPerLevel,levelInterval
    const psychicPointsPath = system.abilities.primary.Psychic.PsychicPoints;
    const psychicPotentialPath = system.abilities.primary.Psychic.PsychicPotential;
    if (!psychicPointsPath.class) psychicPointsPath.class = 0;
    if (!psychicPointsPath.cost) psychicPointsPath.cost = 0;
    if (!psychicPointsPath.final) psychicPointsPath.final = 0;
    if (!psychicPointsPath.innateSlots) psychicPointsPath.innateSlots = 0;

    if (!psychicPotentialPath.base) psychicPotentialPath.base = 0;
    if (!psychicPotentialPath.special) psychicPotentialPath.special = 0;
    if (!psychicPotentialPath.permanentBonus) psychicPotentialPath.permanentBonus = 0;
    if (!psychicPotentialPath.final) psychicPotentialPath.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const psychicPointsPath = system.abilities.primary.Psychic.PsychicPoints;
    const ppBase = toNum(psychicPointsPath.base);
    const ppBonus = toNum(psychicPointsPath.bonus);

    const ppClass = toNum(psychicPointsPath.class);

    psychicPointsPath.final = ppBase + ppClass + ppBonus;

    const psychicPotentialPath = system.abilities.primary.Psychic.PsychicPotential;
    const willpower = toNum(system.characteristics.Willpower.base);
    const basePotential = getPsychicPotential(willpower);
    psychicPotentialPath.base = basePotential;

    const pPotBase = toNum(psychicPotentialPath.base);
    const pPotSpecial = toNum(psychicPotentialPath.special);
    const pPotBonus = toNum(psychicPotentialPath.bonus);
    const pPotPermBonus = toNum(psychicPotentialPath.permanentBonus);

    psychicPotentialPath.final = pPotBase + pPotBonus + pPotSpecial + pPotPermBonus;
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
    const psychicPotentialPath = system.abilities.primary.Psychic.PsychicPotential;
    const willpower = toNum(system.characteristics.Willpower.base);
    const basePotential = getPsychicPotential(willpower);
    psychicPotentialPath.base = basePotential;

    const pPotBase = toNum(psychicPotentialPath.base);
    const pPotSpecial = toNum(psychicPotentialPath.special);
    const pPotBonus = toNum(psychicPotentialPath.bonus);

    psychicPotentialPath.final = pPotBase + pPotBonus + pPotSpecial;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

const PSYCHIC_POTENTIAL_TABLE = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 10,
  6: 20,
  7: 30,
  8: 40,
  9: 50,
  10: 60,
  11: 70,
  12: 80,
  13: 90,
  14: 100,
  15: 120,
  16: 140,
  17: 160,
  18: 180,
  19: 200,
  20: 220
};

function getPsychicPotential(willpower) {
  return PSYCHIC_POTENTIAL_TABLE[willpower] ?? 0;
}
