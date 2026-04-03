import { toNum } from "../../../utils/numbers.js";
import { BaseRule } from "../base-rule.js";

export class MartialKnowledgeRule extends BaseRule {
  Initialize(system) {
    const mk = system.martialKnowledge;

    if (!mk.class) mk.class = 0;
    if (!mk.bonus) mk.bonus = 0;
    if (!mk.special) mk.special = 0;

    if (!mk.final) mk.final = 0;
    if (!mk.spent) mk.spent = 0;
    if (!mk.remaining) mk.remaining = 0;

    if (!Array.isArray(mk.spentRecords)) mk.spentRecords = [];
  }

  Derived(system) {
    this.Initialize(system);

    const mk = system.martialKnowledge;

    // Rebuild MK spent records
    mk.spentRecords = [];

    DerivedMartialArts(system);
    DerivedKiAbilities(system);
    DerivedTechniques(system);

    recalcMK(system);
  }

  DetectChanged(updateData, oldSystem) {
    const sys = updateData.system;
    if (!sys) return [];

    // Martial Arts changed
    if (sys.modules?.MartialArts) return ["mk"];

    // Techniques changed
    if (updateData.items) return ["mk"];

    // Ki abilities changed
    if (sys.abilities?.primary?.Combat?.Ki?.abilities) return ["mk"];

    // MK fields changed
    if (sys.martialKnowledge) return ["mk"];

    return [];
  }

  RecalcUpdated(system, name) {
    if (name !== "mk") return;

    // MK is simple — just rebuild everything
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
// MK REBUILD FUNCTIONS
// ------------------------------------------------------------

function recalcMK(system) {
  const mk = system.martialKnowledge;

  mk.final = toNum(mk.class) + toNum(mk.bonus) + toNum(mk.special);

  let spent = 0;
  for (const rec of mk.spentRecords) {
    spent += toNum(rec.amount) * toNum(rec.cost);
  }

  mk.spent = spent;
  mk.remaining = mk.final - spent;
}

// ------------------------------------------------------------
// Martial Arts MK
// ------------------------------------------------------------

function DerivedMartialArts(system) {
  const arts = system.modules?.MartialArts;
  if (!Array.isArray(arts)) return;

  for (const art of arts) {
    if (!art || !art.name || !art.mk) continue;

    system.martialKnowledge.spentRecords.push({
      category: "MartialArt",
      ability: art.name,
      amount: 1,
      cost: -toNum(art.mk)
    });
  }
}

// ------------------------------------------------------------
// Ki Abilities MK
// ------------------------------------------------------------

function DerivedKiAbilities(system) {
  const abilities = system.abilities?.primary?.Combat?.Ki?.abilities;
  if (!abilities) return;

  for (const [key, ability] of Object.entries(abilities)) {
    if (ability.purchased) {
      system.martialKnowledge.spentRecords.push({
        category: "KiAbility",
        ability: ability.name,
        amount: 1,
        cost: toNum(ability.mkCost)
      });
    }
  }
}

// ------------------------------------------------------------
// Techniques MK
// ------------------------------------------------------------

function DerivedTechniques(system) {
  const items = system._items || [];

  for (const item of items) {
    if (item.type !== "technique") continue;

    const mkCost = toNum(item.system?.martialKnowledge);
    if (mkCost > 0) {
      system.martialKnowledge.spentRecords.push({
        category: "Technique",
        ability: item.name,
        amount: 1,
        cost: mkCost
      });
    }
  }
}
