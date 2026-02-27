export const DEFAULT_ACTOR_DATA = {
  classes: [],
  globalModifiers: {
    Physical: { currentMods: [] },
    Action: { currentMods: [] },
    Natural: { currentMods: [] },
    Perception: { currentMods: [] },
    Movement: { currentMods: [] }
  },
  elans: [],
  modules: {
    WeaponModules: [],
    StyleModules: [],
    MysticalModules: [],
    PsychicModules: [],
    MartialArts: []
  },
  advantages: [],
  disadvantages: [],
  contacts: [],
  xp: { current: 0 },
  armor: {},
  core: {
    lifePoints: {
      current: 0,
      bonus: 0,
      classMultiple: 0,
      regeneration: {
        bonus: 0
      }
    },
    psychicPoints: {
      current: 0
    },
    fatigue: {
      current: 0
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
  movement: {
    base: 0,
    bonus: 0
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
        Acrobatics: { base: 0, bonus: 0, naturalBonuses: 0 },
        Athleticism: { base: 0, bonus: 0, naturalBonuses: 0 },
        Climb: { base: 0, bonus: 0, naturalBonuses: 0 },
        Jump: { base: 0, bonus: 0, naturalBonuses: 0 },
        Ride: { base: 0, bonus: 0, naturalBonuses: 0 },
        Swim: { base: 0, bonus: 0, naturalBonuses: 0 }
      },
      Vigor: {
        Composure: { base: 0, bonus: 0, naturalBonuses: 0 },
        FeatsOfStrength: { base: 0, bonus: 0, naturalBonuses: 0 },
        WithstandPain: { base: 0, bonus: 0, naturalBonuses: 0 }
      },
      Perception: {
        Notice: { base: 0, bonus: 0, naturalBonuses: 0 },
        Search: { base: 0, bonus: 0, naturalBonuses: 0 },
        Track: { base: 0, bonus: 0, naturalBonuses: 0 }
      },
      Intellectual: {
        Animals: { base: 0, bonus: 0, naturalBonuses: 0 },
        Appraisal: { base: 0, bonus: 0, naturalBonuses: 0 },
        HerbalLore: { base: 0, bonus: 0, naturalBonuses: 0 },
        History: { base: 0, bonus: 0, naturalBonuses: 0 },
        MagicAppraisal: { base: 0, bonus: 0, naturalBonuses: 0 },
        Medicine: { base: 0, bonus: 0, naturalBonuses: 0 },
        Memorize: { base: 0, bonus: 0, naturalBonuses: 0 },
        Navigation: { base: 0, bonus: 0, naturalBonuses: 0 },
        Occult: { base: 0, bonus: 0, naturalBonuses: 0 },
        Sciences: { base: 0, bonus: 0, naturalBonuses: 0 }
      },
      Social: {
        Intimidate: { base: 0, bonus: 0, naturalBonuses: 0 },
        Leadership: { base: 0, bonus: 0, naturalBonuses: 0 },
        Persuasion: { base: 0, bonus: 0, naturalBonuses: 0 },
        Style: { base: 0, bonus: 0, naturalBonuses: 0 }
      },
      Subterfuge: {
        Disguise: { base: 0, bonus: 0, naturalBonuses: 0 },
        Hide: { base: 0, bonus: 0, naturalBonuses: 0 },
        LockPicking: { base: 0, bonus: 0, naturalBonuses: 0 },
        Poisons: { base: 0, bonus: 0, naturalBonuses: 0 },
        Theft: { base: 0, bonus: 0, naturalBonuses: 0 },
        TrapLore: { base: 0, bonus: 0, naturalBonuses: 0 },
        Stealth: { base: 0, bonus: 0, naturalBonuses: 0 }
      },
      Creative: {
        Art: { base: 0, bonus: 0, naturalBonuses: 0 },
        Dance: { base: 0, bonus: 0, naturalBonuses: 0 },
        Forging: { base: 0, bonus: 0, naturalBonuses: 0 },
        Music: { base: 0, bonus: 0, naturalBonuses: 0 },
        SleightOfHand: { base: 0, bonus: 0, naturalBonuses: 0 }
      }
    },
    primary: {
      abilityLimits: {
        Combat: { percent: 0, final: 0, current: 0 },
        Psychic: { percent: 0, final: 0, current: 0 },
        Supernatural: { percent: 0, final: 0, current: 0 }
      },
      Combat: {
        Attack: { base: 0, bonus: 0, focus: false },
        Block: { base: 0, bonus: 0, focus: false },
        Dodge: { base: 0, bonus: 0, focus: false },
        WearArmor: { base: 0, bonus: 0 },
        Ki: { base: 0, current: 0 },
        KiAccumulation: { base: 0, current: 0 }
      },
      Psychic: {
        PsychicProjection: { base: 0, bonus: 0 },
        PsychicPoints: { base: 0, current: 0 }
      },
      Supernatural: {
        MagicProjection: { base: 0, bonus: 0 },
        Summon: { base: 0, bonus: 0 },
        Control: { base: 0, bonus: 0 },
        Bind: { base: 0, bonus: 0 },
        Banish: { base: 0, bonus: 0 },
        MagicAccumulation: { base: 0, cost: 0, special: 0 },
        MAMultiples: { base: 1, cost: 0, special: 0 },
        Zeon: { base: 0, current: 0 }
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
  combat: { maxActions: 0 },
  languages: [{ name: "Base", level: 0 }],
  presence: { bonus: 0 },
  currency: { copper: 0, silver: 0, gold: 0 },
  lockUi: false,
  items: { weapons: [], commonGoods: [], armor: [], ammo: [] }
};
