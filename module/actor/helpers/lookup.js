//General lookup tables for various calculations.

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

export const toNum = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

export const TABLE_ITEM_TYPES = {
  commonGoods: ["commonGood"],
  weapons: ["weapon"],
  armor: ["armor", "helm"],
  consumables: ["potion", "scroll"]
};
