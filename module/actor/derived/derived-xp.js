import { toNum } from "../helpers/lookup.js";

export function calculateXpToNextLevel(system) {
  const lvl = toNum(system.level) || 0;
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

const xpTable = [
    0,     // 0
    0,     // 1
    100,   // 2
    225,   // 3
    375,   // 4
    550,   // 5
    750,   // 6
    975,   // 7
    1225,  // 8
    1500,  // 9
    1800,  // 10
    2125,  // 11
    2475,  // 12
    2850,  // 13
    3250,  // 14
    3675   // 15
];