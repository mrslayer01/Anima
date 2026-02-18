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

export const ARMOR_SECTIONS = ["breastplate", "shirt", "complete", "helm"];
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
  "shield"
];

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
  if (result >= 0) return 0; // attacker wins or ties → no counterattack

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
