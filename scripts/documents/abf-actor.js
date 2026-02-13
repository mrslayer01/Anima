import { DEFAULT_ACTOR_DATA } from "../config/default-actor-data.js";
import { INIT_RULES, CLASS_RULE, FINAL_RULES } from "../data/rules/rules.js";
import { forceOrder } from "../ui/force-order.js";

export class AbfActor extends Actor {
  prepareBaseData() {
    super.prepareBaseData();
    const isNew = !this._id;
    if (isNew) this._needsInit = true;

    foundry.utils.mergeObject(this.system, DEFAULT_ACTOR_DATA, {
      insertKeys: true,
      overwrite: false
    });

    forceOrder(this.system.abilities.primary, "Primaries");
    forceOrder(this.system.abilities.secondary, "Secondaries");
  }

  prepareData() {
    super.prepareData();

    // Skip until system.core exists
    if (!this.system?.core) return;

    if (this._needsInit) {
      for (const rule of INIT_RULES) rule.Derived(this.system);
      for (const rule of CLASS_RULE) rule.Derived(this.system);
      for (const rule of FINAL_RULES) rule.Derived(this.system);

      this._needsInit = false;
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    // Do not run rules until the actor has been initialized
    if (this._needsInit) return;
    if (!this.system?.core) return; // still starting

    // Phase 1: initialize structures
    for (const rule of INIT_RULES) rule.Derived(this.system);
    // Phase 2: populate class-derived values
    for (const rule of CLASS_RULE) rule.Derived(this.system);
    // Phase 3: recalc dependent rules
    for (const rule of FINAL_RULES) rule.Derived(this.system);
  }

  async update(data, options = {}) {
    const oldSystem = foundry.utils.duplicate(this.system);

    // Merge item diffs into the actor diff
    const itemDiff = this._pendingItemDiff || {};
    delete this._pendingItemDiff;

    const combined = foundry.utils.mergeObject(foundry.utils.duplicate(data), itemDiff);

    const result = await super.update(data, options);

    // Run rules ONCE, using the combined diff
    for (const rule of INIT_RULES) rule.Update(combined, oldSystem, this.system);
    for (const rule of CLASS_RULE) rule.Update(combined, oldSystem, this.system);
    for (const rule of FINAL_RULES) rule.Update(combined, oldSystem, this.system);

    // DO NOT call super.update again

    return result;
  }
}
