import { toNum } from "../lookup.js";

// 1. Modifier lookup
function lookupCharacteristicMod(base) {
  if (base < 1) return -30;
  if (base < 2) return -30;
  if (base < 3) return -20;
  if (base < 4) return -10;
  if (base < 5) return -5;
  if (base < 6) return 0;
  if (base < 8) return 5;
  if (base < 10) return 10;
  if (base < 11) return 15;
  if (base < 13) return 20;
  if (base < 15) return 25;
  if (base < 16) return 30;
  if (base < 18) return 35;
  if (base < 20) return 40;
  return 45;
}

// 2. Full initialization (prevents undefined finals)
export function initializeAllCharacteristicFinals(system) {
  for (const [name, char] of Object.entries(system.characteristics)) {
    const mod = toNum(lookupCharacteristicMod(char.base));
    const charBonus = toNum(char.bonus || 0); 
    
    
    char.final = charBonus + (mod || 0);
  }
}

// 3. Selective recalculation, updates only changed characteristics
export function applyChangedCharacteristics(system, actor) {
  const changed = actor._changedCharacteristics;

  if (Array.isArray(changed)) {
    for (const name of changed) {
      const char = system.characteristics[name];
      const mod = toNum(lookupCharacteristicMod(char.base));
      const charBonus = toNum(char.bonus || 0); 

      char.final = charBonus + (mod || 0);
    }
  }

  delete actor._changedCharacteristics;
}

// 4. Change detection (called from update-calculations.js)
export function detectChangedCharacteristics(data, oldSystem) {
  const changed = [];

  // Expand flattened update paths
  const expanded = foundry.utils.expandObject(data);
  const updatedChars = expanded.system?.characteristics ?? {};

  for (const [charName, fields] of Object.entries(updatedChars)) {
    for (const [field, newValue] of Object.entries(fields)) {
      const oldValue = oldSystem.characteristics[charName][field];
      if (oldValue !== newValue) {
        changed.push(charName);
      }
    }
  }

  return changed;
}