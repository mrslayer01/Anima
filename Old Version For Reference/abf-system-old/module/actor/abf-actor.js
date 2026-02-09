import { calculateDerivedValues } from "./derived/derived-calculations.js";
import { updateCalculations } from "./update/update-calculations.js";
import { DEFAULT_ACTOR_DATA } from "./config/definitions/default-actor-data.js";
import { forceAbilityOrder } from "./helpers/force-ability-order.js";
import { initializeActor } from "./initalize.js";
import { TABLE_ITEM_TYPES } from "./helpers/lookup.js";

export class AbfActor extends Actor {
  prepareBaseData() {
    super.prepareBaseData();

    const isNew = !this._id;
    if (isNew) this._needsInit = true;

    foundry.utils.mergeObject(this.system, DEFAULT_ACTOR_DATA, {
      insertKeys: true,
      overwrite: false
    });

    this.system.tables = {};
    for (const [tableName, allowedTypes] of Object.entries(TABLE_ITEM_TYPES)) {
      this.system.tables[tableName] = this.items.filter((i) => allowedTypes.includes(i.type));
    }

    forceAbilityOrder(this.system.abilities.Primaries, "Primaries");
    forceAbilityOrder(this.system.abilities.Secondaries, "Secondaries");
  }

  prepareData() {
    super.prepareData();

    if (this._needsInit) {
      initializeActor(this);
      this._needsInit = false;
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    calculateDerivedValues(this);
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
