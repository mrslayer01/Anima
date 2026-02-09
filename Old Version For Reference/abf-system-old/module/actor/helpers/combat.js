// Range definitions from the printed table
const COUNTER_RANGES = [
  { min: -999, max: -301, base: 150 },
  { min: -300, max: -291, base: 145 },
  { min: -290, max: -281, base: 140 },
  { min: -280, max: -271, base: 135 },
  { min: -270, max: -261, base: 130 },
  { min: -260, max: -251, base: 125 },
  { min: -250, max: -241, base: 120 },
  { min: -240, max: -231, base: 115 },
  { min: -230, max: -221, base: 110 },
  { min: -220, max: -211, base: 105 },
  { min: -210, max: -201, base: 100 },
  { min: -200, max: -191, base: 95 },
  { min: -190, max: -181, base: 90 },
  { min: -180, max: -171, base: 85 },
  { min: -170, max: -161, base: 80 },
  { min: -160, max: -151, base: 75 },
  { min: -150, max: -141, base: 70 },
  { min: -140, max: -131, base: 65 },
  { min: -130, max: -121, base: 60 },
  { min: -120, max: -111, base: 55 },
  { min: -110, max: -101, base: 50 },
  { min: -100, max: -91, base: 45 },
  { min: -90, max: -81, base: 40 },
  { min: -80, max: -71, base: 35 },
  { min: -70, max: -61, base: 30 },
  { min: -60, max: -51, base: 25 },
  { min: -50, max: -41, base: 20 },
  { min: -40, max: -31, base: 15 },
  { min: -30, max: -21, base: 10 },
  { min: -20, max: -11, base: 5 },
  { min: -10, max: -1, base: 0 }
];

const DAMAGE_RANGES = [
  { min: 0, max: 9, base: 10 },
  { min: 10, max: 19, base: 10 },
  { min: 20, max: 29, base: 20 },
  { min: 30, max: 39, base: 30 },
  { min: 40, max: 49, base: 40 },
  { min: 50, max: 59, base: 50 },
  { min: 60, max: 69, base: 60 },
  { min: 70, max: 79, base: 70 },
  { min: 80, max: 89, base: 80 },
  { min: 90, max: 99, base: 90 },
  { min: 100, max: 109, base: 100 },
  { min: 110, max: 119, base: 110 },
  { min: 120, max: 129, base: 120 },
  { min: 130, max: 139, base: 130 },
  { min: 140, max: 149, base: 140 },
  { min: 150, max: 159, base: 150 },
  { min: 160, max: 169, base: 160 },
  { min: 170, max: 179, base: 170 },
  { min: 180, max: 189, base: 180 },
  { min: 190, max: 199, base: 190 },
  { min: 200, max: 209, base: 200 },
  { min: 210, max: 219, base: 210 },
  { min: 220, max: 229, base: 220 },
  { min: 230, max: 239, base: 230 },
  { min: 240, max: 249, base: 240 },
  { min: 250, max: 259, base: 250 },
  { min: 260, max: 269, base: 260 },
  { min: 270, max: 279, base: 270 },
  { min: 280, max: 289, base: 280 },
  { min: 290, max: 299, base: 290 },
  { min: 300, max: 309, base: 300 },
  { min: 310, max: 319, base: 310 },
  { min: 320, max: 329, base: 320 },
  { min: 330, max: 339, base: 330 },
  { min: 340, max: 349, base: 340 },
  { min: 350, max: 359, base: 350 },
  { min: 360, max: 369, base: 360 },
  { min: 370, max: 379, base: 370 },
  { min: 380, max: 389, base: 380 },
  { min: 390, max: 399, base: 390 },
  { min: 400, max: 999, base: 400 }
];

function generateCombatTable() {
  const table = {};

  for (let at = 0; at <= 10; at++) {
    table[at] = [];

    // Counterattack rows
    for (const row of COUNTER_RANGES) {
      table[at].push({
        min: row.min,
        max: row.max,
        value: { type: "counter", bonus: row.base }
      });
    }

    // Damage rows
    for (const row of DAMAGE_RANGES) {
      table[at].push({
        min: row.min,
        max: row.max,
        value: { type: "damage", percent: row.base }
      });
    }
  }

  return table;
}

export const COMBAT_TABLE = generateCombatTable();
