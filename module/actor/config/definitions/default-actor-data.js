export const DEFAULT_ACTOR_DATA = {
  classes: [],
  level: 0,
  core: {
    lifePoints: {
      current: 0,
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
      description:
        "Zeon pool and recovery, matching the official sheet’s Daily Zeon and Final Regeneration."
    },
    psychicPoints: {
      perLevel: 0, // class PP per level
      interval: 0, // class interval: +1 PP every X levels
      bonus: 0, // advantages, items, supernatural bonuses
      purchased: 0, // DP‑bought PP (if you allow it)
      total: 0, // derived maximum PP
      current: 0, // session tracking
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
  destinyPoints: {
    current: 0,
    special: 0,
    bonus: 0,
    spent: 0,
    remaining: 0,
    final: 0,
    update: false
  },
  developmentPointsSpent: [],
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

          armorPenalty: true,
          description:
            "Acrobatics helps a character perform physical tasks that require balance, coordination, and mobility, such as tumbling or walking a tightrope. It is also used to enable one to fall from heights without injury. A character who falls can make an Acrobatics Ability Check to try and land without breaking bones, as explained in Chapter 14. Characters wearing armor suffer a penalty to this Secondary Ability."
        },
        Athletics: {
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

          armorPenalty: true,
          description:
            "This indicates a person’s capability to push themselves to their physical limits, skillfully perform a variety of athletic feats in extreme conditions, and to distribute their energies in order to endure more without flagging. Characters wearing armor suffer a penalty to this Secondary Ability."
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

          armorPenalty: true,
          description:
            "This Secondary Ability is used to climb up or down any kind of vertical surface, such as walls or trees. If used with appropriate climbing equipment, the character can apply a bonus of up to +40 to his Ability Check. Normally, the rate at which a person can climb is one-quarter that of his Movement Value. However, a character’s climb rate can be one point higher for each level of Difficulty achieved above the requirement for the check (see Movement Value in Chapter 6). Characters wearing armor suffer a penalty to this Secondary Ability."
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

          armorPenalty: true,
          description:
            "This Secondary Ability permits the character to jump vertically or horizontally. The higher the level of Difficulty achieved, the further the character can jump, as indicated by his Movement Value (see Chapter 6). Characters wearing armor suffer a penalty to this Secondary Ability."
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

          armorPenalty: false,
          description:
            "This measures the ability of a person to ride animals. Almost everyone in the world of Anima can ride a tame and obedient horse under normal conditions;" +
            " in such cases, Ride checks aren’t usually necessary. Things get more complicated when a rider wishes to go very fast or when he takes his mount into rough terrain. " +
            " This ability also permits the character to bend his mount’s will to his own in problematic situations – obligating it to jump obstacles or continue traveling in spite of fatigue. It also enables the character to perform acrobatic actions from the saddle – such as hiding his body behind the mount while riding or picking up objects from the ground without dismounting. " +
            " Although traditionally employed in relation to horses, this Secondary Ability also enables a character to ride other animals, such as camels or elephants."
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

          armorPenalty: true,
          description:
            "This represents how well a person handles themselves in the water, and, at higher levels, the speed with which they can swim or dive in water. Characters wearing armor suffer a penalty to this Secondary Ability, but unlike other penalties, this one cannot be overcome by the Wear Armor ability."
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
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

          armorPenalty: false,
          description: ""
        }
      }
    },
    Primaries: {
      Combat: {
        dpLimitPercent: 0,
        Attack: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
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
          description:
            "This represents a character’s defensive ability – namely, how well he can deflect or stop attacks from hitting him. This ability depends on Dexterity.",
          mastery: false
        },
        Dodge: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Agility",
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
          description:
            "This represents character’s ability to wear heavy armor a without penalty or restrictions. This ability depends on Strength."
        }
      },
      Psychic: {
        dpLimitPercent: 0,
        PsychicProjection: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
          special: 0,
          characteristic: "Dexterity",
          description:
            "This represents a character’s capacity to project his mental powers at a target. This ability depends upon a character’s Dexterity score."
        }
      },
      Supernatural: {
        dpLimitPercent: 0,
        MagicAccumulation: {
          base: 0,
          bonus: 0,
          cost: 0,
          class: 0,
          final: 0,
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
  currency: { copper: 0, silver: 0, gold: 0 }
};
