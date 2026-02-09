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

  const prim = actor.system.abilities.Primaries;
  const limits = prim.abilityLimits;

  // Base limit
  let limit = Number(limits[category].final) || 0;
  const current = Number(limits[category].current) || 0;

  // Check focus flag on the specific ability
  const abilityData = prim[category]?.[name];
  const isFocused = abilityData?.focus === true;

  // Focus halves the limit
  if (isFocused) {
    limit = limit / 2;
  }

  const records = actor.system.developmentPoints.spentRecords;

  const existing = records.find((r) => r.name === name && r.type === "Primary");
  const oldSpent = existing ? Number(existing.amount) * Number(existing.costPer) : 0;

  const newSpent = Number(amount) * Number(costPer);
  const newTotal = current - oldSpent + newSpent;

  return newTotal <= limit;
}

export function validateAttackDefenseRule(actor, { name, type, category, amount }) {
  if (type !== "Primary") return true;
  if (category !== "Combat") return true;

  const prim = actor.system.abilities.Primaries.Combat;

  const attack = prim.Attack;
  const block = prim.Block;
  const dodge = prim.Dodge;

  const newBase = Number(amount) || 0;
  const oldBase = Number(prim[name].base) || 0;

  // Identify which ability is focused (if any)
  const focusedAbility = attack.focus
    ? "Attack"
    : block.focus
      ? "Block"
      : dodge.focus
        ? "Dodge"
        : null;

  // If one ability is focused, the other two cannot increase
  if (focusedAbility && name !== focusedAbility) {
    if (newBase > oldBase) return false;
  }

  // If the edited ability *is* the focused one, skip the 50‑point rule entirely
  if (focusedAbility === name) {
    return true;
  }

  // Normal 50‑point difference rule (base-only)
  let attackBase = Number(attack.base) || 0;
  let blockBase = Number(block.base) || 0;
  let dodgeBase = Number(dodge.base) || 0;

  if (name === "Attack") attackBase = newBase;
  if (name === "Block") blockBase = newBase;
  if (name === "Dodge") dodgeBase = newBase;

  const diffBlock = Math.abs(attackBase - blockBase);
  const diffDodge = Math.abs(attackBase - dodgeBase);

  return diffBlock <= 50 && diffDodge <= 50;
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
