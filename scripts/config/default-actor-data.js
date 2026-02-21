export const DEFAULT_ACTOR_DATA = {
  classes: [],
  globalModifiers: {
    Physical: { currentMods: [] },
    Action: { currentMods: [] },
    Natural: { currentMods: [], movement: 0 },
    Perception: { currentMods: [] }
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
        Acrobatics: { base: 0, bonus: 0, naturalBonuses: [] },
        Athleticism: { base: 0, bonus: 0, naturalBonuses: [] },
        Climb: { base: 0, bonus: 0, naturalBonuses: [] },
        Jump: { base: 0, bonus: 0, naturalBonuses: [] },
        Ride: { base: 0, bonus: 0, naturalBonuses: [] },
        Swim: { base: 0, bonus: 0, naturalBonuses: [] }
      },
      Vigor: {
        Composure: { base: 0, bonus: 0, naturalBonuses: [] },
        FeatsOfStrength: { base: 0, bonus: 0, naturalBonuses: [] },
        WithstandPain: { base: 0, bonus: 0, naturalBonuses: [] }
      },
      Perception: {
        Notice: { base: 0, bonus: 0, naturalBonuses: [] },
        Search: { base: 0, bonus: 0, naturalBonuses: [] },
        Track: { base: 0, bonus: 0, naturalBonuses: [] }
      },
      Intellectual: {
        Animals: { base: 0, bonus: 0, naturalBonuses: [] },
        Appraisal: { base: 0, bonus: 0, naturalBonuses: [] },
        HerbalLore: { base: 0, bonus: 0, naturalBonuses: [] },
        History: { base: 0, bonus: 0, naturalBonuses: [] },
        MagicAppraisal: { base: 0, bonus: 0, naturalBonuses: [] },
        Medicine: { base: 0, bonus: 0, naturalBonuses: [] },
        Memorize: { base: 0, bonus: 0, naturalBonuses: [] },
        Navigation: { base: 0, bonus: 0, naturalBonuses: [] },
        Occult: { base: 0, bonus: 0, naturalBonuses: [] },
        Sciences: { base: 0, bonus: 0, naturalBonuses: [] }
      },
      Social: {
        Intimidate: { base: 0, bonus: 0, naturalBonuses: [] },
        Leadership: { base: 0, bonus: 0, naturalBonuses: [] },
        Persuasion: { base: 0, bonus: 0, naturalBonuses: [] },
        Style: { base: 0, bonus: 0, naturalBonuses: [] }
      },
      Subterfuge: {
        Disguise: { base: 0, bonus: 0, naturalBonuses: [] },
        Hide: { base: 0, bonus: 0, naturalBonuses: [] },
        LockPicking: { base: 0, bonus: 0, naturalBonuses: [] },
        Poisons: { base: 0, bonus: 0, naturalBonuses: [] },
        Theft: { base: 0, bonus: 0, naturalBonuses: [] },
        TrapLore: { base: 0, bonus: 0, naturalBonuses: [] },
        Stealth: { base: 0, bonus: 0, naturalBonuses: [] }
      },
      Creative: {
        Art: { base: 0, bonus: 0, naturalBonuses: [] },
        Dance: { base: 0, bonus: 0, naturalBonuses: [] },
        Forging: { base: 0, bonus: 0, naturalBonuses: [] },
        Music: { base: 0, bonus: 0, naturalBonuses: [] },
        SleightOfHand: { base: 0, bonus: 0, naturalBonuses: [] }
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
