export const DEFAULT_ACTOR_DATA = {
  classes: [],
  level: 0,
  core: {
    lifePoints: {
      current: 0,
      classMultiple: 0,
      classMultipleCost: 0,
      bonus: 0,
      class: 0,
      final: 0,
      regeneration: {
        regenLevel: 0,
        bonus: 0,
        lifePointsPerDayResting: 0,
        lifePointsPerDayNotResting: 0,
        woundPenaltyReduc: "",
        specialCapabilities: "",
        damageResistance: false
      }
    },
    ki: {
      str: { accumulation: 0, max: 0, current: 0 },
      agi: { accumulation: 0, max: 0, current: 0 },
      dex: { accumulation: 0, max: 0, current: 0 },
      con: { accumulation: 0, max: 0, current: 0 },
      wp: { accumulation: 0, max: 0, current: 0 },
      pow: { accumulation: 0, max: 0, current: 0 },

      derived: 0,
      purchased: 0,
      total: 0,

      costKi: 0,
      costAccumulation: 0,

      description: "Ki Points and Accumulation per characteristic, matching the official sheet."
    },
    zeon: {
      base: 0,
      purchased: 0,
      total: 0,
      current: 0,
      regeneration: 0,
      cost: 0,
      class: 0,
      description:
        "Zeon pool and recovery, matching the official sheet’s Daily Zeon and Final Regeneration."
    },
    psychicPoints: {
      perLevel: 0,
      interval: 0,
      bonus: 0,
      purchased: 0,
      total: 0,
      current: 0,
      cost: 0,
      description:
        "Psychic Points represent a character’s mental energy for developing and using psychic powers."
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
    size: { bonus: 0, special: 0, final: 0 },
    appearance: 0
  },
  fatigue: { current: 0, special: 0, final: 0, actionPenalty: 0 },
  movement: { base: 0, penalty: 0, bonus: 0, final: 0, movePerTurn: 0 },
  initiative: {
    bonus: 0,
    class: 0,
    final: 0,
    armorPenalty: 0,
    weaponPenalty: 0,
    special: 0
  },
  titles: [],
  developmentPoints: {
    current: 0,
    special: 0,
    bonus: 0,
    spent: 0,
    remaining: 0,
    final: 0,
    spentRecords: []
  },
  martialKnowledge: {
    bonus: 0,
    class: 0,
    final: 0
  },
  finalArmor: {
    body: {
      cut: 0,
      imp: 0,
      thr: 0,
      hea: 0,
      ele: 0,
      col: 0,
      ene: 0
    },
    head: {
      cut: 0,
      imp: 0,
      thr: 0,
      hea: 0,
      ele: 0,
      col: 0,
      ene: 0
    },
    total: {
      cut: 0,
      imp: 0,
      thr: 0,
      hea: 0,
      ele: 0,
      col: 0,
      ene: 0
    }
  },
  elans: [],
  xp: { current: 0, next: 1 },

  characteristics: {
    Agility: { base: 1, final: -30, bonus: 0, class: 0 },
    Constitution: { base: 1, final: -30, bonus: 0, class: 0 },
    Dexterity: { base: 1, final: -30, bonus: 0, class: 0 },
    Strength: { base: 1, final: -30, bonus: 0, class: 0 },
    Intelligence: { base: 1, final: -30, bonus: 0, class: 0 },
    Perception: { base: 1, final: -30, bonus: 0, class: 0 },
    Power: { base: 1, final: -30, bonus: 0, class: 0 },
    Willpower: { base: 1, final: -30, bonus: 0, class: 0 }
  },

  abilities: {
    Secondaries: {
      totalDPSpent: 0,
      Athletics: {
        Acrobatics: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: true
        },
        Athleticism: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: true
        },
        Climb: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: true
        },
        Jump: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Strength",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: true
        },
        Ride: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        Swim: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: true
        }
      },

      Vigor: {
        Composure: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Willpower",
          knowledge: false,
          passive: true,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        FeatsOfStrength: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Strength",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: true
        },
        WithstandPain: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Willpower",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        }
      },

      Perception: {
        Notice: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Perception",
          knowledge: false,
          passive: true,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        Search: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Perception",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        Track: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Perception",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        }
      },

      Intellectual: {
        Animals: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        Appraisal: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        HerbalLore: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,
          armorPenalty: false
        },
        History: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        MagicAppraisal: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          knowledge: true,
          passive: true,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Medicine: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Memorize: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Navigation: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Occult: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Sciences: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        }
      },

      Social: {
        Intimidate: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Willpower",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Leadership: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          knowledge: false,
          passive: true,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Persuasion: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Style: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          knowledge: false,
          passive: true,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        }
      },

      Subterfuge: {
        Disguise: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Hide: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Perception",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: true
        },
        LockPicking: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Poisons: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Intelligence",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Theft: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        TrapLore: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Perception",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Stealth: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: true
        }
      },

      Creative: {
        Art: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Dance: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Forging: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        Music: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          knowledge: true,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        },
        SleightOfHand: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          knowledge: false,
          passive: false,
          undeveloped: true,
          mastery: false,

          armorPenalty: false
        }
      }
    },
    Primaries: {
      abilityLimits: {
        Combat: { percent: 0, final: 0, current: 0 },
        Psychic: { percent: 0, final: 0, current: 0 },
        Supernatural: { percent: 0, final: 0, current: 0 }
      },
      totalDPSpent: 0,
      Combat: {
        Attack: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          mastery: false,
          focus: false,
          description:
            "This represents an individual’s ability to reach his opponent and get past his opponent’s guard to inflict damage. This ability depends on Dexterity."
        },
        Block: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          mastery: false,
          focus: false,
          description:
            "This represents a character’s defensive ability – namely, how well he can deflect or stop attacks from hitting him. This ability depends on Dexterity."
        },
        Dodge: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
          mastery: false,
          focus: false,
          description:
            "This represents a character’s ability to move out of the way of an attack. This ability depends upon the Agility Characteristic."
        },
        WearArmor: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Strength",
          mastery: false,
          description:
            "This represents character’s ability to wear heavy armor a without penalty or restrictions. This ability depends on Strength."
        }
      },
      Psychic: {
        PsychicProjection: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          mastery: false,
          description:
            "This represents a character’s capacity to project his mental powers at a target. This ability depends upon a character’s Dexterity score."
        }
      },
      Supernatural: {
        MAMultiple: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          mastery: false,
          description:
            "This ability represents a character’s ability to gather his Zeon to weave magic and cast spells."
        },
        MagicProjection: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          mastery: false,
          description:
            "This represents a character’s ability to project spells and aim them at a desired target. This ability depends upon a character’s Dexterity score."
        },
        Summon: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          mastery: false,
          description:
            "This represents a character’s capacity to bring supernatural creatures into the world. This ability depends upon a character’s Power score."
        },
        Control: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Willpower",
          mastery: false,
          description:
            "This represents a character’s capacity to control supernatural beings. Control depends upon a character’s Willpower score."
        },
        Bind: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          mastery: false,
          description:
            "This represents a character’s capacity to trap the essence of mystical beings inside objects or persons. Bind depends upon a character’s Power score."
        },
        Banish: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Power",
          mastery: false,
          description:
            "This represents a character’s ability to expel supernatural beings from this plane of reality. It depends upon a character’s Power score."
        }
      }
    }
  },
  WeaponModules: [],
  MartialArts: [],
  PsychicModules: [],
  resistances: {
    Physical: { characteristic: "Constitution", bonus: 0, final: 0 },
    Disease: { characteristic: "Constitution", bonus: 0, final: 0 },
    Venom: { characteristic: "Constitution", bonus: 0, final: 0 },
    Magic: { characteristic: "Power", bonus: 0, final: 0 },
    Psychic: { characteristic: "Willpower", bonus: 0, final: 0 }
  },
  advantages: [],
  disadvantages: [],
  background: "",
  languages: [{ name: "Base", level: 0 }],
  contacts: [],
  presence: { bonus: 0, final: 0 },
  notes: "",
  currency: { copper: 0, silver: 0, gold: 0 },
  globalModifier: {
    physical: {
      special: 0,
      final: 0
    },
    actions: {
      special: 0,
      final: 0
    },
    natural: {
      special: 0,
      final: 0
    },
    perception: {
      special: 0,
      final: 0
    }
  },
  lockUi: false
};
