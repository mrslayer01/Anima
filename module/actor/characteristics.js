import {lookupCharacteristicMod} from "./lookup.js";

export function calculateCharacteristicFinal(system) {
    for (const [key, char] of Object.entries(system.characteristics)) {
      const mod = lookupCharacteristicMod(char.base);
      char.final = (char.bonus || 0) + (char.class || 0) + (mod || 0);
    }
}