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
