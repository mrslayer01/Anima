import { toNum } from "../lookup.js";

export async function updateDP(actor, { name, amount, costPer }) {
  // Clone the array safely
  let spent = foundry.utils.duplicate(actor.system.developmentPointsSpent || []);

  // Find existing record
  const idx = spent.findIndex(r => r.name === name && r.type === "Ability");

  if (amount === 0) {
    // Remove record if it exists
    if (idx !== -1) spent.splice(idx, 1);
  } else {
    // Update or insert
    if (idx !== -1) {
      spent[idx].amount = amount;
      spent[idx].costPer = costPer;
    } else {
      spent.push({
        name,
        type: "Ability",
        amount,
        costPer
      });
    }
  }

  // Recalculate persistent "spent" DP total
  let totalSpent = 0;
  for (const item of spent) {
    totalSpent += toNum(item.amount) * toNum(item.costPer);
  }

  // Update actor with new persistent values
  await actor.update({
    "system.developmentPointsSpent": [...spent], // force new reference
    "system.destinyPoints.spent": totalSpent
  });
}