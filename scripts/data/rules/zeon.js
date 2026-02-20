import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class ZeonRule extends BaseRule {
  Initialize(system) {
    const zeonPath = system.abilities.primary.Supernatural.Zeon;
    const maPath = system.abilities.primary.Supernatural.MagicAccumulation;
    const maMultiplesPath = system.abilities.primary.Supernatural.MAMultiples;

    if (zeonPath.purchased === undefined) zeonPath.purchased = 0;
    if (zeonPath.cost === undefined) zeonPath.cost = 0;
    if (zeonPath.class === undefined) zeonPath.class = 0;
    if (zeonPath.special === undefined) zeonPath.special = 0;
    if (zeonPath.final === undefined) zeonPath.final = 0;

    if (maPath.final === undefined) maPath.final = 0;
    if (maMultiplesPath.final === undefined) maMultiplesPath.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const zeonPath = system.abilities.primary.Supernatural.Zeon;
    const maPath = system.abilities.primary.Supernatural.MagicAccumulation;
    const maMultiplesPath = system.abilities.primary.Supernatural.MAMultiples;

    //Zeon
    const basePow = toNum(system.characteristics.Power.base);
    const totalPow = basePow * 10;
    const totalPowModifier = toNum(system.characteristics.Power.final);
    const purchasedZeon = toNum(zeonPath.base) * 5;
    const baseZeon = 20 + totalPow + totalPowModifier + purchasedZeon;
    const classZeon = toNum(zeonPath.class);
    const specialZeon = toNum(zeonPath.special);
    zeonPath.final = classZeon + specialZeon + baseZeon;

    //MA
    maPath.final = lookupBaseMA(basePow) * toNum(maMultiplesPath.base);
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    const zeonPathOld = oldSystem.abilities.primary.Supernatural.Zeon;
    const newChar = foundry.utils.getProperty(updateData, "system.characteristics.Power.final");

    if (newChar !== undefined && newChar !== oldSystem.characteristics.Power.final) {
      changed.push("Power");
    }
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
    const maPath = system.abilities.primary.Supernatural.MagicAccumulation;
    const maMultiplesPath = system.abilities.primary.Supernatural.MAMultiples;

    //Zeon
    const basePow = toNum(system.characteristics.Power.base);
    const totalPow = basePow * 10;
    const totalPowModifier = toNum(system.characteristics.Power.final);
    const purchasedZeon = toNum(zeonPath.base) * 5;
    const baseZeon = 20 + totalPow + totalPowModifier + purchasedZeon;
    const classZeon = toNum(zeonPath.class);
    const specialZeon = toNum(zeonPath.special);
    zeonPath.final = classZeon + specialZeon + baseZeon;

    //MA
    maPath.final = lookupBaseMA(basePow) * toNum(maMultiplesPath.base);
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function lookupBaseMA(power) {
  const p = toNum(power) || 0;

  const row = BASE_MA_TABLE.find((r) => p >= r.min && p <= r.max);
  return row ? row.ma : 0;
}

const BASE_MA_TABLE = [
  { min: 1, max: 4, ma: 0 },
  { min: 5, max: 7, ma: 5 },
  { min: 8, max: 11, ma: 10 },
  { min: 12, max: 14, ma: 15 },
  { min: 15, max: 15, ma: 20 },
  { min: 16, max: 17, ma: 25 },
  { min: 18, max: 19, ma: 30 },
  { min: 20, max: 20, ma: 35 }
];
