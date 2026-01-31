export function lookupCharacteristicMod(base) {
  if (base < 1) return -30;
  if (base < 2) return -30;
  if (base < 3) return -20;
  if (base < 4) return -10;
  if (base < 5) return -5;
  if (base < 6) return 0;
  if (base < 8) return 5;
  if (base < 10) return 10;
  if (base < 11) return 15;
  if (base < 13) return 20;
  if (base < 15) return 25;
  if (base < 16) return 30;
  if (base < 18) return 35;
  if (base < 20) return 40;
  return 45;
}

export const difficultyMap = {
  20: "Routine — trivial actions anyone can do",
  40: "Easy — familiar tasks most people can manage",
  80: "Moderate — requires some skill or experience",
  120: "Difficult — demanding for an average person",
  140: "Very Difficult — near the limit of normal ability",
  180: "Absurd — only elite or gifted can succeed",
  240: "Almost Impossible — even experts usually fail",
  280: "Impossible — barely within physical reality",
  320: "Inhuman — beyond logic, requires supernatural ability",
  440: "Zen — transcends reality, pure fiction without powers"
};

export const xpTable = [
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
