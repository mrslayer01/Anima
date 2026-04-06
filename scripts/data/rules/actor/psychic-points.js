import { toNum } from "../../../utils/numbers.js";
import { BaseRule } from "../base-rule.js";

export class PsychicPPRule extends BaseRule {
  Initialize(system) {
    if (!system.psychic) system.psychic = {};
    if (!system.psychic.pp) system.psychic.pp = {};
    if (!Array.isArray(system.psychic.disciplines)) system.psychic.disciplines = [];

    const pp = system.psychic.pp;

    if (pp.total === undefined) pp.total = 0;
    if (pp.permanentSpent === undefined) pp.permanentSpent = 0;
    if (pp.remaining === undefined) pp.remaining = 0;

    if (!Array.isArray(pp.spentRecords)) pp.spentRecords = [];
  }

  Derived(system) {
    this.Initialize(system);

    const pp = system.psychic.pp;

    // Rebuild PP spent records
    pp.spentRecords = [];

    DerivedAffinities(system);
    DerivedMasteredPowers(system);
    DerivedPotentialUpgrades(system);
    DerivedStrengthenedPowers(system);
    DerivedInnateSlots(system);

    recalcPP(system);
  }

  DetectChanged(updateData, oldSystem) {
    const sys = updateData.system;
    if (!sys) return [];

    // Disciplines changed
    if (sys.psychic?.disciplines) return ["pp"];

    // Psychic powers changed (items)
    if (updateData.items) return ["pp"];

    // Potential upgrades changed
    if (sys.abilities?.primary?.Psychic?.PsychicPotential) return ["pp"];

    // Innate slots changed
    if (sys.abilities?.primary?.Psychic?.innateSlots !== undefined) return ["pp"];

    // PP fields changed
    if (sys.psychic?.pp) return ["pp"];

    return [];
  }

  RecalcUpdated(system, name) {
    if (name !== "pp") return;
    this.Derived(system);
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

// ------------------------------------------------------------
// PP REBUILD FUNCTIONS
// ------------------------------------------------------------

function recalcPP(system) {
  const pp = system.psychic.pp;

  let spent = 0;
  for (const rec of pp.spentRecords) {
    spent += toNum(rec.amount) * toNum(rec.cost);
  }

  pp.permanentSpent = spent;
  pp.remaining = toNum(pp.total) - spent;
}

// ------------------------------------------------------------
// Affinities
// ------------------------------------------------------------

function DerivedAffinities(system) {
  const disciplines = system.psychic?.disciplines;
  if (!Array.isArray(disciplines)) return;

  for (const d of disciplines) {
    system.psychic.pp.spentRecords.push({
      category: "Affinity",
      name: d.name,
      amount: 1,
      cost: 1
    });
  }
}

// ------------------------------------------------------------
// Mastered Powers
// ------------------------------------------------------------

function DerivedMasteredPowers(system) {
  const items = system._items || [];

  for (const item of items) {
    if (item.type !== "psychicPower") continue;

    if (item.system?.mastered) {
      system.psychic.pp.spentRecords.push({
        category: "Power",
        name: item.name,
        amount: 1,
        cost: 1
      });
    }
  }
}

// ------------------------------------------------------------
// Permanent Potential Upgrades
// ------------------------------------------------------------

function DerivedPotentialUpgrades(system) {
  const potential = system.abilities?.primary?.Psychic?.PsychicPotential;
  if (!potential) return;

  const bonus = toNum(potential.permanentBonus || 0);
  if (!bonus) return;

  const cost = potentialBonusToPPCost(bonus);

  system.psychic.pp.spentRecords.push({
    category: "Potential",
    name: `+${bonus} Potential`,
    amount: 1,
    cost
  });
}

function potentialBonusToPPCost(bonus) {
  const steps = bonus / 10;
  let total = 0;

  for (let i = 1; i <= steps; i++) {
    total += i;
  }

  return total;
}

// ------------------------------------------------------------
// Strengthened Powers
// ------------------------------------------------------------

function DerivedStrengthenedPowers(system) {
  const items = system._items || [];

  for (const item of items) {
    if (item.type !== "psychicPower") continue;

    const strengthen = toNum(item.system?.strengthen || 0);
    if (strengthen <= 0) continue;

    const cost = strengthen / 10;

    system.psychic.pp.spentRecords.push({
      category: "Strengthen",
      name: item.name,
      amount: 1,
      cost
    });
  }
}

// ------------------------------------------------------------
// Innate Slots
// ------------------------------------------------------------

function DerivedInnateSlots(system) {
  const slots = toNum(system.abilities?.primary?.Psychic?.innateSlots || 0);
  if (slots <= 0) return;

  system.psychic.pp.spentRecords.push({
    category: "InnateSlot",
    name: "Innate Slot",
    amount: slots,
    cost: 2
  });
}
