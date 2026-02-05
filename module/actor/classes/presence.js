import { toNum } from "../lookup.js";

export function calculatePresence(system) {
  const lvl = toNum(system.level) || 0;
  const bonus = toNum(system.presence.bonus);

  const final = lvl === 0
    ? 20 + bonus
    : 25 + (lvl * 5) + bonus;

  system.derived ??= {};
  system.derived.presence = { final };
}

export function initalizePresence (system) {
  const lvl = toNum(system.level) || 0;
  const bonus = toNum(system.presence.bonus);

  system.presence.final =
    lvl === 0 ? 20 + bonus : 25 + (lvl * 5) + bonus;
}

export async function updatePresence(actor) {
  const system = actor.system;
  const lvl = toNum(system.level) || 0;
  const bonus = toNum(system.presence.bonus);

  const final = lvl === 0
    ? 20 + bonus
    : 25 + (lvl * 5) + bonus;

  await actor.update(
    { "system.presence.final": final },
    { skipRecalc: true }
  );
}

