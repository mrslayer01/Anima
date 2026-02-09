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
    armorPenalty: true
  },
  Athleticism: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  Climb: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  Jump: {
    characteristic: "Strength",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  Ride: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Swim: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  // Vigor
  Composure: {
    characteristic: "Willpower",
    knowledge: false,
    passive: true,
    armorPenalty: false
  },
  FeatsOfStrength: {
    characteristic: "Strength",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  WithstandPain: {
    characteristic: "Willpower",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  // Perception
  Notice: {
    characteristic: "Perception",
    knowledge: false,
    passive: true,
    armorPenalty: false
  },
  Search: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Track: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },

  // Intellectual
  Animals: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Appraisal: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  HerbalLore: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  History: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  MagicAppraisal: {
    characteristic: "Power",
    knowledge: true,
    passive: true,
    armorPenalty: false
  },
  Medicine: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Memorize: {
    characteristic: "Intelligence",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Navigation: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Occult: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Sciences: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  // Social
  Intimidate: {
    characteristic: "Willpower",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Leadership: {
    characteristic: "Power",
    knowledge: false,
    passive: true,
    armorPenalty: false
  },
  Persuasion: {
    characteristic: "Intelligence",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Style: {
    characteristic: "Power",
    knowledge: false,
    passive: true,
    armorPenalty: false
  },
  // Subterfuge
  Disguise: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Hide: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  LockPicking: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Poisons: {
    characteristic: "Intelligence",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Theft: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  TrapLore: {
    characteristic: "Perception",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Stealth: {
    characteristic: "Agility",
    knowledge: false,
    passive: false,
    armorPenalty: true
  },
  // Creative
  Art: {
    characteristic: "Power",
    knowledge: false,
    passive: false,
    armorPenalty: false
  },
  Dance: {
    characteristic: "Agility",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Forging: {
    characteristic: "Dexterity",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  Music: {
    characteristic: "Power",
    knowledge: true,
    passive: false,
    armorPenalty: false
  },
  SleightOfHand: {
    characteristic: "Dexterity",
    knowledge: false,
    passive: false,
    armorPenalty: false
  }
};

export const ABILITIES_PRIMARIES_SCHEMA = {
  // Combat
  Attack: {
    characteristic: "Dexterity"
  },
  Block: {
    characteristic: "Dexterity"
  },
  Dodge: {
    characteristic: "Agility"
  },
  WearArmor: {
    characteristic: "Agility"
  },
  // Psychic
  PsychicProjection: {
    characteristic: "Dexterity"
  },
  // Supernatural
  MagicProjection: {
    characteristic: "Dexterity"
  },

  Summon: {
    characteristic: "Power"
  },

  Control: {
    characteristic: "Willpower"
  },

  Bind: {
    characteristic: "Power"
  },

  Banish: {
    characteristic: "Power"
  }
};
