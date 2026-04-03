import { toNum } from "../../../utils/numbers.js";

export class martialKnowledgeRule {
  Initialize(system) {
    //Init
    const mk = system.martialKnowledge;

    if (!mk.class) mk.class = 0;
    if (!mk.special) mk.special = 0;
    if (!mk.final) mk.final = 0;
    if (!mk.spent) mk.spent = 0;
    if (!mk.remaining) mk.remaining = 0;
    if (!Array.isArray(mk.spentRecords)) mk.spentRecords = [];
  }

  Derived(system) {
    this.Initialize(system);
    const mk = system.martialKnowledge;

    // Rebuild spentRecords from current Martial Arts, techniques, abilities, etc
    mk.spentRecords = [];

    mk.final = toNum(mk.bonus) + toNum(mk.class) + toNum(mk.special);

    let spent = 0;
    for (const rec of mk.spentRecords) {
      spent += toNum(rec.amount) * toNum(rec.cost);
    }

    mk.spent = spent;
    mk.remaining = mk.final - spent;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    const sys = updateData.system;
    if (!sys) return [];

    if (sys.martialKnowledge?.class) {
      changed = ["mk"];
      console.log(changed);
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    if (name !== "mk") return;

    const { category, ability } = this._change;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
