import {
  detectChangedPrimariesAbilities,
  detectChangedSecondariesAbilities,
  updatePrimariesAbilities,
  updateSecondariesAbilities
} from "../classes/abilities.js";

import { DEPENDENCIES } from "../classes/dependency-map.js";
import { detectChangedResistances, updateResistances } from "../classes/resistances.js";
import { updatePresence } from "../classes/presence.js";
import { detectChangedCharacteristics } from "../classes/characteristics.js";
import { toNum } from "../helpers/lookup.js";

export async function updateCalculations(data, oldSystem, actor) {
  const expanded = foundry.utils.expandObject(data);

  // --- Characteristics ---
  actor._changedCharacteristics = detectChangedCharacteristics(data, oldSystem);

  for (const trigger of DEPENDENCIES.characteristics.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedCharacteristics = DEPENDENCIES.characteristics.recalc(actor);
    }
  }

  // No compute here — leave the flag set

  // --- Total Level ---
  if (pathChanged(data, "system.classes")) {
    const newLevel = (actor.system.classes || []).reduce((t, c) => t + (toNum(c.level) || 0), 0);

    await actor.update({ "system.level": newLevel }, { skipRecalc: true });
  }

  // --- Presence ---
  let presenceChanged = false;

  if (expanded.system?.presence?.bonus !== undefined) presenceChanged = true;

  for (const trigger of DEPENDENCIES.presence.triggers) {
    if (pathChanged(data, trigger)) {
      presenceChanged = true;
      break;
    }
  }

  if (presenceChanged) {
    await updatePresence(actor); // persistent update only
  }

  // --- Resistances ---
  actor._changedResistances = detectChangedResistances(data, oldSystem);

  for (const trigger of DEPENDENCIES.resistances.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedResistances = DEPENDENCIES.resistances.recalc(actor);
    }
  }

  if (actor._changedResistances?.length) {
    await updateResistances(actor, actor._changedResistances);
  }

  // --- Abilities: Secondaries ---
  actor._changedSecondariesAbilities = detectChangedSecondariesAbilities(data, oldSystem);

  for (const trigger of DEPENDENCIES.secondariesAbilities.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedSecondariesAbilities = DEPENDENCIES.secondariesAbilities.recalc(actor);
    }
  }

  if (actor._changedSecondariesAbilities?.length) {
    updateSecondariesAbilities(actor, actor._changedSecondariesAbilities);
  }

  // --- Abilities: Primaries ---
  actor._changedPrimariesAbilities = detectChangedPrimariesAbilities(data, oldSystem);

  for (const trigger of DEPENDENCIES.primariesAbilities.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedPrimariesAbilities = DEPENDENCIES.primariesAbilities.recalc(actor);
    }
  }

  if (actor._changedPrimariesAbilities?.length) {
    updatePrimariesAbilities(actor, actor._changedPrimariesAbilities);
  }
}

function pathChanged(data, path) {
  const expanded = foundry.utils.expandObject(data);
  return foundry.utils.getProperty(expanded, path) !== undefined;
}
