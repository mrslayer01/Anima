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