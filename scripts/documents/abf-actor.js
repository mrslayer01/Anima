import { DEFAULT_ACTOR_DATA } from "../config/default-actor-data.js";
import { calculateModifiers } from "../data/rules/global-modifiers.js";
import { INIT_RULES, MOD_RULES, FINAL_RULES } from "../data/rules/rules.js";
import { forceOrder } from "../ui/force-order.js";
import { AddModifier } from "../utils/helpers.js";

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
      for (const rule of INIT_RULES) rule.Derived(this.system, this);
      for (const rule of MOD_RULES) rule.Derived(this.system);
      for (const rule of FINAL_RULES) rule.Derived(this.system, this);

      this._needsInit = false;
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    if (this._needsInit) return;
    if (!this.system?.core) return;

    const system = this.system;

    // Phase 1
    for (const rule of INIT_RULES) rule.Derived(system, this);

    // Phase 2
    for (const rule of MOD_RULES) rule.Derived(system);

    // Phase 3 — Apply Active Effects
    for (const effect of this.effects) {
      const mods = effect.flags?.abf?.modifiers;
      if (!mods) continue;

      for (const [modName, entry] of Object.entries(mods)) {
        const target = system.globalModifiers[modName];
        if (target) AddModifier(target, entry);
      }
    }

    // recompute totals after effects
    calculateModifiers(system);

    // Phase 4 — Final rules
    for (const rule of FINAL_RULES) rule.Derived(system, this);

    // Finalize
    for (const mod of Object.values(system.globalModifiers)) {
      mod.final = mod.base + mod.special + mod.armor;
    }
  }
}
