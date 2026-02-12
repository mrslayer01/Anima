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
  none: 0,
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

export const ARMOR_SECTIONS = ["breastplate", "shirt", "complete", "head", "special"];
export const DAMAGE_TYPES = ["cut", "imp", "thr", "hea", "ele", "col", "ene"];
