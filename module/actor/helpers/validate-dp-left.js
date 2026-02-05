import { toNum } from "../lookup.js";

export async function validateDP(actor, { name, amount, costPer }) {
  const spent = foundry.utils.duplicate(actor.system.developmentPointsSpent || []);

  const idx = spent.findIndex(r => r.name === name && r.type === "Ability");

  // Apply the change locally
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

  // Compute total spent
  let totalSpent = 0;
  for (const item of spent) {
    totalSpent += toNum(item.amount) * toNum(item.costPer);
  }

  const maxDP = actor.system.destinyPoints.final;
  const remaining = maxDP - totalSpent;

  return remaining >= 0;
}