import { toNum } from "../lookup.js";

export function calculatePresence(system) {
  // PURE: do NOT write to system.presence.final
  // Instead compute a derived version if needed
  const lvl = toNum(system.level) || 0;
  const bonus = toNum(system.presence.bonus);

  const final = lvl === 0
    ? 20 + bonus
    : 25 + (lvl * 5) + bonus;

  system.derived ??= {};
  system.derived.presence = { final };
}

