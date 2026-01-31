import { xpTable } from "./lookup.js";

export function calculateXpToNextLevel(system) {
  const lvl = system.level || 0;
  const next = lvl + 1;

  let xp;

  if (next <= 15) {
    xp = xpTable[next];
  } else {
    xp = xpTable[15];
    for (let i = 16; i <= next; i++) {
      xp += 450;
    }
  }
  system.xp.next = xp;
}