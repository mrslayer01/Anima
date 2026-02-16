import { toNum } from "./numbers.js";

export function AddModifier(mod, entry) {
  if (!Array.isArray(mod.currentMods)) mod.currentMods = [];

  const idx = mod.currentMods.findIndex((m) => m.id === entry.id);

  // If value is 0 → remove the record
  if (toNum(entry.value) === 0) {
    if (idx !== -1) mod.currentMods.splice(idx, 1);
    return;
  }

  // If exists → update
  if (idx !== -1) {
    mod.currentMods[idx].value = entry.value;
    mod.currentMods[idx].type = entry.type;
    mod.currentMods[idx].source = entry.source;
  }
  // If not → push new
  else {
    mod.currentMods.push({
      id: entry.id,
      source: entry.source,
      value: entry.value,
      type: entry.type
    });
  }
}
