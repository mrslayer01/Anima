import { BaseRule } from "./base-rule.js";
import { ABILITIES_SECONDARIES_SCHEMA } from "./schema.js";

export class AbilitiesSecondaryRule extends BaseRule {
  Initialize(system) {
    // Add all the missing fields for cost, class, final, special, characteristic, knowledge, passive, undeveloped, mastery and armorPenalty.
    for (const [name, category] of Object.entries(system.abilities.secondary)) {
      for (const [name, abil] of Object.entries(system.abilities.secondary[category])) {
        if (abil.cost === undefined) res.cost = 0;
        if (abil.class === undefined) res.class = 0;
        if (abil.final === undefined) res.final = 0;
        if (abil.special === undefined) res.special = 0;
        if (abil.characteristic === undefined)
          res.characteristic = ABILITIES_SECONDARIES_SCHEMA[name].characteristic;
        if (abil.knowledge === undefined)
          res.knowledge = ABILITIES_SECONDARIES_SCHEMA[name].knowledge;
        if (abil.passive === undefined) res.passive = ABILITIES_SECONDARIES_SCHEMA[name].passive;
        if (abil.undeveloped === undefined) res.undeveloped = true;
        if (abil.mastery === undefined) res.mastery = false;
        if (abil.armorPenalty === undefined)
          res.armorPenalty = ABILITIES_SECONDARIES_SCHEMA[name].armorPenalty;
      }
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
