export const toNum = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
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
