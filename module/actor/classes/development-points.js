import { toNum } from "../lookup.js";

export function calculateMaxDP(system) {
  const lvl = system.level || 0;
  const bonus = toNum(system.destinyPoints.bonus);
  const special = toNum(system.destinyPoints.special);

  const dpTable = [
    400, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,
    1800, 1900, 2000,
  ];

  // Base DP
  let base = lvl <= 15 ? dpTable[lvl] : dpTable[15] + (lvl - 15) * 100;

  system.destinyPoints.final = base + bonus + special;

  let total = 0;
  for (const item of system.developmentPointsSpent) {
    total += toNum(item.amount) * toNum(item.costPer);
  }

  // Derived only
  system.destinyPoints.remaining = system.destinyPoints.final - total;
}

export async function updateDP(actor, { name, amount, costPer }) {
  // Clone the array safely
  let spent = foundry.utils.duplicate(actor.system.developmentPointsSpent || []);

  // Find existing record
  const idx = spent.findIndex(r => r.name === name && r.type === "Ability");

  // 1. Apply the change to the local copy FIRST
  if (amount === 0) {
    if (idx !== -1) spent.splice(idx, 1);
  } else {
    if (idx !== -1) {
      spent[idx].amount = amount;
      spent[idx].costPer = costPer;
    } else {
      spent.push({ name, type: "Ability", amount, costPer });
    }
  }

  // 2. Now recompute totalSpent using the UPDATED spent array
  let totalSpent = 0;
  for (const item of spent) {
    totalSpent += toNum(item.amount) * toNum(item.costPer);
  }


  // 4. Persist
  await actor.update({
    "system.developmentPointsSpent": spent,
    "system.destinyPoints.spent": totalSpent
  });
}
