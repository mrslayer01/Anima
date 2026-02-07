//General lookup tables for various calculations.

export const toNum = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

export const PRICE_MODIFIERS = {
  mediocre: 0.5,
  decent: 1,
  good: 10,
  luxury: 100
};

export function costToCopper(cost) {
  return cost.gold * 1000 + cost.silver * 10 + cost.copper;
}

export function copperToCost(totalCopper) {
  const gold = Math.floor(totalCopper / 1000);
  totalCopper %= 1000;

  const silver = Math.floor(totalCopper / 10);
  const copper = totalCopper % 10;

  return { gold, silver, copper };
}

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
