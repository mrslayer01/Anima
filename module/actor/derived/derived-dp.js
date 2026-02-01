export function calculateMaxDP(system) {
  const lvl = system.level || 0;

  const dpTable = [
    400,  // Level 0
    600,  // Level 1
    700,  // Level 2
    800,  // Level 3
    900,  // Level 4
    1000, // Level 5
    1100, // Level 6
    1200, // Level 7
    1300, // Level 8
    1400, // Level 9
    1500, // Level 10
    1600, // Level 11
    1700, // Level 12
    1800, // Level 13
    1900, // Level 14
    2000  // Level 15
  ];

  if (lvl <= 15) {
    system.destinyPoints.max = dpTable[lvl];
  }

  // Scale beyond level 15: +100 DP per level
  system.destinyPoints.max = dpTable[15] + (lvl - 15) * 100;
}