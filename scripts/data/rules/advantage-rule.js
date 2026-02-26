import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class AdvantageRule extends BaseRule {
  Initialize(system) {
    //Init

    calculateAdvantages(system);
  }

  Derived(system) {
    this.Initialize(system);
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    return changed;
  }

  RecalcUpdated(system, name) {
    //Init
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function calculateAdvantages(system) {
  const advantages = system.advantages || [];
  if (advantages === undefined) return;
  console.log(advantages);

  const aptitude = advantages.find((l) => l.name === "Aptitude in a Subject");
  console.log(aptitude);
}

function Aptitude(system) {
  // Handles both Aptitude in a subject and a field, which reduced the DP cost of a single or group of secondary abilities depending on how much CP is spent.
  // This will overwrite whatever the class cost is for the secondary ability/group.
}
