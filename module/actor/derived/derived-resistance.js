import { toNum } from "../lookup.js";

// 1. Full initialization (prevents undefined finals)
export function initializeAllResistances(system) {
    const presence = toNum(system.presence.final);

    for (const [name, res] of Object.entries(system.resistances)) {
        const linkedChar = res.characteristic; // e.g. "Constitution"
        const charFinal = toNum(system.characteristics[linkedChar].final);
        

        res.final = presence + charFinal + (toNum(res.bonus) || 0);
    }
}

// 2. Selective recalculation (only recalc changed resistances)
export function applyChangedResistances(system, actor) {
  const changed = actor._changedResistances;
  if (!Array.isArray(changed)) return;

  const presence = toNum(system.presence.final);

  for (const name of changed) {
    const res = system.resistances[name];
    const linkedChar = res.characteristic;
    const charFinal = toNum(system.characteristics[linkedChar].final);

    res.final = presence + charFinal + (toNum(res.bonus) || 0);
  }

  delete actor._changedResistances;
}

// 3. Change detection (called from update-calculations.js)
export function detectChangedResistances(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);

  const updated = expanded.system?.resistances ?? {};

  for (const [resName, fields] of Object.entries(updated)) {
    for (const [field, newValue] of Object.entries(fields)) {
      const oldValue = oldSystem.resistances[resName][field];
      if (oldValue !== newValue) {
        changed.push(resName);
      }
    }
  }

  return changed;
}