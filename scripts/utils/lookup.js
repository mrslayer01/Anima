// Holds all lookup tables

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
  0: "None",
  20: "Routine",
  40: "Easy",
  80: "Moderate",
  120: "Difficult",
  140: "Very Difficult",
  180: "Absurd",
  240: "Almost Impossible",
  280: "Impossible",
  320: "Inhuman",
  440: "Zen"
};

export const CAST_DIFFICULTY = {
  20: "Routine",
  40: "Easy",
  80: "Moderate",
  120: "Difficult",
  140: "Very Difficult",
  180: "Absurd",
  240: "Almost Impossible",
  280: "Impossible",
  320: "Inhuman",
  440: "Zen"
};

export const MAGIC_PROJECTION_DIFFICULTY = {
  routine: {
    value: 20,
    label: "Routine",
    description:
      "Spell effects may be used on the spellcaster himself or on a person or object the spellcaster is contact with."
  },
  easy: {
    value: 40,
    label: "Easy",
    description: "Projecting spells up to a maximum of 15 feet."
  },
  medium: {
    value: 80,
    label: "Medium",
    description: "Projecting spells up to a maximum of 80 feet."
  },
  difficult: {
    value: 120,
    label: "Difficult",
    description: "Projecting spells up to a maximum of 300 feet."
  },
  veryDifficult: {
    value: 140,
    label: "Very Difficult",
    description: "Projecting spells up to a maximum of 800 feet."
  },
  absurd: {
    value: 180,
    label: "Absurd",
    description: "Projecting spells up to a maximum of 1,500 feet."
  },
  almostImpossible: {
    value: 240,
    label: "Almost Impossible",
    description:
      "This allows the spellcaster to hit targets out of direct eyesight if he has perfectly determined their exact location. Some sort of supernatural detection that will reveal the exact location is needed (e.g., a Spy of Light spell). Coverage is 3,000 feet."
  },
  impossible: {
    value: 280,
    label: "Impossible",
    description:
      "This allows the caster to affect targets not within sight of the sorcerer with only an approximate notion of their location. For instance, if the spellcaster knows that his target is located in a house, he would be able to target the spell even though he may not know the precise address. Distance should not exceed three miles."
  }
};

export const PSYCHIC_PROJECTION_DIFFICULTY = {
  routine: {
    value: 20,
    label: "Routine",
    description:
      "The ability may be used on the psychic himself or on a person or object with which he is in contact."
  },
  easy: {
    value: 40,
    label: "Easy",
    description: "Affects targets less than 15 feet away from the psychic."
  },
  moderate: {
    value: 80,
    label: "Moderate",
    description: "Affects targets up to 60 feet away from the psychic."
  },
  difficult: {
    value: 120,
    label: "Difficult",
    description: "Affects targets up to 300 feet away from the psychic."
  },
  veryDifficult: {
    value: 140,
    label: "Very Difficult",
    description: "Affects targets up to 800 feet away from the psychic."
  },
  absurd: {
    value: 180,
    label: "Absurd",
    description: "Affects targets up to 1,500 feet away from the psychic."
  },
  almostImpossible: {
    value: 240,
    label: "Almost Impossible",
    description:
      "Achieving this difficulty allows the psychic to hit a target whose exact location is known but not necessarily within direct eyesight. It covers up to one mile."
  },
  impossible: {
    value: 280,
    label: "Impossible",
    description:
      "Achieving this difficulty allows the psychic to affect targets out of his sight and with only an approximate location up to 10 miles away."
  }
};

export const PRICE_MODIFIERS = {
  mediocre: 0.5,
  decent: 1,
  good: 10,
  luxury: 100
};

export const CURRENCY_TYPES = {
  copper: "Copper",
  silver: "Silver",
  gold: "Gold"
};

export const WEAPON_SIMILARITY_MODIFIERS = {
  known: 0,
  similar: -20,
  mixed: -40,
  unarmed: -60
};

export const TABLE_ITEM_TYPES = {
  commonGoods: ["commonGood"],
  weapons: ["weapon"],
  armor: ["armor"],
  consumables: ["potion", "scroll"]
};

const ACTIONS_BY_DEX_AGI = [
  { min: 1, max: 10, actions: 1 },
  { min: 11, max: 14, actions: 2 },
  { min: 15, max: 19, actions: 3 },
  { min: 20, max: 22, actions: 4 },
  { min: 23, max: 25, actions: 5 },
  { min: 26, max: 28, actions: 6 },
  { min: 29, max: 31, actions: 8 },
  { min: 32, max: Infinity, actions: 10 }
];

const BREAKAGE_BY_STRENGTH = [
  { min: 8, max: 9, bonus: 1 },
  { min: 10, max: 10, bonus: 2 },
  { min: 11, max: 12, bonus: 4 },
  { min: 13, max: 14, bonus: 6 },
  { min: 15, max: Infinity, bonus: 8 }
];

export const ARMOR_SECTIONS = ["breastplate", "shirt", "complete", "helm", "natural"];
export const DAMAGE_TYPES = ["cut", "imp", "thr", "hea", "ele", "col", "ene"];
export const SECONDARY_DAMAGE_TYPES = ["none", "cut", "imp", "thr", "hea", "ele", "col", "ene"];
export const WEAPON_TYPES = [
  "shortArm",
  "axe",
  "mace",
  "sword",
  "twoHanded",
  "pole",
  "cord",
  "projectile",
  "throwing",
  "shield"
];

export const SECONDARY_WEAPON_TYPES = [
  "none",
  "shortArm",
  "axe",
  "mace",
  "sword",
  "twoHanded",
  "pole",
  "cord",
  "throwing",
  "shield"
];

//#region Schema
export const RESISTANCE_SCHEMA = {
  Physical: "Constitution",
  Disease: "Constitution",
  Venom: "Constitution",
  Magic: "Power",
  Psychic: "Willpower"
};

export const ABILITIES_SECONDARIES_SCHEMA = {
  // Athletics
  Acrobatics: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: true
  },
  Athleticism: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: true
  },
  Climb: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: true
  },
  Jump: {
    characteristic: "Strength",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: true
  },
  Ride: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Swim: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: true
  },
  // Vigor
  Composure: {
    characteristic: "Willpower",
    knowledge: false,
    passive: true,
    physicalPenalty: false,
    naturalPenalty: false
  },
  FeatsOfStrength: {
    characteristic: "Strength",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: false
  },
  WithstandPain: {
    characteristic: "Willpower",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  // Perception
  Notice: {
    characteristic: "Perception",
    knowledge: false,
    passive: true,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Search: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Track: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  // Intellectual
  Animals: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Appraisal: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  HerbalLore: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  History: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  MagicAppraisal: {
    characteristic: "Power",
    knowledge: true,
    passive: true,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Medicine: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Memorize: {
    characteristic: "Intelligence",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Navigation: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Occult: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Sciences: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  // Social
  Intimidate: {
    characteristic: "Willpower",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Leadership: {
    characteristic: "Power",
    knowledge: false,
    passive: true,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Persuasion: {
    characteristic: "Intelligence",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Style: {
    characteristic: "Power",
    knowledge: false,
    passive: true,
    physicalPenalty: false,
    naturalPenalty: false
  },
  // Subterfuge
  Disguise: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Hide: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: false
  },
  LockPicking: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Poisons: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Theft: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  TrapLore: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Stealth: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    physicalPenalty: true,
    naturalPenalty: true
  },
  // Creative
  Art: {
    characteristic: "Power",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Dance: {
    characteristic: "Agility",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Forging: {
    characteristic: "Dexterity",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  Music: {
    characteristic: "Power",
    knowledge: true,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  },
  SleightOfHand: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    physicalPenalty: false,
    naturalPenalty: false
  }
};

export const ABILITIES_PRIMARIES_SCHEMA = {
  // Combat
  Attack: {
    characteristic: "Dexterity",
    naturalPenalty: false,
    physicalPenalty: false
  },
  Block: {
    characteristic: "Dexterity",
    naturalPenalty: false,
    physicalPenalty: false
  },
  Dodge: {
    characteristic: "Agility",
    naturalPenalty: true,
    physicalPenalty: true
  },
  WearArmor: {
    characteristic: "Agility",
    naturalPenalty: false,
    physicalPenalty: false
  },
  // Psychic
  PsychicProjection: {
    characteristic: "Dexterity",
    naturalPenalty: false,
    physicalPenalty: false
  },
  // Supernatural
  MagicProjection: {
    characteristic: "Dexterity",
    naturalPenalty: false,
    physicalPenalty: false
  },

  Summon: {
    characteristic: "Power",
    naturalPenalty: false,
    physicalPenalty: false
  },

  Control: {
    characteristic: "Willpower",
    naturalPenalty: false,
    physicalPenalty: false
  },

  Bind: {
    characteristic: "Power",
    naturalPenalty: false,
    physicalPenalty: false
  },

  Banish: {
    characteristic: "Power",
    naturalPenalty: false,
    physicalPenalty: false
  }
};

//#endregion

export function getMaxActions(dex, agi) {
  const total = dex + agi;

  for (const row of ACTIONS_BY_DEX_AGI) {
    if (total >= row.min && total <= row.max) {
      return row.actions;
    }
  }

  return 1; // fallback, though the table covers all valid values
}

export function getBreakageBonus(str) {
  for (const row of BREAKAGE_BY_STRENGTH) {
    if (str >= row.min && str <= row.max) {
      return row.bonus;
    }
  }
  return 0; // fallback if Strength < 8
}

export function computeDamagePercent(result, at = 0) {
  // Check counterattack first
  const counter = computeCounterattack(result);
  if (counter > 0) {
    return { pct: 0, counter };
  }

  // Apply AT reduction for normal damage
  const effective = result - at * 10;

  if (effective < 10) {
    return { pct: 0, counter: 0 };
  }

  const table = [
    { min: 10, max: 19, pct: 10 },
    { min: 20, max: 29, pct: 20 },
    { min: 30, max: 39, pct: 30 },
    { min: 40, max: 49, pct: 40 },
    { min: 50, max: 59, pct: 50 },
    { min: 60, max: 69, pct: 60 },
    { min: 70, max: 79, pct: 70 },
    { min: 80, max: 89, pct: 80 },
    { min: 90, max: 99, pct: 90 },
    { min: 100, max: 109, pct: 100 },
    { min: 110, max: 119, pct: 110 },
    { min: 120, max: 129, pct: 120 },
    { min: 130, max: 139, pct: 130 },
    { min: 140, max: 149, pct: 140 },
    { min: 150, max: 159, pct: 150 },
    { min: 160, max: 169, pct: 160 },
    { min: 170, max: 179, pct: 170 },
    { min: 180, max: 189, pct: 180 },
    { min: 190, max: 199, pct: 190 },
    { min: 200, max: 209, pct: 200 },
    { min: 210, max: 219, pct: 210 },
    { min: 220, max: 229, pct: 220 },
    { min: 230, max: 239, pct: 230 },
    { min: 240, max: 249, pct: 240 },
    { min: 250, max: 259, pct: 250 },
    { min: 260, max: 269, pct: 260 },
    { min: 270, max: 279, pct: 270 },
    { min: 280, max: 289, pct: 280 },
    { min: 290, max: 299, pct: 290 },
    { min: 300, max: 309, pct: 300 },
    { min: 310, max: 319, pct: 310 },
    { min: 320, max: 329, pct: 320 },
    { min: 330, max: 339, pct: 330 },
    { min: 340, max: 349, pct: 340 },
    { min: 350, max: 359, pct: 350 },
    { min: 360, max: 369, pct: 360 },
    { min: 370, max: 379, pct: 370 },
    { min: 380, max: 389, pct: 380 },
    { min: 390, max: 399, pct: 390 },
    { min: 400, max: 9999, pct: 400 }
  ];

  const pct = table.find((r) => effective >= r.min && effective <= r.max)?.pct ?? 0;

  return { pct, counter: 0 };
}

export function computeCounterattack(result) {
  if (result >= 0) return 0; // attacker wins or ties = no counterattack

  const abs = Math.abs(result);

  if (abs <= 10) return 0;
  if (abs <= 20) return 5;
  if (abs <= 30) return 10;
  if (abs <= 40) return 15;
  if (abs <= 50) return 20;
  if (abs <= 60) return 25;
  if (abs <= 70) return 30;
  if (abs <= 80) return 35;
  if (abs <= 90) return 40;
  if (abs <= 100) return 45;
  if (abs <= 110) return 50;
  if (abs <= 120) return 55;
  if (abs <= 130) return 60;
  if (abs <= 140) return 65;
  if (abs <= 150) return 70;
  if (abs <= 160) return 75;
  if (abs <= 170) return 80;
  if (abs <= 180) return 85;
  if (abs <= 190) return 90;
  if (abs <= 200) return 95;
  if (abs <= 210) return 100;
  if (abs <= 220) return 105;
  if (abs <= 230) return 110;
  if (abs <= 240) return 115;
  if (abs <= 250) return 120;
  if (abs <= 260) return 125;
  if (abs <= 270) return 130;
  if (abs <= 280) return 135;
  if (abs <= 290) return 140;
  if (abs <= 300) return 145;

  return 150; // -301 or lower
}

export const DIRECTED_ATTACK_TABLE = {
  None: 0,
  Eye: -100,
  Neck: -80,
  Head: -60,
  Elbow: -60,
  Heart: -60,
  Groin: -60,
  Foot: -50,
  Hand: -40,
  Wrist: -40,
  Knee: -40,
  Shoulder: -30,
  Abdomen: -20,
  Arm: -20,
  Thigh: -20,
  Torso: -10,
  Calf: -10
};

export const ARMOR_COVERAGE = {
  breastplate: ["Torso"],
  shirt: ["Torso", "Arms"],
  complete: ["Torso", "Arms", "Legs"],
  helmet: ["Head"]
};

export const SUMMONING_DIFFICULTY_TABLE = {
  0: {
    summon: 140,
    summonZeon: 10,
    control: 180,
    controlZeon: 20,
    bind: 160,
    bindZeon: 5,
    banish: 100,
    banishZeon: 5
  },
  1: {
    summon: 160,
    summonZeon: 20,
    control: 200,
    controlZeon: 40,
    bind: 180,
    bindZeon: 10,
    banish: 120,
    banishZeon: 5
  },
  2: {
    summon: 180,
    summonZeon: 40,
    control: 220,
    controlZeon: 80,
    bind: 200,
    bindZeon: 20,
    banish: 140,
    banishZeon: 10
  },
  3: {
    summon: 200,
    summonZeon: 60,
    control: 240,
    controlZeon: 120,
    bind: 220,
    bindZeon: 30,
    banish: 160,
    banishZeon: 15
  },
  4: {
    summon: 220,
    summonZeon: 80,
    control: 260,
    controlZeon: 160,
    bind: 240,
    bindZeon: 40,
    banish: 180,
    banishZeon: 20
  },
  5: {
    summon: 240,
    summonZeon: 100,
    control: 280,
    controlZeon: 200,
    bind: 260,
    bindZeon: 50,
    banish: 200,
    banishZeon: 25
  },
  6: {
    summon: 260,
    summonZeon: 120,
    control: 300,
    controlZeon: 240,
    bind: 280,
    bindZeon: 60,
    banish: 220,
    banishZeon: 30
  },
  7: {
    summon: 280,
    summonZeon: 140,
    control: 320,
    controlZeon: 280,
    bind: 300,
    bindZeon: 70,
    banish: 240,
    banishZeon: 40
  },
  8: {
    summon: 300,
    summonZeon: 160,
    control: 340,
    controlZeon: 320,
    bind: 320,
    bindZeon: 80,
    banish: 260,
    banishZeon: 50
  },
  9: {
    summon: 320,
    summonZeon: 180,
    control: 360,
    controlZeon: 360,
    bind: 340,
    bindZeon: 90,
    banish: 280,
    banishZeon: 60
  },
  10: {
    summon: 340,
    summonZeon: 200,
    control: 380,
    controlZeon: 400,
    bind: 360,
    bindZeon: 100,
    banish: 300,
    banishZeon: 80
  },
  11: {
    summon: 360,
    summonZeon: 220,
    control: 400,
    controlZeon: 440,
    bind: 380,
    bindZeon: 120,
    banish: 320,
    banishZeon: 100
  },
  12: {
    summon: 380,
    summonZeon: 240,
    control: 420,
    controlZeon: 480,
    bind: 400,
    bindZeon: 140,
    banish: 340,
    banishZeon: 120
  },
  13: {
    summon: 400,
    summonZeon: 260,
    control: 440,
    controlZeon: 520,
    bind: 420,
    bindZeon: 160,
    banish: 360,
    banishZeon: 140
  },
  14: {
    summon: 420,
    summonZeon: 280,
    control: 460,
    controlZeon: 560,
    bind: 440,
    bindZeon: 180,
    banish: 380,
    banishZeon: 160
  },
  15: {
    summon: 440,
    summonZeon: 300,
    control: 480,
    controlZeon: 600,
    bind: 460,
    bindZeon: 200,
    banish: 400,
    banishZeon: 180
  }
};

export const COMBAT_SITUATIONAL_MODIFIERS = {
  None: {
    attack: 0,
    block: 0,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  },
  physicalContactSpell: {
    attack: 40,
    block: 0,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  },
  flanked: {
    attack: -10,
    block: -30,
    dodge: -30,
    initiative: 0,
    physical: 0,
    action: 0
  },
  fromBehind: {
    attack: -30,
    block: -80,
    dodge: -80,
    initiative: 0,
    physical: 0,
    action: 0
  },
  surprised: {
    attack: 0,
    block: -90,
    dodge: -90,
    initiative: 0,
    physical: 0,
    action: -90
  },
  visionPartiallyObscured: {
    attack: -30,
    block: -30,
    dodge: -15,
    initiative: 0,
    physical: 0,
    action: -30
  },
  visionTotallyObscured: {
    attack: -100,
    block: -80,
    dodge: -80,
    initiative: 0,
    physical: 0,
    action: -90
  },
  higherGround: {
    attack: +20,
    block: 0,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  },
  fromGround: {
    attack: -30,
    block: -30,
    dodge: -30,
    initiative: -10,
    physical: 0,
    action: -30
  },
  partiallyImmobilized: {
    attack: -20,
    block: -20,
    dodge: -40,
    initiative: -20,
    physical: 0,
    action: -40
  },
  mostlyImmobilized: {
    attack: -80,
    block: -80,
    dodge: -80,
    initiative: -30,
    physical: 0,
    action: -60
  },
  fullyImmobilized: {
    attack: -200,
    block: -200,
    dodge: -200,
    initiative: -100,
    physical: 0,
    action: -200
  },
  putAtWeaponsPoint: {
    attack: -20,
    block: -120,
    dodge: -120,
    initiative: -50,
    physical: 0,
    action: -100
  },
  levitating: {
    attack: -20,
    block: -20,
    dodge: -40,
    initiative: 0,
    physical: 0,
    action: -60
  },
  flightType10to14: {
    attack: +10,
    block: +10,
    dodge: +10,
    initiative: +10,
    physical: 0,
    action: 0
  },
  flightType15Plus: {
    attack: +15,
    block: +10,
    dodge: +20,
    initiative: +10,
    physical: 0,
    action: 0
  },
  charging: {
    attack: +10,
    block: -10,
    dodge: -20,
    initiative: 0,
    physical: 0,
    action: 0
  },
  drawingWeapon: {
    attack: -25,
    block: -25,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: -25
  },
  smallAdversary: {
    attack: -10,
    block: 0,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  },
  tinyAdversary: {
    attack: -20,
    block: -10,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  }
};

export const COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL = {
  None: {
    attack: 0,
    block: 0,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  },
  physicalContactSpell: {
    attack: 40,
    block: 0,
    dodge: 0,
    initiative: 0,
    physical: 0,
    action: 0
  },
  visionPartiallyObscured: {
    attack: -30,
    block: -30,
    dodge: -15,
    initiative: 0,
    physical: 0,
    action: -30
  },
  visionTotallyObscured: {
    attack: -100,
    block: -80,
    dodge: -80,
    initiative: 0,
    physical: 0,
    action: -90
  },
  putAtWeaponsPoint: {
    attack: -20,
    block: -120,
    dodge: -120,
    initiative: -50,
    physical: 0,
    action: -100
  }
};
