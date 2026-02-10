import { DEFAULT_ACTOR_DATA } from "../config/default-actor-data.js";
import { RULES } from "../data/rules/rules.js";
import { forceAbilityOrder } from "../ui/force-ability-order.js";

export class AbfActor extends Actor {
  prepareBaseData() {
    super.prepareBaseData();
    const isNew = !this._id;
    if (isNew) this._needsInit = true;

    foundry.utils.mergeObject(this.system, DEFAULT_ACTOR_DATA, {
      insertKeys: true,
      overwrite: false
    });

    forceAbilityOrder(this.system.abilities.primary, "Primaries");
    forceAbilityOrder(this.system.abilities.secondary, "Secondaries");
  }

  prepareData() {
    super.prepareData();
    if (this._needsInit) {
      //InitalizeAllActorData(this); // ← initialization happens here
      this._needsInit = false;
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    for (const rule of RULES) {
      rule.Derived(this.system);
    }
  }

  async update(data, options = {}) {
    const oldSystem = foundry.utils.duplicate(this.system);
    const result = await super.update(data, options);

    for (const rule of RULES) {
      rule.Update(data, oldSystem, this.system);
    }

    return result;
  }
}
