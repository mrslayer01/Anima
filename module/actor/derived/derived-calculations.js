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



//used to calculate all derived values for an actor that depends on something else.
export function calculateDerivedValues(system, actor) {
    // 1. Primary derived values that others below depend on.
    calculateTotalLevel(system);
    calculateXpToNextLevel(system);
    calculatePresence(system);
    calculateMaxDP(system);


    // 2. Initialize all finals to prevent undefined values.
    initializeAllCharacteristicFinals(system);
    initializeAllResistances(system);
    initializeAllAbilities(system);
    

    // 3. Apply selective recalculation
    applyChangedCharacteristics(system, actor);
    applyChangedResistances(system, actor);
    applyChangedAbilities(system, actor);

    //4. All Others
    calculateFinalLifePoints(system);
    calculateFinalInitiative(system);
    calculateFinalFatigue(system);
    calculateCharacterSize(system);
    calculateMovement(system);
}