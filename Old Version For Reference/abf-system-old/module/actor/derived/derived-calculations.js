import { computeCharacteristics, applyChangedCharacteristics } from "../classes/characteristics.js";
import { initializeAllResistances, applyChangedResistances } from "../classes/resistances.js";
import {
  initializeAllAbilities,
  applyChangedSecondariesAbilities,
  applyChangedPrimariesAbilities
} from "../classes/abilities.js";

import { calculateXpToNextLevel } from "./derived-xp.js";
import { calculateTotalLevel } from "./derived-total-level.js";
import { calculatePresence } from "../classes/presence.js";
import {
  calculateMaxDP,
  calculatePrimaryTotalDP,
  calculateSecondaryTotalDP
} from "../classes/dp.js";
import { calculateFinalLifePoints } from "./derived-life-points.js";
import { calculateFinalInitiative } from "./derived-initiative.js";
import { calculateFinalFatigue } from "./derived-fatigue.js";
import { calculateCharacterSize } from "./derived-size.js";
import { calculateMovement } from "./derived-movement.js";
import { calculateElanFinal } from "./derived-elan.js";
import { calculateRegeneration } from "./derived-regeneration.js";
import {
  applyClassBonuses,
  calculatePrimaryCategoryTotals,
  calculatePrimaryLimits
} from "./derrived-class-details.js";
import { calculateGlobalModifiers } from "./derrived-modifiers.js";

export function calculateDerivedValues(actor) {
  const system = actor.system;
  // 0. Characteristics FIRST (foundation for everything)
  computeCharacteristics(system);

  // 1. Primary derived values
  calculateTotalLevel(system);
  calculateXpToNextLevel(system);
  calculatePresence(system); // uses characteristics

  // 2. Class bonuses BEFORE DP
  applyClassBonuses(system); // uses characteristics + presence

  // 3. DP accounting (depends on class bonuses)
  calculateMaxDP(system);
  calculatePrimaryLimits(system);
  calculatePrimaryCategoryTotals(system);
  calculateSecondaryTotalDP(system);
  calculatePrimaryTotalDP(system);

  // 4. Global modifiers (depends on DP + class bonuses)
  calculateGlobalModifiers(system);

  // 5. Selective recalculation (after structure exists)
  if (actor._changedCharacteristics?.length) {
    applyChangedCharacteristics(actor.system, actor);
  }
  if (actor._changedPrimariesAbilities?.length) {
    applyChangedPrimariesAbilities(actor.system, actor);
  }
  if (actor._changedSecondariesAbilities?.length) {
    applyChangedSecondariesAbilities(actor.system, actor);
  }
  if (actor._changedResistances?.length) {
    applyChangedResistances(actor.system, actor);
  }

  // 6. Other derived values (depend on everything above)
  calculateFinalFatigue(system);
  calculateFinalLifePoints(system);
  calculateFinalInitiative(system);
  calculateCharacterSize(system);
  calculateMovement(system);
  calculateElanFinal(system);
  calculateRegeneration(system);

  // 7. Characteristics LAST (protect final values)
  computeCharacteristics(system);
}
