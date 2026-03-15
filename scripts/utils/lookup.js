// Holds all lookup tables

export function lookupCharacteristicMod(base) {
  if (base < 1) return -30;
  if (base < 2) return -30;
  if (base < 3) return -20;
  if (base < 4) return -10;
  if (base < 5) return -5;
  if (base < 6) return 0;
  if (base < 8) return 5;
  if (base < 10) return 10;
  if (base < 11) return 15;
  if (base < 13) return 20;
  if (base < 15) return 25;
  if (base < 16) return 30;
  if (base < 18) return 35;
  if (base < 20) return 40;
  return 45;
}

export const difficultyMap = {
  0: "None",
  20: "Routine",
  40: "Easy",
  80: "Moderate",
  120: "Difficult",
  140: "Very Difficult",
  180: "Absurd",
  240: "Almost Impossible",
  280: "Impossible",
  320: "Inhuman",
  440: "Zen"
};

export const PRICE_MODIFIERS = {
  mediocre: 0.5,
  decent: 1,
  good: 10,
  luxury: 100
};

export const CURRENCY_TYPES = {
  copper: "Copper",
  silver: "Silver",
  gold: "Gold"
};

export const WEAPON_SIMILARITY_MODIFIERS = {
  known: 0,
  similar: -20,
  mixed: -40,
  unarmed: -60
};

export const TABLE_ITEM_TYPES = {
  commonGoods: ["commonGood"],
  weapons: ["weapon"],
  armor: ["armor"],
  consumables: ["potion", "scroll"]
};

const ACTIONS_BY_DEX_AGI = [
  { min: 1, max: 10, actions: 1 },
  { min: 11, max: 14, actions: 2 },
  { min: 15, max: 19, actions: 3 },
  { min: 20, max: 22, actions: 4 },
  { min: 23, max: 25, actions: 5 },
  { min: 26, max: 28, actions: 6 },
  { min: 29, max: 31, actions: 8 },
  { min: 32, max: Infinity, actions: 10 }
];

const BREAKAGE_BY_STRENGTH = [
  { min: 8, max: 9, bonus: 1 },
  { min: 10, max: 10, bonus: 2 },
  { min: 11, max: 12, bonus: 4 },
  { min: 13, max: 14, bonus: 6 },
  { min: 15, max: Infinity, bonus: 8 }
];

//export const ARMOR_SECTIONS = ["body", "helm", "natural"];
export const ARMOR_SECTIONS = ["breastplate", "shirt", "complete", "helm", "natural"];
export const DAMAGE_TYPES = ["cut", "imp", "thr", "hea", "ele", "col", "ene"];
export const SECONDARY_DAMAGE_TYPES = ["none", "cut", "imp", "thr", "hea", "ele", "col", "ene"];
export const WEAPON_TYPES = [
  "shortArm",
  "axe",
  "mace",
  "sword",
  "twoHanded",
  "pole",
  "cord",
  "projectile",
  "throwing",
  "shield"
];

export const SECONDARY_WEAPON_TYPES = [
  "none",
  "shortArm",
  "axe",
  "mace",
  "sword",
  "twoHanded",
  "pole",
  "cord",
  "throwing",
  "shield"
];

export function getMaxActions(dex, agi) {
  const total = dex + agi;

  for (const row of ACTIONS_BY_DEX_AGI) {
    if (total >= row.min && total <= row.max) {
      return row.actions;
    }
  }

  return 1; // fallback, though the table covers all valid values
}

export function getBreakageBonus(str) {
  for (const row of BREAKAGE_BY_STRENGTH) {
    if (str >= row.min && str <= row.max) {
      return row.bonus;
    }
  }
  return 0; // fallback if Strength < 8
}

export function computeDamagePercent(result, at = 0) {
  // Check counterattack first
  const counter = computeCounterattack(result);
  if (counter > 0) {
    return { pct: 0, counter };
  }

  // Apply AT reduction for normal damage
  const effective = result - at * 10;

  if (effective < 10) {
    return { pct: 0, counter: 0 };
  }

  const table = [
    { min: 10, max: 19, pct: 10 },
    { min: 20, max: 29, pct: 20 },
    { min: 30, max: 39, pct: 30 },
    { min: 40, max: 49, pct: 40 },
    { min: 50, max: 59, pct: 50 },
    { min: 60, max: 69, pct: 60 },
    { min: 70, max: 79, pct: 70 },
    { min: 80, max: 89, pct: 80 },
    { min: 90, max: 99, pct: 90 },
    { min: 100, max: 109, pct: 100 },
    { min: 110, max: 119, pct: 110 },
    { min: 120, max: 129, pct: 120 },
    { min: 130, max: 139, pct: 130 },
    { min: 140, max: 149, pct: 140 },
    { min: 150, max: 159, pct: 150 },
    { min: 160, max: 169, pct: 160 },
    { min: 170, max: 179, pct: 170 },
    { min: 180, max: 189, pct: 180 },
    { min: 190, max: 199, pct: 190 },
    { min: 200, max: 209, pct: 200 },
    { min: 210, max: 219, pct: 210 },
    { min: 220, max: 229, pct: 220 },
    { min: 230, max: 239, pct: 230 },
    { min: 240, max: 249, pct: 240 },
    { min: 250, max: 259, pct: 250 },
    { min: 260, max: 269, pct: 260 },
    { min: 270, max: 279, pct: 270 },
    { min: 280, max: 289, pct: 280 },
    { min: 290, max: 299, pct: 290 },
    { min: 300, max: 309, pct: 300 },
    { min: 310, max: 319, pct: 310 },
    { min: 320, max: 329, pct: 320 },
    { min: 330, max: 339, pct: 330 },
    { min: 340, max: 349, pct: 340 },
    { min: 350, max: 359, pct: 350 },
    { min: 360, max: 369, pct: 360 },
    { min: 370, max: 379, pct: 370 },
    { min: 380, max: 389, pct: 380 },
    { min: 390, max: 399, pct: 390 },
    { min: 400, max: 9999, pct: 400 }
  ];

  const pct = table.find((r) => effective >= r.min && effective <= r.max)?.pct ?? 0;

  return { pct, counter: 0 };
}

export function computeCounterattack(result) {
  if (result >= 0) return 0; // attacker wins or ties = no counterattack

  const abs = Math.abs(result);

  if (abs <= 10) return 0;
  if (abs <= 20) return 5;
  if (abs <= 30) return 10;
  if (abs <= 40) return 15;
  if (abs <= 50) return 20;
  if (abs <= 60) return 25;
  if (abs <= 70) return 30;
  if (abs <= 80) return 35;
  if (abs <= 90) return 40;
  if (abs <= 100) return 45;
  if (abs <= 110) return 50;
  if (abs <= 120) return 55;
  if (abs <= 130) return 60;
  if (abs <= 140) return 65;
  if (abs <= 150) return 70;
  if (abs <= 160) return 75;
  if (abs <= 170) return 80;
  if (abs <= 180) return 85;
  if (abs <= 190) return 90;
  if (abs <= 200) return 95;
  if (abs <= 210) return 100;
  if (abs <= 220) return 105;
  if (abs <= 230) return 110;
  if (abs <= 240) return 115;
  if (abs <= 250) return 120;
  if (abs <= 260) return 125;
  if (abs <= 270) return 130;
  if (abs <= 280) return 135;
  if (abs <= 290) return 140;
  if (abs <= 300) return 145;

  return 150; // -301 or lower
}

export const DIRECTED_ATTACK_TABLE = {
  None: 0,
  Eye: -100,
  Neck: -80,
  Head: -60,
  Elbow: -60,
  Heart: -60,
  Groin: -60,
  Foot: -50,
  Hand: -40,
  Wrist: -40,
  Knee: -40,
  Shoulder: -30,
  Abdomen: -20,
  Arm: -20,
  Thigh: -20,
  Torso: -10,
  Calf: -10
};

export const ARMOR_COVERAGE = {
  breastplate: ["Torso"],
  shirt: ["Torso", "Arms"],
  complete: ["Torso", "Arms", "Legs"],
  helmet: ["Head"]
};

export const SUMMONING_DIFFICULTY_TABLE = {
  0: {
    summon: 140,
    summonZeon: 10,
    control: 180,
    controlZeon: 20,
    bind: 160,
    bindZeon: 5,
    banish: 100,
    banishZeon: 5
  },
  1: {
    summon: 160,
    summonZeon: 20,
    control: 200,
    controlZeon: 40,
    bind: 180,
    bindZeon: 10,
    banish: 120,
    banishZeon: 5
  },
  2: {
    summon: 180,
    summonZeon: 40,
    control: 220,
    controlZeon: 80,
    bind: 200,
    bindZeon: 20,
    banish: 140,
    banishZeon: 10
  },
  3: {
    summon: 200,
    summonZeon: 60,
    control: 240,
    controlZeon: 120,
    bind: 220,
    bindZeon: 30,
    banish: 160,
    banishZeon: 15
  },
  4: {
    summon: 220,
    summonZeon: 80,
    control: 260,
    controlZeon: 160,
    bind: 240,
    bindZeon: 40,
    banish: 180,
    banishZeon: 20
  },
  5: {
    summon: 240,
    summonZeon: 100,
    control: 280,
    controlZeon: 200,
    bind: 260,
    bindZeon: 50,
    banish: 200,
    banishZeon: 25
  },
  6: {
    summon: 260,
    summonZeon: 120,
    control: 300,
    controlZeon: 240,
    bind: 280,
    bindZeon: 60,
    banish: 220,
    banishZeon: 30
  },
  7: {
    summon: 280,
    summonZeon: 140,
    control: 320,
    controlZeon: 280,
    bind: 300,
    bindZeon: 70,
    banish: 240,
    banishZeon: 40
  },
  8: {
    summon: 300,
    summonZeon: 160,
    control: 340,
    controlZeon: 320,
    bind: 320,
    bindZeon: 80,
    banish: 260,
    banishZeon: 50
  },
  9: {
    summon: 320,
    summonZeon: 180,
    control: 360,
    controlZeon: 360,
    bind: 340,
    bindZeon: 90,
    banish: 280,
    banishZeon: 60
  },
  10: {
    summon: 340,
    summonZeon: 200,
    control: 380,
    controlZeon: 400,
    bind: 360,
    bindZeon: 100,
    banish: 300,
    banishZeon: 80
  },
  11: {
    summon: 360,
    summonZeon: 220,
    control: 400,
    controlZeon: 440,
    bind: 380,
    bindZeon: 120,
    banish: 320,
    banishZeon: 100
  },
  12: {
    summon: 380,
    summonZeon: 240,
    control: 420,
    controlZeon: 480,
    bind: 400,
    bindZeon: 140,
    banish: 340,
    banishZeon: 120
  },
  13: {
    summon: 400,
    summonZeon: 260,
    control: 440,
    controlZeon: 520,
    bind: 420,
    bindZeon: 160,
    banish: 360,
    banishZeon: 140
  },
  14: {
    summon: 420,
    summonZeon: 280,
    control: 460,
    controlZeon: 560,
    bind: 440,
    bindZeon: 180,
    banish: 380,
    banishZeon: 160
  },
  15: {
    summon: 440,
    summonZeon: 300,
    control: 480,
    controlZeon: 600,
    bind: 460,
    bindZeon: 200,
    banish: 400,
    banishZeon: 180
  }
};
