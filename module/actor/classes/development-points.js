import { toNum } from "../helpers/lookup.js";

export function calculateMaxDP(system) {
  const lvl = system.level || 0;
  const bonus = toNum(system.destinyPoints.bonus);
  const special = toNum(system.destinyPoints.special);

  const dpTable = [
    400, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000
  ];

  const base = lvl <= 15 ? dpTable[lvl] : dpTable[15] + (lvl - 15) * 100;
  system.destinyPoints.final = base + bonus + special;

  // NEW: compute total spent live
  let total = 0;

  for (const item of system.abilities.Primaries.developmentPointsSpent) {
    total += toNum(item.amount) * toNum(item.costPer);
  }

  for (const item of system.abilities.Secondaries.developmentPointsSpent) {
    total += toNum(item.amount) * toNum(item.costPer);
  }

  system.destinyPoints.spent = total;
  system.destinyPoints.remaining = system.destinyPoints.final - total;
}

export async function secondariesTotalDPSpent(actor, { name, amount, costPer }) {
  // Clone the array safely
  let spent = foundry.utils.duplicate(
    actor.system.abilities.Secondaries.developmentPointsSpent || []
  );

  // Find existing record
  const idx = spent.findIndex((r) => r.name === name && r.type === "Ability");
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
    "system.abilities.Secondaries.developmentPointsSpent": spent,
    "system.abilities.Secondaries.totalDevelopmentPointsSpent": totalSpent
  });
}

export async function primariesTotalDPSpent(actor, { name, amount, costPer }) {
  let spent = foundry.utils.duplicate(
    actor.system.abilities.Primaries.developmentPointsSpent || []
  );

  const idx = spent.findIndex((r) => r.name === name && r.type === "Ability");

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

  let totalDPSpentAcrossAllPrimaries = 0;
  for (const item of spent) {
    totalDPSpentAcrossAllPrimaries += toNum(item.amount) * toNum(item.costPer);
  }

  // --- NEW: recompute category.current ---
  const categories = {
    Combat: actor.system.abilities.Primaries.Combat,
    Psychic: actor.system.abilities.Primaries.Psychic,
    Supernatural: actor.system.abilities.Primaries.Supernatural
  };

  const categoryTotals = {
    Combat: 0,
    Psychic: 0,
    Supernatural: 0
  };

  for (const item of spent) {
    const { name, amount, costPer } = item;
    const dp = toNum(amount) * toNum(costPer);

    if (name in categories.Combat) categoryTotals.Combat += dp;
    else if (name in categories.Psychic) categoryTotals.Psychic += dp;
    else if (name in categories.Supernatural) categoryTotals.Supernatural += dp;
  }

  await actor.update({
    "system.abilities.Primaries.developmentPointsSpent": spent,
    "system.abilities.Primaries.totalDevelopmentPointsSpent": totalDPSpentAcrossAllPrimaries,
    "system.abilities.Primaries.abilityLimits.Combat.current": categoryTotals.Combat,
    "system.abilities.Primaries.abilityLimits.Psychic.current": categoryTotals.Psychic,
    "system.abilities.Primaries.abilityLimits.Supernatural.current": categoryTotals.Supernatural
  });
}

export async function validateDP(actor, { name, amount, costPer }) {
  const newSpent = toNum(amount) * toNum(costPer);
  const maxDP = actor.system.destinyPoints.final;

  // Collect all DP spent across both groups
  const primaries = actor.system.abilities.Primaries.developmentPointsSpent;
  const secondaries = actor.system.abilities.Secondaries.developmentPointsSpent;

  // Find old DP for this ability (if any)
  const existing =
    primaries.find((e) => e.name === name && e.type === "Ability") ||
    secondaries.find((e) => e.name === name && e.type === "Ability");

  const oldSpent = existing ? toNum(existing.amount) * toNum(existing.costPer) : 0;

  // Compute current total spent
  let currentTotal = 0;

  for (const item of primaries) {
    currentTotal += toNum(item.amount) * toNum(item.costPer);
  }
  for (const item of secondaries) {
    currentTotal += toNum(item.amount) * toNum(item.costPer);
  }

  // Compute new total after applying the change
  const newTotal = currentTotal - oldSpent + newSpent;

  return newTotal <= maxDP;
}

export async function validateDPLimit(actor, { name, amount, costPer }) {
  const totalSpent = toNum(amount) * toNum(costPer);

  const primaries = actor.system.abilities.Primaries;

  const categories = {
    Combat: primaries.Combat,
    Psychic: primaries.Psychic,
    Supernatural: primaries.Supernatural
  };

  let category = null;

  if (name in categories.Combat) category = "Combat";
  else if (name in categories.Psychic) category = "Psychic";
  else if (name in categories.Supernatural) category = "Supernatural";

  if (!category) return true;

  const limit = toNum(primaries.abilityLimits[category].final);
  const current = toNum(primaries.abilityLimits[category].current);

  // Find old DP for this ability (if any)
  const existing = primaries.developmentPointsSpent.find(
    (e) => e.name === name && e.type === "Ability"
  );

  const oldSpent = existing ? toNum(existing.amount) * toNum(existing.costPer) : 0;

  // Compute new category total
  const newTotal = current - oldSpent + totalSpent;

  return newTotal <= limit;
}

function calculateTotalDPSpent(system) {
  let totalSpent = 0;

  //Define total spent values
  const primariesTotalDP = toNum(system.abilities.Primaries.totalDevelopmentPointsSpent);
  const secondariesTotalDP = toNum(system.abilities.Secondaries.totalDevelopmentPointsSpent);

  totalSpent = primariesTotalDP + secondariesTotalDP;

  return totalSpent;
}
