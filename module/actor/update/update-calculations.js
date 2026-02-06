import {
  detectChangedPrimariesAbilities,
  detectChangedSecondariesAbilities,
  updatePrimariesAbilities,
  updateSecondariesAbilities
} from "../classes/abilities.js";

import { DEPENDENCIES } from "../classes/dependency-map.js";
import { detectChangedResistances, updateResistances } from "../classes/resistances.js";
import { updatePresence } from "../classes/presence.js";
import { updateCharacteristics, detectChangedCharacteristics } from "../classes/characteristics.js";
import { toNum } from "../helpers/lookup.js";

export async function updateCalculations(data, oldSystem, actor) {
  const expanded = foundry.utils.expandObject(data);

  //#region Characteristics

  const changedChars = detectChangedCharacteristics(data, oldSystem);
  actor._changedCharacteristics = changedChars;

  // Dependency propagation
  for (const trigger of DEPENDENCIES.characteristics.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedCharacteristics = DEPENDENCIES.characteristics.recalc(actor);
    }
  }

  // Perform persistent update
  if (actor._changedCharacteristics?.length) {
    await updateCharacteristics(actor, actor._changedCharacteristics);
  }

  //#endregion

  //total level
  if (pathChanged(data, "system.classes")) {
    const newLevel = (actor.system.classes || []).reduce((t, c) => t + (toNum(c.level) || 0), 0);

    await actor.update({ "system.level": newLevel }, { skipRecalc: true });
  }

  //#region Presence
  let presenceChanged = false;

  // Direct edits
  if (expanded.system?.presence?.bonus !== undefined) presenceChanged = true;

  // Dependency triggers
  for (const trigger of DEPENDENCIES.presence.triggers) {
    if (pathChanged(data, trigger)) {
      presenceChanged = true;
      break;
    }
  }

  if (presenceChanged) {
    await updatePresence(actor);
  }

  //#endregion

  //#region Resistances
  const changedRes = detectChangedResistances(data, oldSystem);

  // Store direct changes
  actor._changedResistances = changedRes;

  // Dependency propagation
  for (const trigger of DEPENDENCIES.resistances.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedResistances = DEPENDENCIES.resistances.recalc(actor);
    }
  }

  // Perform persistent update
  if (actor._changedResistances?.length) {
    await updateResistances(actor, actor._changedResistances);
  }

  //#endregion

  //#region Abilities

  //#region Secondaries
  const changedAbil = detectChangedSecondariesAbilities(data, oldSystem);

  // Store direct changes
  actor._changedSecondariesAbilities = changedAbil;

  // Dependency propagation
  for (const trigger of DEPENDENCIES.secondariesAbilities.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedSecondariesAbilities = DEPENDENCIES.secondariesAbilities.recalc(actor);
    }
  }

  // Perform persistent update
  if (actor._changedSecondariesAbilities?.length) {
    updateSecondariesAbilities(actor, actor._changedSecondariesAbilities);
  }
  //#endregion

  //#region Primaries
  const changedPirmAbil = detectChangedPrimariesAbilities(data, oldSystem);

  // Store direct changes
  actor._changedPrimariesAbilities = changedPirmAbil;

  // Dependency propagation
  for (const trigger of DEPENDENCIES.primariesAbilities.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedPrimariesAbilities = DEPENDENCIES.primariesAbilities.recalc(actor);
    }
  }

  // Perform persistent update
  if (actor._changedPrimariesAbilities?.length) {
    updatePrimariesAbilities(actor, actor._changedPrimariesAbilities);
  }
  //#endregion

  //#endregion
}

function pathChanged(data, path) {
  const expanded = foundry.utils.expandObject(data);
  return foundry.utils.getProperty(expanded, path) !== undefined;
}
