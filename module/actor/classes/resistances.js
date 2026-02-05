import { toNum } from "../lookup.js";

export function initializeAllResistances(system) {
  const presence = toNum(system.presence.final);

  system.derived ??= {};
  system.derived.resistances ??= {};

  for (const [name, res] of Object.entries(system.resistances)) {
    const linkedChar = res.characteristic;
    const charFinal = toNum(system.characteristics[linkedChar]?.final);

    const final = presence + charFinal + toNum(res.bonus);

    system.derived.resistances[name] = { final };
  }
}

export function applyChangedResistances(system, actor) {
  const changed = actor._changedResistances;
  if (!Array.isArray(changed)) return;

  const presence = toNum(system.presence.final);

  system.derived ??= {};
  system.derived.resistances ??= {};

  for (const name of changed) {
    const res = system.resistances[name];
    const linkedChar = res.characteristic;
    const charFinal = toNum(system.characteristics[linkedChar]?.final);

    const final = presence + charFinal + toNum(res.bonus);

    system.derived.resistances[name] = { final };
  }
}

export function detectChangedResistances(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);

  const updated = expanded.system?.resistances ?? {};

  for (const [resName, fields] of Object.entries(updated)) {
    for (const [field, newValue] of Object.entries(fields)) {
      const oldValue = oldSystem.resistances[resName][field];
      if (oldValue !== newValue) {
        changed.push(resName);
        break;
      }
    }
  }

  return changed;
}

export async function updateResistances(actor, changedNames) {
  const system = actor.system;
  const presence = toNum(system.presence.final);

  const updates = {};

  for (const name of changedNames) {
    const res = system.resistances[name];
    const linkedChar = res.characteristic;
    const charFinal = toNum(system.characteristics[linkedChar]?.final);

    const final = presence + charFinal + toNum(res.bonus);

    updates[`system.resistances.${name}.final`] = final;
  }

  await actor.update(updates, { skipRecalc: true });

  delete actor._changedResistances;
}