import { calculateDerivedValues } from "./derived/derived-calculations.js";
import { updateCalculations } from "./update/update-calculations.js";
import { DEFAULT_ACTOR_DATA } from "./default-actor-data.js";

export class AbfActor extends Actor {
  // Initialize or normalize raw system data.
  // Use this for defaults, ensuring arrays/objects exist,
  // and cleaning malformed data. Do NOT compute derived values here.
  prepareBaseData() {
    super.prepareBaseData();

    foundry.utils.mergeObject(this.system, DEFAULT_ACTOR_DATA, {
      insertKeys: true,
      overwrite: false
    });
  }

  // Compute ALL derived values for the actor.
  // This runs after prepareData() and after embedded documents are ready.
  // Safe to mutate system.* here because derived data does NOT persist.
  prepareDerivedData() {
    super.prepareDerivedData();
    calculateDerivedValues(this.system, this);
  }

  // Detect what changed when the actor is updated.
  // Use this ONLY for comparing old vs new data and reacting to changes.
  // Do NOT compute derived values or mutate system.* here.
  async update(data, options = {}) {
  const oldSystem = foundry.utils.duplicate(this.system);

  // Detect changes BEFORE update is applied
  updateCalculations(data, oldSystem, this);

  const result = await super.update(data, options);
  return result;

  }
}
