import { initializeAllCharacteristicFinals, applyChangedCharacteristics } 
  from "./derived-characteristics.js";
import { initializeAllResistances, applyChangedResistances } 
  from "./derived-resistance.js";
  import {initializeAllAbilities, applyChangedAbilities } 
  from "./derived-abilities.js";

import { calculateXpToNextLevel } from "./derived-xp.js";
import { calculateTotalLevel } from "./derived-total-level.js";
import { calculatePresence } from "./derived-presence.js";
import { calculateMaxDP } from "./derived-dp.js";
import { calculateFinalLifePoints } from "./derived-life-points.js";
import { calculateFinalInitiative } from "./derived-initiative.js";
import { calculateFinalFatigue } from "./derived-fatigue.js";
import { calculateCharacterSize } from "./derived-size.js"
import { calculateMovement } from "./derived-movement.js"
import { calculateElanFinal } from "./derived-elan.js";



//used to calculate all derived values for an actor that depends on something else.
export function calculateDerivedValues(system, actor) {
  // 1. Primary derived values
  calculateTotalLevel(system);
  calculateXpToNextLevel(system);
  calculatePresence(system);
  calculateMaxDP(system); // PURE — safe to run always

  // 2. Initialize finals ONLY if actor is new or flagged
  if(actor._initializeCharacteristics) {
    initializeAllCharacteristicFinals(system);
    delete actor._initializeCharacteristics;
  }


  if (actor._initializeAbilities) {
    initializeAllAbilities(system);
    delete actor._initializeAbilities;
  }

  if (actor._initializeResistances) {
    initializeAllResistances(system);
    delete actor._initializeResistances;
  }

  // 3. Selective recalculation
  if (actor._changedCharacteristics?.length) {
    applyChangedCharacteristics(system, actor);
  }

  if (actor._changedResistances?.length) {
    applyChangedResistances(system, actor);
  }

  if (actor._changedAbilities?.length) {
    applyChangedAbilities(system, actor);
  }

  // 4. Other derived values
  calculateFinalLifePoints(system);
  calculateFinalInitiative(system);
  calculateFinalFatigue(system);
  calculateCharacterSize(system);
  calculateMovement(system);
  calculateElanFinal(system);
}