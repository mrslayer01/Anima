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

//used to calculate all derived values for an actor that depends on something else.
export function calculateDerivedValues(system, actor) {
  // 1. Primary derived values
  calculateTotalLevel(system);
  calculateXpToNextLevel(system);
  calculatePresence(system);
  calculateMaxDP(system); // PURE — safe to run always

  // 2. Initialize finals ONLY if actor is new or flagged
  if (actor._initialize) {
    initializeAllCharacteristics(system);
    applyClassBonuses(system);
    initializeAllAbilities(system);
    initializeAllResistances(system);
  }

  // 3. Selective recalculation
  if (actor._changedCharacteristics?.length) {
    applyChangedCharacteristics(system, actor);
  }

  applyClassBonuses(system);

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
  calculateFinalFatigue(system);
  calculateCharacterSize(system);
  calculateMovement(system);
  calculateElanFinal(system);
  calculateRegeneration(system);
}
