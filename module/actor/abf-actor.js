import { calculateDerivedValues } from "./derived/derived-calculations.js";
import { updateCalculations } from "./update/update-calculations.js";
import { DEFAULT_ACTOR_DATA } from "./default-actor-data.js";
import { forceAbilityOrder } from "../helpers/force-ability-order.js";
import { initializeActor } from "./initalize.js";

export class AbfActor extends Actor {

  prepareBaseData() {
    super.prepareBaseData();

    foundry.utils.mergeObject(this.system, DEFAULT_ACTOR_DATA, {
      insertKeys: true,
      overwrite: false
    });
    //initalize
    this._initialize = true;


    // Restore manual ordering AFTER Foundry normalizes keys
    forceAbilityOrder(this.system.abilities);
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    if(this._initialize) {
      initializeActor(this);
    }
    
    calculateDerivedValues(this.system, this);
  }

  async update(data, options = {}) {
    const oldSystem = foundry.utils.duplicate(this.system);
    const skip = options.skipRecalc === true;

    const result = await super.update(data, options);

    if (!skip) {
      await updateCalculations(data, oldSystem, this);
    }

    return result;
  }
}
