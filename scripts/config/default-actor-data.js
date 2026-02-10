export const DEFAULT_ACTOR_DATA = {
  classes: [],
  elans: [],
  WeaponModules: [],
  MartialArts: [],
  PsychicModules: [],
  advantages: [],
  disadvantages: [],
  contacts: [],
  core: {
    lifePoints: {
      current: 0,
      bonus: 0,
      classMultiple: 0
    },
    ki: {
      current: 0,
      bonus: 0
    },
    zeon: {
      current: 0,
      bonus: 0
    },
    psychicPoints: {
      current: 0,
      bonus: 0
    }
  },
  aspects: {
    hair: "",
    eyes: "",
    height: "",
    weight: "",
    gender: "",
    race: "",
    ethnicity: "",
    age: 0,
    size: { bonus: 0 },
    appearance: 0,
    background: "",
    notes: ""
  },
  fatigue: {
    current: 0
  },
  movement: {
    base: 0
  },
  initiative: {
    bonus: 0
  },
  titles: [],
  developmentPoints: {
    bonus: 0,
    spentRecords: []
  },
  martialKnowledge: {
    bonus: 0
  },
  characteristics: {
    Agility: { base: 1, bonus: 0 },
    Constitution: { base: 1, bonus: 0 },
    Dexterity: { base: 1, bonus: 0 },
    Strength: { base: 1, bonus: 0 },
    Intelligence: { base: 1, bonus: 0 },
    Perception: { base: 1, bonus: 0 },
    Power: { base: 1, bonus: 0 },
    Willpower: { base: 1, bonus: 0 }
  },
  abilities: {
    secondary: {
      Athletics: {
        Acrobatics: { base: 0, bonus: 0 },
        Athleticism: { base: 0, bonus: 0 },
        Climb: { base: 0, bonus: 0 },
        Jump: { base: 0, bonus: 0 },
        Ride: { base: 0, bonus: 0 },
        Swim: { base: 0, bonus: 0 }
      },
      Vigor: {
        Composure: { base: 0, bonus: 0 },
        FeatsOfStrength: { base: 0, bonus: 0 },
        WithstandPain: { base: 0, bonus: 0 }
      },
      Perception: {
        Notice: { base: 0, bonus: 0 },
        Search: { base: 0, bonus: 0 },
        Track: { base: 0, bonus: 0 }
      },
      Intellectual: {
        Animals: { base: 0, bonus: 0 },
        Appraisal: { base: 0, bonus: 0 },
        HerbalLore: { base: 0, bonus: 0 },
        History: { base: 0, bonus: 0 },
        MagicAppraisal: { base: 0, bonus: 0 },
        Medicine: { base: 0, bonus: 0 },
        Memorize: { base: 0, bonus: 0 },
        Navigation: { base: 0, bonus: 0 },
        Occult: { base: 0, bonus: 0 },
        Sciences: { base: 0, bonus: 0 }
      },
      Social: {
        Intimidate: { base: 0, bonus: 0 },
        Leadership: { base: 0, bonus: 0 },
        Persuasion: { base: 0, bonus: 0 },
        Style: { base: 0, bonus: 0 }
      },
      Subterfuge: {
        Disguise: { base: 0, bonus: 0 },
        Hide: { base: 0, bonus: 0 },
        LockPicking: { base: 0, bonus: 0 },
        Poisons: { base: 0, bonus: 0 },
        Theft: { base: 0, bonus: 0 },
        TrapLore: { base: 0, bonus: 0 },
        Stealth: { base: 0, bonus: 0 }
      },
      Creative: {
        Art: { base: 0, bonus: 0 },
        Dance: { base: 0, bonus: 0 },
        Forging: { base: 0, bonus: 0 },
        Music: { base: 0, bonus: 0 },
        SleightOfHand: { base: 0, bonus: 0 }
      }
    },
    primary: {
      Combat: {
        Attack: { base: 0, bonus: 0, focus: false },
        Block: { base: 0, bonus: 0, focus: false },
        Dodge: { base: 0, bonus: 0, focus: false },
        WearArmor: { base: 0, bonus: 0 }
      },
      Psychic: {
        PsychicProjection: { base: 0, bonus: 0 }
      },
      Supernatural: {
        MAMultiple: { base: 0, bonus: 0 },
        MagicProjection: { base: 0, bonus: 0 },
        Summon: { base: 0, bonus: 0 },
        Control: { base: 0, bonus: 0 },
        Bind: { base: 0, bonus: 0 },
        Banish: { base: 0, bonus: 0 }
      }
    }
  },
  resistances: {
    Physical: { bonus: 0 },
    Disease: { bonus: 0 },
    Venom: { bonus: 0 },
    Magic: { bonus: 0 },
    Psychic: { bonus: 0 }
  },
  languages: [{ name: "Base", level: 0 }],
  presence: { bonus: 0 },
  currency: { copper: 0, silver: 0, gold: 0 },
  lockUi: false
};
