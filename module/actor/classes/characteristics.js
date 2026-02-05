import { toNum } from "../helpers/lookup.js";

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

export function initializeAllCharacteristics(system) {
  for (const [name, char] of Object.entries(system.characteristics)) {
    const mod = toNum(lookupCharacteristicMod(char.base));
    const charBonus = toNum(char.bonus || 0); 
    
    
    char.final = charBonus + (mod || 0);
  }
}

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

export async function updateCharacteristics(actor, changedNames) {
  const system = actor.system;

  for (const name of changedNames) {
    const char = system.characteristics[name];
    const mod = lookupCharacteristicMod(char.base);
    const charBonus = toNum(char.bonus || 0);

    char.final = charBonus + mod;
  }
}