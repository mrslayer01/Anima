import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class LifePointsRule extends BaseRule {
  Initialize(system) {
    // Life Points final, class, classMultiple, classMultipleCost
    if (system.core.lifePoints.final === undefined) system.core.lifePoints.final = 0;
    if (system.core.lifePoints.classMultiple === undefined)
      system.core.lifePoints.classMultiple = 0;
    if (system.core.lifePoints.classMultipleCost === undefined)
      system.core.lifePoints.classMultipleCost = 0;
    if (system.core.lifePoints.class === undefined) system.core.lifePoints.class = 0;

    // Regeneration regenLevel, lifePointsPerDayResting, lifePointsPerDayNotResting, woundPenaltyReduc, specialCapabilities, damageResistance
    if (system.core.lifePoints.regeneration.regenLevel === undefined)
      system.core.lifePoints.regeneration.regenLevel = 0;
    if (system.core.lifePoints.regeneration.special === undefined)
      system.core.lifePoints.regeneration.special = 0;
    if (system.core.lifePoints.regeneration.lifePointsPerDayResting === undefined)
      system.core.lifePoints.regeneration.lifePointsPerDayResting = 0;
    if (system.core.lifePoints.regeneration.lifePointsPerDayNotResting === undefined)
      system.core.lifePoints.regeneration.lifePointsPerDayNotResting = 0;
    if (system.core.lifePoints.regeneration.woundPenaltyReduc === undefined)
      system.core.lifePoints.regeneration.woundPenaltyReduc = "";
    if (system.core.lifePoints.regeneration.specialCapabilities === undefined)
      system.core.lifePoints.regeneration.specialCapabilities = "";
    if (system.core.lifePoints.regeneration.damageResistance === undefined)
      system.core.lifePoints.regeneration.damageResistance = false;
  }

  Derived(system) {
    this.Initialize(system);
    // Life Points
    const totalCon = toNum(system.characteristics.Constitution.base) * 10;
    const totalConModifier = toNum(system.characteristics.Constitution.final);
    const baseLP = 20 + totalCon + totalConModifier;
    const lpBonus = toNum(system.core.lifePoints.bonus);
    const classLP = toNum(system.core.lifePoints.class);
    const classLPMultiple =
      toNum(system.core.lifePoints.classMultiple) * toNum(system.characteristics.Constitution.base);

    system.core.lifePoints.final = baseLP + classLP + lpBonus + classLPMultiple;

    // Regeneration
    const lpRegen = system.core.lifePoints.regeneration;
    const con = toNum(system.characteristics.Constitution.base);
    const reggenLevel = getRegenerationLevel(con + lpRegen.bonus + lpRegen.special);
    const reGenDetails = getRegenerationDetails(reggenLevel);
    const reGenSpecial = getRegenerationSpecial(reggenLevel);

    //if has damage resistance, healing facotr is multiplied by 5.
    if (reGenDetails === null) return;
    const accountForDRResting = lpRegen.damageResistance
      ? reGenDetails.resting * 5
      : reGenDetails.resting;
    const accountForDRNotResting = lpRegen.damageResistance
      ? reGenDetails.notResting * 5
      : reGenDetails.notResting;

    lpRegen.regenLevel = reggenLevel;
    lpRegen.lifePointsPerDayResting = accountForDRResting;
    lpRegen.lifePointsPerDayNotResting = accountForDRNotResting;
    lpRegen.woundPenaltyReduc = reGenDetails.reduction;
    lpRegen.specialCapabilities = reGenSpecial;
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

    const newDR = foundry.utils.getProperty(
      updateData,
      "system.core.lifePoints.regeneration.damageResistance"
    );

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    // Life Points
    const totalCon = toNum(system.characteristics.Constitution.base) * 10;
    const totalConModifier = toNum(system.characteristics.Constitution.final);
    const baseLP = 20 + totalCon + totalConModifier;
    const lpBonus = toNum(system.core.lifePoints.bonus);
    const classLP = toNum(system.core.lifePoints.class);
    const classLPMultiple =
      toNum(system.core.lifePoints.classMultiple) * toNum(system.characteristics.Constitution.base);

    system.core.lifePoints.final = baseLP + classLP + lpBonus + classLPMultiple;

    // Regeneration
    const lpRegen = system.core.lifePoints.regeneration;
    const con = toNum(system.characteristics.Constitution.base);
    const reggenLevel = getRegenerationLevel(con + lpRegen.bonus + lpRegen.special);
    const reGenDetails = getRegenerationDetails(reggenLevel);
    const reGenSpecial = getRegenerationSpecial(reggenLevel);

    //if has damage resistance, healing facotr is multiplied by 5.
    if (reGenDetails === null) return;
    const accountForDRResting = lpRegen.damageResistance
      ? reGenDetails.resting * 5
      : reGenDetails.resting;
    const accountForDRNotResting = lpRegen.damageResistance
      ? reGenDetails.notResting * 5
      : reGenDetails.notResting;

    lpRegen.regenLevel = reggenLevel;
    lpRegen.lifePointsPerDayResting = accountForDRResting;
    lpRegen.lifePointsPerDayNotResting = accountForDRNotResting;
    lpRegen.woundPenaltyReduc = reGenDetails.reduction;
    lpRegen.specialCapabilities = reGenSpecial;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

//#region Regeneration
function getRegenerationLevel(con) {
  const c = Number(con);
  const row = REGEN_TABLE.find((r) => c >= r.min && c <= r.max);
  return row ? row.regen : 0;
}

function getRegenerationDetails(level) {
  const lvl = Number(level);
  return REGEN_DETAILS[lvl] || null;
}

function getRegenerationSpecial(level) {
  const lvl = Number(level);
  if (lvl < 1) return "";

  const categories = {
    scars: null,
    bleeding: null,
    reattach: null,
    regrow: null,
    criticals: null
  };

  let lastText = "";

  for (let i = 1; i <= lvl; i++) {
    const entry = REGEN_DETAILS[i];
    if (!entry?.special) continue;

    let text = entry.special.trim();

    // Resolve "As above" chains
    if (text.startsWith("As above")) {
      text = text.replace("As above, but ", lastText + ", but ");
      text = text.replace("As above", lastText);
    }

    lastText = text;

    const lower = text.toLowerCase();

    // CATEGORY DETECTION (robust)
    if (lower.includes("scar")) {
      categories.scars = text;
    } else if (lower.includes("bleeding")) {
      categories.bleeding = text;
    } else if (
      lower.includes("amputated limb") ||
      lower.includes("placed within") ||
      lower.includes("cleanly amputated")
    ) {
      categories.reattach = text;
    } else if (
      lower.includes("grows back") ||
      lower.includes("regrow") ||
      lower.includes("member") ||
      lower.includes("limb recovers within")
    ) {
      categories.regrow = text;
    } else if (lower.includes("critical")) {
      categories.criticals = text;
    }
  }

  return Object.values(categories).filter(Boolean).join("\n");
}

const REGEN_TABLE = [
  { min: 1, max: 2, regen: 0 },
  { min: 3, max: 7, regen: 1 },
  { min: 8, max: 9, regen: 2 },
  { min: 10, max: 10, regen: 3 },
  { min: 11, max: 11, regen: 4 },
  { min: 12, max: 12, regen: 5 },
  { min: 13, max: 13, regen: 6 },
  { min: 14, max: 14, regen: 7 },
  { min: 15, max: 15, regen: 8 },
  { min: 16, max: 16, regen: 9 },
  { min: 17, max: 17, regen: 10 },
  { min: 18, max: 18, regen: 11 },
  { min: 19, max: 20, regen: 12 }
];

const REGEN_DETAILS = {
  0: {
    resting: "Unable to Regenerate",
    notResting: "Unable to Regenerate",
    reduction: "0",
    special: ""
  },
  1: {
    resting: "10 per day",
    notResting: "5 per day",
    reduction: "-5 per day",
    special: ""
  },
  2: {
    resting: "20 per day",
    notResting: "10 per day",
    reduction: "-5 per day",
    special: ""
  },
  3: {
    resting: "30 per day",
    notResting: "15 per day",
    reduction: "-5 per day",
    special: ""
  },
  4: {
    resting: "40 per day",
    notResting: "20 per day",
    reduction: "-10 per day",
    special: ""
  },
  5: {
    resting: "50 per day",
    notResting: "25 per day",
    reduction: "-10 per day",
    special: "No scars remain"
  },
  6: {
    resting: "75 per day",
    notResting: "30 per day",
    reduction: "-15 per day",
    special: "Does not suffer Bleeding Out"
  },
  7: {
    resting: "100 per day",
    notResting: "50 per day",
    reduction: "-20 per day",
    special: "Cleanly amputated limbs recover if placed within 1 week"
  },
  8: {
    resting: "250 per day",
    notResting: "100 per day",
    reduction: "-25 per day",
    special: "Cleanly amputated limbs recover if placed within 5 days"
  },
  9: {
    resting: "500 per day",
    notResting: "200 per day",
    reduction: "-30 per day",
    special:
      "Cleanly amputated limbs recover if placed within 3 days; automatically overcomes Between Life and Death"
  },
  10: {
    resting: "1 per minute",
    notResting: "NA",
    reduction: "-40 per day",
    special:
      "Cleanly amputated limbs recover if placed within 1 days; automatically overcomes Between Life and Death"
  },
  11: {
    resting: "2 per minute",
    notResting: "NA",
    reduction: "-50 per day",
    special: "Any amputated limb recovers if placed within 1 week"
  },
  12: {
    resting: "5 per minute",
    notResting: "NA",
    reduction: "-5 per hour",
    special: "As above, but within 3 days"
  },
  13: {
    resting: "10 per minute",
    notResting: "NA",
    reduction: "-10 per hour",
    special: "As above, but within 1 day"
  },
  14: {
    resting: "1 per Turn",
    notResting: "NA",
    reduction: "-15 per hour",
    special: "Any limb recovers within several hours"
  },
  15: {
    resting: "5 per Turn",
    notResting: "NA",
    reduction: "-20 per hour",
    special:
      "Any limb recovers immediately if placed within 1 Turn; all limbs regrow within 1 week (except head)"
  },
  16: {
    resting: "10 per Turn",
    notResting: "NA",
    reduction: "-10 per minute",
    special: "All limbs regrow within 3 days (except head)"
  },
  17: {
    resting: "25 per Turn",
    notResting: "NA",
    reduction: "-10 per Turn",
    special: "All limbs regrow within a few hours (except head)"
  },
  18: {
    resting: "50 per Turn",
    notResting: "NA",
    reduction: "-25 per Turn",
    special: "All limbs regrow within a few Turns (except head)"
  },
  19: {
    resting: "100 per Turn",
    notResting: "NA",
    reduction: "ALL each Turn",
    special: "Limb regrows fully in one Turn"
  },
  20: {
    resting: "250 per Turn",
    notResting: "NA",
    reduction: "ALL each Turn",
    special: "All physical criticals are annulled"
  }
};
//#endregion
