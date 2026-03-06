import { BaseRule } from "../base-rule.js";
import { toNum } from "../../../utils/numbers.js";

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
      if (name !== "Illusion") {
        if (mysticPath.paths[name].opposedPath === undefined)
          mysticPath.paths[name].opposedPath = OPPOSED_PATHS[name];
      }
    }

    //Free Access Spell Slots
    for (const [name, path] of Object.entries(mysticPath.freeAccessSpellSlots)) {
      if (mysticPath.freeAccessSpellSlots[name].max === undefined)
        mysticPath.freeAccessSpellSlots[name].max = 0;
    }

    // Imbalnce
    if (mysticPath.imbalance.offensive === undefined) mysticPath.imbalance.offensive = 0;
    if (mysticPath.imbalance.defensive === undefined) mysticPath.imbalance.defensive = 0;
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

    // Reset all freeAccessSpellSlots max values
    for (const level of Object.keys(mysticPath.freeAccessSpellSlots)) {
      mysticPath.freeAccessSpellSlots[level].max = 0;
    }

    //Path
    // First pass: base cost = level, effectiveCost = level
    for (const [name, path] of Object.entries(mysticPath.paths)) {
      const level = toNum(path.level);
      path.cost = level;
      path.effectiveCost = level;

      // Spell Slots
      path.spellsLearned = Math.floor(level / 2);

      // Free Access Spells
      const slots = FREE_ACCESS_SLOT_TABLE[name];
      for (const slot of slots) {
        if (level >= slot.requiredLevel) {
          mysticPath.freeAccessSpellSlots[slot.maxLevel].max += 1;
        }
      }
    }

    // Second pass: adjust opposed pairs
    const processed = new Set();

    for (const [name, path] of Object.entries(mysticPath.paths)) {
      if (processed.has(name) || name === "Illusion") continue;

      const opposedName = mysticPath.paths[name].opposedPath;
      if (!opposedName) continue;

      const opposedPath = mysticPath.paths[opposedName];
      if (!opposedPath) continue;

      const levelA = toNum(path.level);
      const levelB = toNum(opposedPath.level);

      // If either has no levels, no special cost
      if (levelA === 0 || levelB === 0) {
        processed.add(name);
        processed.add(opposedName);
        continue;
      }

      // Decide which is "second" (cheaper) and double that one
      if (levelA <= levelB) {
        // A is cheaper → A is opposed (double)
        path.effectiveCost = levelA * 2;
        opposedPath.effectiveCost = levelB;
      } else {
        // B is cheaper → B is opposed (double)
        path.effectiveCost = levelA;
        opposedPath.effectiveCost = levelB * 2;
      }

      processed.add(name);
      processed.add(opposedName);
    }

    // Magic Levels used
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

    // Imbalance
    const imbalance = toNum(mysticPath.imbalance.value);

    // Clamp just in case
    mysticPath.imbalance.value = Math.clamp(imbalance, -30, 30);

    // Derived values
    mysticPath.imbalance.offensive = -imbalance;
    mysticPath.imbalance.defensive = imbalance;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    const zeonPathOld = oldSystem.abilities.primary.Supernatural.Zeon;
    const mysticPathOld = oldSystem.mystic;
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

    for (const [name, path] of Object.entries(mysticPathOld.paths)) {
      const lvlPath = `system.mystic.paths.${name}.level`;
      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== path.level) changed.push("path");
    }

    // Imbalance
    const imbPath = `system.mystic.imbalance.value`;
    const newimbValue = foundry.utils.getProperty(updateData, imbPath);

    if (newimbValue !== undefined && newimbValue !== mysticPathOld.imbalance.value)
      changed.push("imbalance");

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

    // Reset all freeAccessSpellSlots max values
    for (const level of Object.keys(system.mystic.freeAccessSpellSlots)) {
      system.mystic.freeAccessSpellSlots[level].max = 0;
    }

    //Path
    // First pass: base cost = level, effectiveCost = level
    for (const [name, path] of Object.entries(mysticPath.paths)) {
      const level = toNum(path.level);
      path.cost = level;
      path.effectiveCost = level;

      // Spell Slots
      path.spellsLearned = Math.floor(level / 2);

      // Free Access Spells
      const slots = FREE_ACCESS_SLOT_TABLE[name];
      for (const slot of slots) {
        if (level >= slot.requiredLevel) {
          mysticPath.freeAccessSpellSlots[slot.maxLevel].max += 1;
        }
      }
    }

    // Second pass: adjust opposed pairs
    const processed = new Set();

    for (const [name, path] of Object.entries(mysticPath.paths)) {
      if (processed.has(name) || name === "Illusion") continue;

      const opposedName = mysticPath.paths[name].opposedPath;
      if (!opposedName) continue;

      const opposedPath = mysticPath.paths[opposedName];
      if (!opposedPath) continue;

      const levelA = toNum(path.level);
      const levelB = toNum(opposedPath.level);

      // If either has no levels, no special cost
      if (levelA === 0 || levelB === 0) {
        processed.add(name);
        processed.add(opposedName);
        continue;
      }

      // Decide which is "second" (cheaper) and double that one
      if (levelA <= levelB) {
        // A is cheaper → A is opposed (double)
        path.effectiveCost = levelA * 2;
        opposedPath.effectiveCost = levelB;
      } else {
        // B is cheaper → B is opposed (double)
        path.effectiveCost = levelA;
        opposedPath.effectiveCost = levelB * 2;
      }

      processed.add(name);
      processed.add(opposedName);
    }

    // Magic Levels used
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

    // Imbalance
    const imbalance = toNum(mysticPath.imbalance.value);

    // Clamp just in case
    mysticPath.imbalance.value = Math.clamp(imbalance, -30, 30);

    // Derived values
    mysticPath.imbalance.offensive = -imbalance;
    mysticPath.imbalance.defensive = imbalance;
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

const FREE_ACCESS_SLOT_TABLE = {
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
