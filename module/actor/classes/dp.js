import { toNum } from "../helpers/lookup.js";

export async function updateDPRecord(actor, { name, type, category, amount, costPer }) {
  const records = foundry.utils.duplicate(actor.system.developmentPoints.spentRecords || []);

  const idx = records.findIndex((r) => r.name === name && r.type === type);

  if (amount === 0) {
    if (idx !== -1) records.splice(idx, 1);
  } else {
    if (idx !== -1) {
      records[idx].amount = amount;
      records[idx].costPer = costPer;
    } else {
      records.push({ name, type, category, amount, costPer });
    }
  }

  await actor.update({
    "system.developmentPoints.spentRecords": records
  });
}

export function calculateMaxDP(system) {
  const lvl = system.level || 0;
  const bonus = toNum(system.developmentPoints.bonus);
  const special = toNum(system.developmentPoints.special);

  const dpTable = [
    400, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000
  ];

  const base = lvl <= 15 ? dpTable[lvl] : dpTable[15] + (lvl - 15) * 100;
  system.developmentPoints.final = base + bonus + special;

  let total = 0;
  for (const rec of system.developmentPoints.spentRecords) {
    total += toNum(rec.amount) * toNum(rec.costPer);
  }

  system.developmentPoints.spent = total;
  system.developmentPoints.remaining = system.developmentPoints.final - total;
}

export function calculateCategoryTotals(system) {
  const primaries = system.abilities.Primaries;
  const limits = primaries.abilityLimits;

  const totals = {
    Combat: 0,
    Psychic: 0,
    Supernatural: 0
  };

  for (const rec of system.developmentPoints.spentRecords) {
    if (rec.type !== "Primary") continue;
    if (!rec.category) continue;

    const dp = toNum(rec.amount) * toNum(rec.costPer);
    totals[rec.category] += dp;
  }

  limits.Combat.current = totals.Combat;
  limits.Psychic.current = totals.Psychic;
  limits.Supernatural.current = totals.Supernatural;
}

export function validateDP(actor, { name, type, amount, costPer }) {
  const newSpent = toNum(amount) * toNum(costPer);
  const maxDP = actor.system.developmentPoints.final;

  const records = actor.system.developmentPoints.spentRecords;

  const existing = records.find((r) => r.name === name && r.type === type);
  const oldSpent = existing ? toNum(existing.amount) * toNum(existing.costPer) : 0;

  let currentTotal = 0;
  for (const rec of records) {
    currentTotal += toNum(rec.amount) * toNum(rec.costPer);
  }

  const newTotal = currentTotal - oldSpent + newSpent;

  return newTotal <= maxDP;
}

export function validateCategoryLimit(actor, { name, type, category, amount, costPer }) {
  if (type !== "Primary") return true;
  if (!category) return true;

  const limits = actor.system.abilities.Primaries.abilityLimits;
  const limit = toNum(limits[category].final);
  const current = toNum(limits[category].current);

  const records = actor.system.developmentPoints.spentRecords;

  const existing = records.find((r) => r.name === name && r.type === "Primary");
  const oldSpent = existing ? toNum(existing.amount) * toNum(existing.costPer) : 0;

  const newSpent = toNum(amount) * toNum(costPer);
  const newTotal = current - oldSpent + newSpent;

  return newTotal <= limit;
}

export function calculateSecondaryTotalDP(system) {
  let total = 0;

  for (const rec of system.developmentPoints.spentRecords) {
    if (rec.type !== "Secondary") continue;
    total += toNum(rec.amount) * toNum(rec.costPer);
  }

  system.abilities.Secondaries.totalDPSpent = total;
}

export function calculatePrimaryTotalDP(system) {
  let total = 0;

  for (const rec of system.developmentPoints.spentRecords) {
    if (rec.type !== "Primary") continue;
    total += toNum(rec.amount) * toNum(rec.costPer);
  }

  system.abilities.Primaries.totalDPSpent = total;
}
