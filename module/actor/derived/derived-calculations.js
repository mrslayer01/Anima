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
import { calculateMaxDP } from "../classes/development-points.js";
import { calculateFinalLifePoints } from "./derived-life-points.js";
import { calculateFinalInitiative } from "./derived-initiative.js";
import { calculateFinalFatigue } from "./derived-fatigue.js";
import { calculateCharacterSize } from "./derived-size.js";
import { calculateMovement } from "./derived-movement.js";
import { calculateElanFinal } from "./derived-elan.js";
import { calculateRegeneration } from "./derived-regeneration.js";
import { applyClassBonuses } from "./derrived-class-details.js";
import { calculateGlobalModifiers } from "./derrived-modifiers.js";

//used to calculate all derived values for an actor that depends on something else.
export function calculateDerivedValues(system, actor) {
  // 1. Primary derived values
  calculateTotalLevel(system);
  calculateXpToNextLevel(system);
  calculatePresence(system);
  calculateMaxDP(system);
  calculateFinalFatigue(system);
  applyClassBonuses(system);
  //Apply penalties if any to special
  calculateGlobalModifiers(system);

  // 2. Initialize finals ONLY if actor is new or flagged
  if (actor._initialize) {
    initializeAllCharacteristics(system);
    calculateFinalFatigue(system);
    applyClassBonuses(system);
    //Apply penalties if any to special
    calculateGlobalModifiers(system);
    initializeAllAbilities(system);
    initializeAllResistances(system);
  }

  // 3. Selective recalculation
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

  // 4. Other derived values
  calculateFinalLifePoints(system);
  calculateFinalInitiative(system);
  calculateCharacterSize(system);
  calculateMovement(system);
  calculateElanFinal(system);
  calculateRegeneration(system);
}
