import { toNum } from "../lookup.js";

export function calculatePresence(system) {
    const lvl = toNum(system.level) || 0;
    if (lvl == 0) {
      system.presence.final = 20 + toNum(system.presence.bonus);
    } else {
      system.presence.final = 25 + (lvl * 5) + toNum(system.presence.bonus);
    }
}