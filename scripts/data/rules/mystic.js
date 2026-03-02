import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class MysticRule extends BaseRule {
  Initialize(system) {
    const zeonPath = system.abilities.primary.Supernatural.Zeon;
    const maPath = system.abilities.primary.Supernatural.MagicAccumulation;
    const maMultiplesPath = system.abilities.primary.Supernatural.MAMultiples;
    const mysticPath = system.mystic;

    if (zeonPath.purchased === undefined) zeonPath.purchased = 0;
    if (zeonPath.cost === undefined) zeonPath.cost = 0;
    if (zeonPath.class === undefined) zeonPath.class = 0;
    if (zeonPath.special === undefined) zeonPath.special = 0;
    if (zeonPath.final === undefined) zeonPath.final = 0;

    if (maPath.final === undefined) maPath.final = 0;
    if (maMultiplesPath.final === undefined) maMultiplesPath.final = 0;

    // Magic Levels
    if (mysticPath.magicLevels.max === undefined) mysticPath.magicLevels.max = 0;
    if (mysticPath.magicLevels.used === undefined) mysticPath.magicLevels.used = 0; // Magic levels are used to gain levels in a path, or purchase spells directly.
    if (mysticPath.magicLevels.final === undefined) mysticPath.magicLevels.final = 0;

    // Path
    for (const [name, path] of Object.entries(mysticPath.paths)) {
      if (mysticPath.paths[name].cost === undefined) mysticPath.paths[name].cost = 0;
      if (mysticPath.paths[name].effectiveCost === undefined)
        mysticPath.paths[name].effectiveCost = 0;
      if (mysticPath.paths[name].spellsLearned === undefined)
        mysticPath.paths[name].spellsLearned = 0; // Learns 1 spell per every 2 path base levels.
    }
  }

  Derived(system) {
    this.Initialize(system);
    const zeonPath = system.abilities.primary.Supernatural.Zeon;
    const maPath = system.abilities.primary.Supernatural.MagicAccumulation;
    const maMultiplesPath = system.abilities.primary.Supernatural.MAMultiples;
    const mysticPath = system.mystic;

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

    //Path
    for (const [name, path] of Object.entries(mysticPath.paths)) {
      const level = toNum(path.level);

      // Base cost
      path.cost = level;

      // Opposed
      let hasLevelsInOpposedPath = false;
      if (name !== "Illusion") {
        const opposedPath = OPPOSED_PATHS[name];
        const opposedLevel = mysticPath.paths[name].level ?? 0;
        hasLevelsInOpposedPath = opposedLevel > 0;
      }

      // Effective Cost
      path.effectiveCost = hasLevelsInOpposedPath ? level * 2 : level;

      // Spell Slots
      path.spellsLearned = Math.floor(level / 2);
    }

    mysticPath.magicLevels.used = Object.values(mysticPath.paths).reduce(
      (sum, p) => sum + toNum(p.effectiveCost),
      0
    );

    // Magic Levels
    const baseInt = toNum(system.characteristics.Intelligence.base);
    const baseML = toNum(mysticPath.magicLevels.base);
    const usedML = toNum(mysticPath.magicLevels.used);
    mysticPath.magicLevels.max = getMaxMagicLevel(baseInt);
    mysticPath.magicLevels.final = baseML - usedML;
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
    const mysticPath = system.mystic;

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
    //Path
    for (const [name, path] of Object.entries(mysticPath.paths)) {
      const level = toNum(path.level);

      // Base cost
      path.cost = level;

      // Opposed
      let hasLevelsInOpposedPath = false;
      if (name !== "Illusion") {
        const opposedPath = OPPOSED_PATHS[name];
        const opposedLevel = mysticPath.paths[opposedPath].level ?? 0;
        hasLevelsInOpposedPath = opposedLevel > 0;
      }

      // Effective Cost
      path.effectiveCost = hasLevelsInOpposedPath ? level * 2 : level;

      // Spell Slots
      path.spellsLearned = Math.floor(level / 2);
    }

    mysticPath.magicLevels.used = Object.values(mysticPath.paths).reduce(
      (sum, p) => sum + toNum(p.effectiveCost),
      0
    );

    // Magic Levels
    const baseInt = toNum(system.characteristics.Intelligence.base);
    const baseML = toNum(mysticPath.magicLevels.base);
    const usedML = toNum(mysticPath.magicLevels.used);
    mysticPath.magicLevels.max = getMaxMagicLevel(baseInt);
    mysticPath.magicLevels.final = baseML - usedML;
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

function getMaxMagicLevel(int) {
  if (int <= 5) return 0;
  if (int === 6) return 10;
  if (int === 7) return 20;
  if (int === 8) return 30;
  if (int === 9) return 40;
  if (int === 10) return 50;
  if (int === 11) return 75;
  if (int === 12) return 100;
  if (int === 13) return 150;
  if (int === 14) return 200;
  if (int === 15) return 300;
  if (int === 16) return 400;
  if (int === 17) return 500;
  if (int === 18) return 600;
  if (int === 19) return 700;
  return 800; // INT 20+
}

const OPPOSED_PATHS = {
  Light: "Darkness",
  Darkness: "Light",
  Creation: "Destruction",
  Destruction: "Creation",
  Fire: "Water",
  Water: "Fire",
  Earth: "Air",
  Air: "Earth",
  Essence: "Necromancy",
  Necromancy: "Essence",
  Illusion: ""
};

const PATH_SPELL_LISTS = {
  Light: LIGHT_FREE_ACCESS_SLOTS,
  Essence: ESSENCE_FREE_ACCESS_SLOTS,
  Darkness: STANDARD_FREE_ACCESS_SLOTS,
  Creation: STANDARD_FREE_ACCESS_SLOTS,
  Destruction: STANDARD_FREE_ACCESS_SLOTS,
  Earth: STANDARD_FREE_ACCESS_SLOTS,
  Fire: STANDARD_FREE_ACCESS_SLOTS,
  Water: STANDARD_FREE_ACCESS_SLOTS,
  Air: STANDARD_FREE_ACCESS_SLOTS,
  Illusion: STANDARD_FREE_ACCESS_SLOTS,
  Necromancy: STANDARD_FREE_ACCESS_SLOTS
};

// Shared by 9 Paths
const STANDARD_FREE_ACCESS_SLOTS = [
  { requiredLevel: 4, maxLevel: 10 },
  { requiredLevel: 12, maxLevel: 20 },
  { requiredLevel: 22, maxLevel: 30 },
  { requiredLevel: 32, maxLevel: 40 },
  { requiredLevel: 42, maxLevel: 50 },
  { requiredLevel: 52, maxLevel: 60 },
  { requiredLevel: 62, maxLevel: 70 },
  { requiredLevel: 72, maxLevel: 80 },
  { requiredLevel: 82, maxLevel: 90 },
  { requiredLevel: 92, maxLevel: 100 }
];

// Unique
const LIGHT_FREE_ACCESS_SLOTS = [
  { requiredLevel: 4, maxLevel: 10 },
  { requiredLevel: 14, maxLevel: 20 },
  { requiredLevel: 24, maxLevel: 30 },
  { requiredLevel: 34, maxLevel: 40 },
  { requiredLevel: 50, maxLevel: 50 },
  { requiredLevel: 60, maxLevel: 60 },
  { requiredLevel: 70, maxLevel: 70 },
  { requiredLevel: 80, maxLevel: 80 },
  { requiredLevel: 90, maxLevel: 90 },
  { requiredLevel: 100, maxLevel: 100 }
];

// Unique
const ESSENCE_FREE_ACCESS_SLOTS = [
  { requiredLevel: 4, maxLevel: 10 },
  { requiredLevel: 12, maxLevel: 20 },
  { requiredLevel: 22, maxLevel: 30 },
  { requiredLevel: 32, maxLevel: 40 },
  { requiredLevel: 40, maxLevel: 50 },
  { requiredLevel: 60, maxLevel: 70 },
  { requiredLevel: 72, maxLevel: 80 },
  { requiredLevel: 82, maxLevel: 90 },
  { requiredLevel: 92, maxLevel: 100 }
];
