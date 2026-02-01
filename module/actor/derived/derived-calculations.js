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


//used to calculate all derived values for an actor that depends on something else.
export function calculateDerivedValues(system, actor) {
      // 3. Other derived values
    calculateTotalLevel(system);
    calculateXpToNextLevel(system);
    calculatePresence(system);
    calculateMaxDP(system);

    // 1. Initialize all finals to prevent undefined values.
    initializeAllCharacteristicFinals(system);
    initializeAllResistances(system);
    initializeAllAbilities(system);
    

    // 2. Apply selective recalculation
    applyChangedCharacteristics(system, actor);
    applyChangedResistances(system, actor);
    applyChangedAbilities(system, actor);
}