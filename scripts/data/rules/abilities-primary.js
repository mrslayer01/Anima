import { BaseRule } from "./base-rule.js";
import { ABILITIES_PRIMARIES_SCHEMA } from "./schema.js";

export class AbilitiesPrimaryRule extends BaseRule {
  Initialize(system) {
    // Add all the missing fields cost, class, final, special, mastery and characteristic
    // Combat
    for (const [name, abil] of Object.entries(system.abilities.primary.Combat)) {
      if (abil.cost === undefined) res.cost = 0;
      if (abil.class === undefined) res.class = 0;
      if (abil.final === undefined) res.final = 0;
      if (abil.special === undefined) res.special = 0;
      if (abil.mastery === undefined) res.mastery = false;

      if (abil.characteristic === undefined)
        res.characteristic = ABILITIES_PRIMARIES_SCHEMA[name].characteristic;
    }
  }

  Derived(system) {}

  DetectChanged(updateData, oldSystem) {}

  RecalcUpdated(system, name) {}

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
