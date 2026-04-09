import { toNum } from "../../../utils/numbers.js";
import { BaseRule } from "../base-rule.js";

export class PsychicPPRule extends BaseRule {
  Initialize(system) {
    if (!system.psychic) system.psychic = {};
    if (!system.psychic.pp) system.psychic.pp = {};
    if (!Array.isArray(system.psychic.disciplines)) system.psychic.disciplines = [];
    if (!Array.isArray(system.psychic.mentalPowers)) system.psychic.mentalPowers = [];
    if (!system.psychic.innateSlotsUsed) system.psychic.innateSlotsAvailable = 0;

    const pp = system.psychic.pp;

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

    // Mental Powers changed
    if (sys.psychic?.mentalPowers) return ["pp"];

    // Innate Powers changed
    if (sys.psychic?.innatePowers) return ["pp"];

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
  const ppFinal = system.abilities.primary.Psychic?.PsychicPoints?.final;

  let spent = 0;
  for (const rec of pp.spentRecords) {
    spent += toNum(rec.amount) * toNum(rec.cost);
  }

  pp.permanentSpent = spent;
  pp.remaining = toNum(ppFinal) - spent;
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
      cost: 4
    });
  }
}

// ------------------------------------------------------------
// Mastered Powers
// ------------------------------------------------------------

function DerivedMasteredPowers(system) {
  const mentalPowers = system.psychic?.mentalPowers;
  if (!Array.isArray(mentalPowers)) return;

  for (const m of mentalPowers) {
    system.psychic.pp.spentRecords.push({
      category: "Power",
      name: m.name,
      amount: 1,
      cost: 1
    });
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

  const steps = bonus / 10;
  let totalCost = 0;

  for (let i = 1; i <= steps; i++) {
    totalCost += i;
  }

  system.psychic.pp.spentRecords.push({
    category: "Potential",
    name: `+${bonus} Potential`,
    amount: 1,
    cost: totalCost
  });
}

// ------------------------------------------------------------
// Strengthened Powers
// ------------------------------------------------------------

function DerivedStrengthenedPowers(system) {
  const mentalPowers = system.psychic?.mentalPowers;
  if (!Array.isArray(mentalPowers)) return;

  for (const m of mentalPowers) {
    const strengthen = toNum(m.system?.strengthen || 0);
    if (strengthen <= 0) continue;

    const cost = strengthen / 10;

    system.psychic.pp.spentRecords.push({
      category: "Strengthen",
      name: m.name,
      amount: 1,
      cost
    });
  }
}

// ------------------------------------------------------------
// Innate Slots
// ------------------------------------------------------------

function DerivedInnateSlots(system) {
  const slots = toNum(system.abilities?.primary?.Psychic?.PsychicPoints?.innateSlots || 0);
  if (slots <= 0) return;

  system.psychic.pp.spentRecords.push({
    category: "InnateSlot",
    name: "Innate Slot",
    amount: slots,
    cost: 2
  });

  // Calculate Available Innate Slots
  const ppPath = system.psychic;

  const innateSlotsLength = toNum(ppPath.mentalPowers.filter((p) => p.innate).length);
  ppPath.innateSlotsAvailable = slots - innateSlotsLength;
}
