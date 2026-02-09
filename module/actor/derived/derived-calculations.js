import {
  initializeAllCharacteristics,
  applyChangedCharacteristics
} from "../classes/characteristics.js";
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

export function calculateDerivedValues(system, actor) {
  // 1. Primary derived values
  calculateTotalLevel(system);
  calculateXpToNextLevel(system);
  calculatePresence(system);

  // 2. Class bonuses BEFORE DP
  applyClassBonuses(system);

  // 3. DP ACCOUNTING BLOCK (all DP-using systems plug in here)
  calculateMaxDP(system); // sets final, spent, remaining
  calculatePrimaryLimits(system); // uses final
  calculatePrimaryCategoryTotals(system); // uses spentRecords
  calculateSecondaryTotalDP(system);
  calculatePrimaryTotalDP(system);

  // 4. Global modifiers
  calculateGlobalModifiers(system);

  // 5. Initialization
  if (actor._initialize) {
    initializeAllCharacteristics(system);
    calculateFinalFatigue(system);

    applyClassBonuses(system);

    // DP ACCOUNTING BLOCK again
    calculateMaxDP(system);
    calculatePrimaryLimits(system);
    calculatePrimaryCategoryTotals(system);
    calculateSecondaryTotalDP(system);
    calculatePrimaryTotalDP(system);

    calculateGlobalModifiers(system);

    initializeAllAbilities(system);
    initializeAllResistances(system);
  }

  // 6. Selective recalculation
  if (actor._changedCharacteristics?.length) {
    applyChangedCharacteristics(system, actor);
  }

  if (actor._changedPrimariesAbilities?.length) {
    applyChangedPrimariesAbilities(system, actor);
  }

  if (actor._changedSecondariesAbilities?.length) {
    applyChangedSecondariesAbilities(system, actor);
  }

  if (actor._changedResistances?.length) {
    applyChangedResistances(system, actor);
  }

  // 7. Other derived values
  calculateFinalLifePoints(system);
  calculateFinalInitiative(system);
  calculateCharacterSize(system);
  calculateMovement(system);
  calculateElanFinal(system);
  calculateRegeneration(system);
}
