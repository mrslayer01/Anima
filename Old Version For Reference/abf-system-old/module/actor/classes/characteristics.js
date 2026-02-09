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
  const expanded = foundry.utils.expandObject(data);
  const updated = expanded.system?.characteristics ?? {};

  for (const [name, fields] of Object.entries(updated)) {
    if (fields.base !== undefined && fields.base !== oldSystem.characteristics[name].base) {
      changed.push(name);
      continue;
    }
    if (fields.bonus !== undefined && fields.bonus !== oldSystem.characteristics[name].bonus) {
      changed.push(name);
    }
  }

  return changed;
}

export function computeCharacteristics(system, changedNames = null) {
  const entries = changedNames?.length
    ? changedNames.map((name) => [name, system.characteristics[name]])
    : Object.entries(system.characteristics);

  for (const [name, char] of entries) {
    const base = toNum(char.base);
    const bonus = toNum(char.bonus);
    const mod = lookupCharacteristicMod(base);

    char.mod = mod;
    char.final = mod + bonus;
  }
}
