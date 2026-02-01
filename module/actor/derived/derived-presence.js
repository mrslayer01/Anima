export function calculatePresence(system) {
    const lvl = system.level || 0;
    if (lvl == 0) {
      system.presence.final = 20 + system.presence.bonus;
    } else {
      system.presence.final = 25 + (lvl * 5) + system.presence.bonus;
    }
}