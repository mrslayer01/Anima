export function createKiAbility(abilInput) {
  const { name = "", requirements = "", mkCost = 0, description = "" } = abilInput;

  return {
    name,
    requirements,
    mkCost,
    description
  };
}

export function createKiEffect(effectInput) {
  const {
    name = "",
    type = "",
    maintained = false,
    description = "",
    effects = [],
    purchasedEffects = [],
    primaryChar = "",
    secondaryChars = [],
    relatedElements = [],
    optionalAdvantages = [],
    purchasedAdvantages = [],
    optionalDisadvantages = [],
    purchasedDisadvantages = []
  } = effectInput;

  return {
    name,
    type,
    maintained,
    description,
    effects,
    purchasedEffects,
    primaryChar,
    secondaryChars,
    relatedElements,
    optionalAdvantages,
    purchasedAdvantages,
    optionalDisadvantages,
    purchasedDisadvantages
  };
}

export const ABF_KI_ABILITIES = {
  useOfKi: createKiAbility({
    name: "Use Of Ki",
    requirements: "None",
    mkCost: 40,
    description:
      "This is the foundational Ki Ability upon which all others are based. It allows a character to awaken his inner energy and use it subconsciously."
  }),

  kiControl: createKiAbility({
    name: "Ki Control",
    requirements: "Use of Ki",
    mkCost: 30,
    description:
      "This ability allows total control of inner energy. A character with this ability is fully aware of his supernatural power and can Accumulate Ki. Once acquired, Ki Control allows characters to learn Dominion Techniques.\nRequirements:�Use of Ki\nMartial�Knowledge:�30"
  }),

  kiDetection: createKiAbility({
    name: "Ki Detection",
    requirements: "Ki Control",
    mkCost: 20,
    description:
      "This ability allows a character to detect a being’s energy. Thus, a character with this ability is aware of any source of energy present in an area, but he cannot determine its form, size, or intensity. Ki Detection effortlessly overcomes obstacles such as solid objects and closed spaces, but it can not penetrate sealed energy fields. The GM should treat this power as a special Secondary Ability and can calculate its score by averaging the character’s total MK and his Notice score. To learn about the extent of its reach, see Box VIII.\nRequirements:�Ki Control\nMartial�Knowledge: 20\nCelia has 120 MK and a Notice score of 60. To calculate Celia’s Ki Detection, add up both numbers and divide them by two, which should give a Final Ability score of 90."
  }),

  erudition: createKiAbility({
    name: "Erudition",
    requirements: "Ki Detection",
    mkCost: 10,
    description:
      "Erudition allows characters to determine the strength and form of any energy perceived. The use of this ability makes it possible to tell if someone is Accumulating Ki or if an opponent is particularly strong. It can also provide information as to a particular individual’s energy type when specifically sought. For instance, a character might find the exact cell in which his friends are captive without the need of opening the door.\nRequirements: Ki Detection\nMartial�Knowledge: 10"
  }),

  weightElimination: createKiAbility({
    name: "Weight Elimination",
    requirements: "Use of Ki",
    cost: 10,
    description:
      "Through control of energy, a character may affect his own body mass and partially ignore the effects of gravity. By using this ability, a character can temporarily perform actions otherwise virtually impossible – such as running up walls or even running on water. A character using this ability can run along any type of surface at his full Movement Value in a single turn.\nFor example, a character with a Movement Value of 70 feet per round who attempts to cross to the other side of a river using this ability will successfully cover the first 70 feet, but he will inevitably sink if the river stretches beyond that point. The effects of this ability may be extended by investing 1 generic Ki Point in every round.\nRequirements: Use of Ki\nMartial�Knowledge: 10"
  }),

  levitation: createKiAbility({
    name: "Levitation",
    requirements: "Weight Elimination",
    mkCost: 20,
    description:
      "This ability allows a character to glide through the air and move freely. Each Flight Value achieved costs a character 1 generic Ki point. A character using Levitation may only achieve a maximum Flight Value equal to one-quarter of his Movement Value, rounded up. To maintain this ability and remain levitating, the user must spend 1 extra Ki Point per minute.\nRequirements: Weight Elimination\nMartial�Knowledge: 20\nFor example, a character with an Agility of 8 can Levitate up to a Flight Value of 2 if he spends 2 Ki Points from any Characteristic. He will subsequently have to spend another Ki Point for every additional minute he wishes to remain in the air."
  }),

  objectMotion: createKiAbility({
    name: "Object Motion",
    requirements: "Levitation",
    mkCost: 10,
    description:
      "Armed with this ability, a character can project his energy, using it as an extension of his own body, to touch and move objects over a distance. An object so moved must be within sight of the character, or the character must have a very definite notion of its location. The use of this ability costs 1 Ki point per turn for every 10 pounds the object weighs.\nRequirements: Levitation\nMartial�Knowledge:�10"
  }),

  flight: createKiAbility({
    name: "Flight",
    requirements: "Levitation",
    mkCost: 20,
    description:
      "This ability provides a character with complete control of his body mass, enabling him to move in the air as freely as he would on the ground. This ability releases the Movement Value restriction present in Levitation, allowing for a Flight Value equivalent to that of a character’s Movement Value. A character must spend 1 generic Ki Point for every Flight Value achieved. Maintaining this ability costs 1 Ki Point per minute.\nRequirements:�Levitation\nMartial�Knowledge:�20"
  }),

  presenceExtrusion: createKiAbility({
    name: "Presence Extrusion",
    requirements: "Use of Ki",
    mkCost: 10,
    description:
      "This ability allows a character to create an invisible aura of Ki around himself. In this way, he can physically touch pure energy and intangible elements – such as fire, spectral beings, or even magic. In physical combat, a character using Presence Extrusion may injure beings normally only vulnerable to supernatural attacks, up to a value of twice his Presence. In other words, someone with a Presence of 50 could potentially damage a creature as if he used a mystical weapon of Presence value 100. This ability also allows characters to repel supernatural effects with the Block Ability or even slash a fireball in half.\nRequirements:�Use of Ki\nMartial�Knowledge: 10"
  }),

  energyArmor: createKiAbility({
    name: "Energy Armor",
    requirements: "Presence Extrusion",
    mkCost: 10,
    description:
      "This ability allows a character to use his aura as a spiritual shield against esoteric effects and pure energy based attacks. Energy Armor grants a natural AT of 2 against Energy. Even though this ability counts as a armor, a character does not suffer any penalties for using additional layers of protection.\nRequirements:�Presence Extrusion\nMartial�Knowledge:�10"
  }),

  auraExtension: createKiAbility({
    name: "Aura Extension",
    requirements: "Presence Extrusion",
    mkCost: 10,
    description:
      "This ability allows a character to extend his aura and convey energy to any hand-held device as if it were a natural extension of the individual. Aura Extension channels a character’s essence through a weapon, for example, making it more powerful and difficult to break. This ability also allows a character to extend the powers bestowed by Presence Extrusion to his weapon, granting it the possibility of damaging Energy as if it were a mystical device. These aura-powered weapons objects can also stop supernatural attacks and similar effects. Consequently, Aura Extension increases a weapon’s Base Damage by 10 points and adds 10 points to its Fortitude and 5 points to its Breakage. The latter ability may also be applied to armor. If two individuals engage in combat using weapons powered by this ability, the clash of their sharp edges will send out sparks visible to everyone.\nRequirements:�Presence Extrusion\nMartial�Knowledge: 10"
  }),

  destructionByKi: createKiAbility({
    name: "Destruction By Ki",
    requirements: "Presence Extrusion",
    mkCost: 20,
    description:
      "Using this ability, an individual may project his energy to destroy targets encountered in his path. Characters using this ability must touch or be in physical contact with the object they wish to destroy. Using this ability requires a character to spend 1 generic Ki Point, which forces a targeted body to pass a Physical Resistance Check against the base Presence of the character using this ability. When used against a living creature, Destruction By Ki causes damage equal to the target’s Resistance Failure Level. Unless inorganic objects pass their Resistance Check by 40 or more, they are immediately destroyed or decrease in quality by one degree. Each extra Ki Point that a character spends on the ability adds 5 points to a character’s Presence for purposes of the Resistance Check, up to a maximum of twice his Presence. A fighter may use his Attack Ability to attempt physical contact with the enemy. Since Destruction By Ki is regarded as an attack, it can not be maintained. A character must spend new Ki Points every turn he wishes to make this kind of attack.\nRequirements:�Presence Extrusion\nMartial�Knowledge:�20\nLemures, a level 5 character (presence 50), wishes to use this ability to destroy an enemy standing before him. He spends 1 Ki Point to set off the attack, which forces his opponent to pass an PhR of 50. However, Lemures uses 5 extra Ki Points to raise the difficulty of the Check by 25 (for a difficulty of 75). Fortunately, Lemures hits his adversary, who fails the Resistance Check by 35 points, thereby suffering 35 LP of damage."
  }),

  kiTransmission: createKiAbility({
    name: "Ki Transmission",
    requirements: "Use of Ki",
    mkCost: 10,
    description:
      "This ability allows a character to transmit or absorb Ki from another subject. When two individuals with this ability meet, they can exchange their points freely. Naturally, the Ki exchanged occurs between the same Characteristics from which they stem. The transmission index per round is equal to a character’s Accumulation.\nRequirements:�Use of Ki\nMartial�Knowledge:�10"
  }),

  kiHealing: createKiAbility({
    name: "Ki Healing",
    requirements: "Ki Transmission",
    mkCost: 10,
    description:
      "This ability allows a character to restore 2 Life Points to a wounded creature for every 1 generic Ki Point spent. A character with this ability can heal himself or any other individual with which he comes into contact. This ability can not restore health completely; it can only repair up to half the damage.\nRequirements:�Ki Transmission\nMartial�Knowledge:�10"
  }),

  useOfNecessaryEnergy: createKiAbility({
    name: "Use of Necessary Energy",
    requirements: "Use of Ki",
    mkCost: 10,
    description:
      "A character with this ability can control his energy in such a way that he employs only the required amount for each one of his actions. This allows him to run or carry out sustained efforts for days without suffering the effects of exhaustion. Use of Necessary Energy multiplies the amount of time a character can spend on physical labor, running, or performing heavy tasks without losing Fatigue points by a factor of 10. For example, a character using this ability and running at his maximum Movement Value would lose 1 Fatigue Point every 50 turns, not every 5 turns as the rules state for characters without this power.\nThis ability also makes it possible for characters to go beyond the normal limits of exertion by increasing the maximum number of Fatigue Points allowed per turn. Instead of 2 Fatigue points per round, this ability raises a character’s spending limit to 5, thus adding a +75 bonus to a single Action, or several bonuses of +15 to several at a time.\nRequirements:�Use of Ki\nMartial�Knowledge:�10"
  }),

  kiConcealment: createKiAbility({
    name: "Ki Concealment",
    requirements: "Use of Necessary Energy",
    mkCost: 10,
    description:
      "A character with this ability hides the traces of his energy, rendering it invisible to Ki Detection and Erudition. Technically, it creates a spiritual void that hinders tracking. Like Ki Detection, Ki Concealment is calculated as a Special Secondary Ability. Simply find the average between a character’s total MK and his Hide score. When someone with Ki Detection tries to locate a character using Ki Concealment, they must make an Opposed check – the hiding character’s Concealment score is deducted from the searching character’s Detection score. An individual Accumulating Ki while using this ability must subtract 10 from his Concealment score for every 1 Ki Point in use.\nKi Concealment also distorts energy information gathered with Erudition. By succeeding at an Opposed Check, individuals may send out false information to those using Erudition.\nFinally, this ability also grants certain advantages against supernatural detection. If a character using Ki Concealment is being tracked down by a spell or psychic ability, he can add half his Ki Concealment score to the Resistance Check he needs to pass in order to avoid detection.\nRequirements:�Use of Necessary Energy\nMartial�Knowledge: 10 MK"
  }),

  falseDeath: createKiAbility({
    name: "False Death",
    requirements: "Ki Concealment",
    mkCost: 10,
    description:
      "This ability enables a character to slip into a comatose state very much like death. Someone in this state can not move but will be aware of any event taking place around him. Anyone examining his body will conclude the subject is actually dead. The “corpse” possesses no breath, heartbeat, or energy. The only way to assess the character’s true condition is by passing a Medicine Check against an Impossible difficulty. Regaining control of the body after use of False Death takes a whole turn. During this time, the recovering character still can not move – though his body’s functions are returning to normal.\nRequirements:�Ki Concealment\nMartial�Knowledge: 10"
  }),

  eliminationOfNecessities: createKiAbility({
    name: "Elimination of Necessities",
    requirements: "Use of Necessary Energy",
    mkCost: 10,
    description:
      "A character with this ability has virtually eliminated his physical needs, requiring only one-tenth the food, water, and sleep of a normal person.\nRequirements:�Use of Necessary Energy\nCost:�10 MK"
  }),

  penaltyReduction: createKiAbility({
    name: "Penalty Reduction",
    requirements: "Use of Necessary Energy",
    mkCost: 20,
    description:
      "A character with this ability can reduce penalties applied to him from Fatigue or Criticals by half (rounding down). Penalty Reduction does not act upon penalties applied due to amputation or similar damage, nor penalties caused by magic or psychic powers.\nRequirements:�Use of Necessary Energy\nMartial�Knowledge:�20"
  }),

  recovery: createKiAbility({
    name: "Recovery",
    requirements: "Penalty Reduction",
    mkCost: 20,
    description:
      "This ability allows a character to use Ki to recover from physical exertion. Recovery allows a character to recover 1 Fatigue point for every 5 generic Ki Points spent. Only 1 point may be recovered per turn.\nRequirements:�Penalty Reduction\nMartial�Knowledge:�20"
  }),

  characteristicAugmentation: createKiAbility({
    name: "Characteristic Augmentation",
    requirements: "Use of Necessary Energy",
    mkCost: 20,
    description:
      "By using internal energy, individuals with this ability can increase their physical Characteristics up to three points higher than their original values. The number of Ki Points a character must spend equals the target number they want to reach in the particular Characteristic. Furthermore, the Ki points spent must come from the Characteristic the character wants to improve. In addition to the initial Ki investment, this ability costs 1 Ki point per turn to maintain.\nRequirements:�Use of Necessary Energy\nMartial�Knowledge: 20 MK\nCelia has an Agility score of 10. Using this ability, she can increase her Characteristic up to 13. To do this, however, she must spend 13 Ki Points (derived from Agility), and then spend one extra point per turn to maintain her augmented Agility."
  }),

  inhumanity: createKiAbility({
    name: "Inhumanity",
    requirements: "Use of Ki",
    mkCost: 30,
    description:
      "This ability allows a character to perform physical tasks otherwise impossible to human beings. Inhumanity allows its user to count any Inhuman-level results they achieve on the Difficulty Table and get the most out of the capabilities their Characteristics allow.\nRequirements:�Use of Ki\nMartial�Knowledge: 30"
  }),

  zen: createKiAbility({
    name: "Zen",
    requirements: "Inhumanity",
    mkCost: 50,
    description:
      "Zen is the state of ultimate perfection in body and soul. It works exactly like Inhumanity, except for the fact that it enables characters to reach Zen Difficulty in their Checks and Abilities.\nRequirements:�Inhumanity\nMartial�Knowledge:�50"
  })
};

export const ABF_KI_EFFECTS = {
  //#region Offensive Effects
  AttackAbility: createKiEffect({
    name: "Attack Ability",
    type: "Offensive",
    maintained: false,
    description:
      "This effect adds a bonus to the Attack Ability. Upon rolling the dice, a character adds the number under “Attack Bonus” to his roll.",
    effects: [
      { atkBonus: 10, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      { atkBonus: 25, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 5, kiMaint: 2, level: 1 },
      {
        atkBonus: 40,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 3,
        level: 1
      },
      {
        atkBonus: 50,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 4,
        level: 1
      },
      {
        atkBonus: 75,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 6,
        level: 1
      },
      {
        atkBonus: 90,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 8,
        level: 1
      },
      {
        atkBonus: 100,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 10,
        level: 1
      },
      {
        atkBonus: 125,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 35,
        kiMaint: 12,
        level: 2
      },
      {
        atkBonus: 150,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 14,
        level: 2
      },
      {
        atkBonus: 175,
        primaryKiCost: 26,
        secondaryKiCost: 32,
        mkCost: 45,
        kiMaint: 16,
        level: 3
      },
      {
        atkBonus: 200,
        primaryKiCost: 30,
        secondaryKiCost: 36,
        mkCost: 50,
        kiMaint: 18,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Strength", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Air" }, { element: "Fire" }, { element: "Darkness" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      },
      {
        name: "Reduced Damage",
        description:
          "This Disadvantage reduces or cancels Technique-derived damage. It can only be applied to offensive Techniques.",
        options: [
          { option: "No Damage", mkReduction: "-20" },
          { option: "Half Damage", mkReduction: "-10" }
        ]
      }
    ]
  }),

  CounterattackAbility: createKiEffect({
    name: "Counterattack Ability",
    type: "Offensive",
    maintained: false,
    description:
      "This effect adds a bonus to a character’s Attack Ability when counterattacking. These bonuses only apply after a successful defense that grants the possibility of a Counter-attack.",
    effects: [
      { atkBonus: 10, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { atkBonus: 25, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 2, level: 1 },
      {
        atkBonus: 40,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 3,
        level: 1
      },
      {
        atkBonus: 50,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 4,
        level: 1
      },
      {
        atkBonus: 75,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 15,
        kiMaint: 6,
        level: 1
      },
      {
        atkBonus: 90,
        primaryKiCost: 9,
        secondaryKiCost: 12,
        mkCost: 20,
        kiMaint: 8,
        level: 1
      },
      {
        atkBonus: 100,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 10,
        level: 1
      },
      {
        atkBonus: 125,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 12,
        level: 2
      },
      {
        atkBonus: 150,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 35,
        kiMaint: 14,
        level: 2
      },
      {
        atkBonus: 175,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 16,
        level: 3
      },
      {
        atkBonus: 200,
        primaryKiCost: 26,
        secondaryKiCost: 32,
        mkCost: 45,
        kiMaint: 18,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Strength", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Air" }, { element: "Water" }, { element: "Earth" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      },
      {
        name: "Reduced Damage",
        description:
          "This Disadvantage reduces or cancels Technique-derived damage. It can only be applied to offensive Techniques.",
        options: [
          { option: "No Damage", mkReduction: "-20" },
          { option: "Half Damage", mkReduction: "-10" }
        ]
      }
    ]
  }),
  //#endregion
  //#region Defensive Effects
  BlockAbility: createKiEffect({
    name: "Block Ability",
    type: "Defensive",
    maintained: false,
    description:
      "This effect adds a bonus to a character’s Block Ability when using the Technique. The player rolls the dice and adds the number under “Block Bonus” to his dice roll.",
    effects: [
      { blkBonus: 10, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      { blkBonus: 25, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 5, kiMaint: 1, level: 1 },
      {
        blkBonus: 40,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        blkBonus: 50,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        blkBonus: 75,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        blkBonus: 90,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 5,
        level: 1
      },
      {
        blkBonus: 100,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 8,
        level: 1
      },
      {
        blkBonus: 125,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 35,
        kiMaint: 10,
        level: 2
      },
      {
        blkBonus: 150,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 12,
        level: 2
      },
      {
        blkBonus: 175,
        primaryKiCost: 26,
        secondaryKiCost: 32,
        mkCost: 45,
        kiMaint: 14,
        level: 3
      },
      {
        blkBonus: 200,
        primaryKiCost: 30,
        secondaryKiCost: 36,
        mkCost: 50,
        kiMaint: 16,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Strength", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Water" }, { element: "Earth" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  LimitedBlockAbility: createKiEffect({
    name: "Limited Block Ability",
    type: "Defensive",
    maintained: false,
    description:
      "This effect adds a bonus to a character’s Block Ability, but it does not allow him to counterattack – even if the Result indicates that a counterattack can happen. Nothing prevents a character from attacking on his Initiative.",
    effects: [
      { blkBonus: 10, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { blkBonus: 25, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      {
        blkBonus: 40,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        blkBonus: 50,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        blkBonus: 75,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        blkBonus: 90,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        blkBonus: 100,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 25,
        kiMaint: 6,
        level: 1
      },
      {
        blkBonus: 125,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 30,
        kiMaint: 8,
        level: 2
      },
      {
        blkBonus: 150,
        primaryKiCost: 16,
        secondaryKiCost: 20,
        mkCost: 35,
        kiMaint: 10,
        level: 2
      },
      {
        blkBonus: 175,
        primaryKiCost: 20,
        secondaryKiCost: 24,
        mkCost: 40,
        kiMaint: 12,
        level: 3
      },
      {
        blkBonus: 200,
        primaryKiCost: 24,
        secondaryKiCost: 29,
        mkCost: 45,
        kiMaint: 14,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Strength", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Water" }, { element: "Earth" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  DodgeAbility: createKiEffect({
    name: "Dodge Ability",
    type: "Defensive",
    maintained: false,
    description:
      "This effect adds a bonus to a character’s Dodge ability. For example, a character with a 140 Dodge Ability performing this Technique with a +40 bonus will defend himself from one attack that turn by rolling the dice, adding 40 to that roll, and then adding that number to his Dodge Ability.",
    effects: [
      {
        dodgeBonus: 10,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        dodgeBonus: 25,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        dodgeBonus: 40,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        dodgeBonus: 50,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        dodgeBonus: 75,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        dodgeBonus: 90,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 5,
        level: 1
      },
      {
        dodgeBonus: 100,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 8,
        level: 1
      },
      {
        dodgeBonus: 125,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 35,
        kiMaint: 10,
        level: 2
      },
      {
        dodgeBonus: 150,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 12,
        level: 2
      },
      {
        dodgeBonus: 175,
        primaryKiCost: 26,
        secondaryKiCost: 32,
        mkCost: 45,
        kiMaint: 14,
        level: 3
      },
      {
        dodgeBonus: 200,
        primaryKiCost: 30,
        secondaryKiCost: 36,
        mkCost: 50,
        kiMaint: 16,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Agility",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Air" }, { element: "Water" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  LimitedDodgeAbility: createKiEffect({
    name: "Limited Dodge Ability",
    type: "Defensive",
    maintained: false,
    description:
      "This effect adds a bonus to a character’s Dodge Ability, but it does not allow him to counterattack – even if the Result indicates that a counterattack can happen.",
    effects: [
      {
        dodgeBonus: 10,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        dodgeBonus: 25,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        dodgeBonus: 40,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        dodgeBonus: 50,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        dodgeBonus: 75,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        dodgeBonus: 90,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        dodgeBonus: 100,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 25,
        kiMaint: 6,
        level: 1
      },
      {
        dodgeBonus: 125,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 30,
        kiMaint: 8,
        level: 2
      },
      {
        dodgeBonus: 150,
        primaryKiCost: 16,
        secondaryKiCost: 20,
        mkCost: 35,
        kiMaint: 10,
        level: 2
      },
      {
        dodgeBonus: 175,
        primaryKiCost: 20,
        secondaryKiCost: 24,
        mkCost: 40,
        kiMaint: 12,
        level: 3
      },
      {
        dodgeBonus: 200,
        primaryKiCost: 24,
        secondaryKiCost: 29,
        mkCost: 45,
        kiMaint: 14,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Agility",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Air" }, { element: "Darkness" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),
  //#endregion
  //#region Destructive Effects
  DamageMultiplier: createKiEffect({
    name: "Damage Multiplier",
    type: "Destructive",
    maintained: false,
    description:
      "This effect multiplies an attack’s final damage. For instance, a character attacking with a 60-point Final Damage sword will inflict 120 damage using a Technique that multiplies damage by two.",
    effects: [
      {
        multiplier: "x2",
        primaryKiCost: 10,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 4,
        level: 1
      },
      {
        multiplier: "x3",
        primaryKiCost: 15,
        secondaryKiCost: 20,
        mkCost: 40,
        kiMaint: 8,
        level: 2
      },
      {
        multiplier: "x4",
        primaryKiCost: 20,
        secondaryKiCost: 30,
        mkCost: 80,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 3 },
      { char: "Power", extraKiCost: 1 },
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Fire" }, { element: "Earth" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  DamageAugmentation: createKiEffect({
    name: "Damage Augmentation",
    type: "Destructive",
    maintained: false,
    description:
      "This effect increases the damage caused by an attack. This bonus is not added to the result shown in the Combat Table, but rather to the attack’s Base Damage. For example, a character who wields a weapon that deals 60 damage using a Technique supplying a +50 bonus would have a 110 Base Damage.",
    effects: [
      { dmgBonus: 10, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { dmgBonus: 25, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      {
        dmgBonus: 40,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        dmgBonus: 50,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 15,
        kiMaint: 2,
        level: 1
      },
      {
        dmgBonus: 75,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 3,
        level: 1
      },
      {
        dmgBonus: 90,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 4,
        level: 1
      },
      {
        dmgBonus: 100,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 5,
        level: 1
      },
      {
        dmgBonus: 125,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 35,
        kiMaint: 6,
        level: 2
      },
      {
        dmgBonus: 150,
        primaryKiCost: 16,
        secondaryKiCost: 20,
        mkCost: 40,
        kiMaint: 8,
        level: 2
      },
      {
        dmgBonus: 175,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 45,
        kiMaint: 10,
        level: 3
      },
      {
        dmgBonus: 200,
        primaryKiCost: 20,
        secondaryKiCost: 24,
        mkCost: 50,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 3 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 1 }
    ],
    relatedElements: [{ element: "Fire" }, { element: "Earth" }],
    optionalAdvantages: [
      {
        name: "Vital Sacrifice",
        description:
          "This Advantage allows a character to increase his attack’s Base Damage even more by means of a sacrifice added to the Technique – such as losing Life Points or Characteristics.",
        options: [
          { option: "Vital Sacrifice", additionalKiCost: 4, mkCost: 15, kiMaint: 3 },
          { option: "Double Vital Sacrifice", additionalKiCost: 10, mkCost: 50, kiMaint: 4 },
          { option: "Health Sacrifice", additionalKiCost: 2, mkCost: 10, kiMaint: 2 },
          { option: "Characteristic Sacrifice", additionalKiCost: 2, mkCost: 10, kiMaint: 2 }
        ]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),
  //#endregion
  //#region Action Effects
  AdditionalAttack: createKiEffect({
    name: "Additional Attack",
    type: "Action",
    maintained: false,
    description:
      "This effect permits a character to perform additional penalty-free attacks. For example, a character who gets one extra attack can perform two attacks in a single turn at full Ability. Any secondary effect of the technique applies to all of the attacks.",
    effects: [
      { attacks: 1, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 20, kiMaint: 3, level: 1 },
      {
        attacks: 2,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 30,
        kiMaint: 6,
        level: 1
      },
      {
        attacks: 3,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 40,
        kiMaint: 9,
        level: 1
      },
      {
        attacks: 4,
        primaryKiCost: 24,
        secondaryKiCost: 29,
        mkCost: 50,
        kiMaint: 12,
        level: 2
      },
      {
        attacks: 5,
        primaryKiCost: 30,
        secondaryKiCost: 36,
        mkCost: 60,
        kiMaint: 15,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 2 },
      { char: "Power", extraKiCost: 3 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 1 }
    ],
    relatedElements: [{ element: "Air" }, { element: "Water" }],
    optionalAdvantages: [
      {
        name: "Continuous Attack",
        description:
          "This Advantage allows a character to deliver all of his attacks uninterrupted. His opponent can not counterattack until all attacks are resolved.",
        options: [{ option: "Continuous Attack", additionalKiCost: 10, mkCost: 30, kiMaint: 5 }]
      },
      {
        name: "Added Fatigue Bonus",
        description:
          "This Advantage allows a character to add any bonus he receives from using Fatigue Points to all the attacks he performs with this Technique.",
        options: [{ option: "Added Fatigue Bonus", additionalKiCost: 8, mkCost: 30, kiMaint: 2 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  LimitedAdditionalAttack: createKiEffect({
    name: "Limited Additional Attack",
    type: "Action",
    maintained: false,
    description:
      "Characters may use this ability to perform penalty-free additional attacks. However, additional effects from this Technique only apply to one attack and not the additional ones.",
    effects: [
      { attacks: 1, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 5, kiMaint: 1, level: 1 },
      { attacks: 2, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 10, kiMaint: 2, level: 1 },
      { attacks: 3, primaryKiCost: 9, secondaryKiCost: 12, mkCost: 15, kiMaint: 3, level: 1 },
      {
        attacks: 4,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        attacks: 5,
        primaryKiCost: 15,
        secondaryKiCost: 19,
        mkCost: 30,
        kiMaint: 6,
        level: 1
      },
      {
        attacks: 6,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 40,
        kiMaint: 8,
        level: 2
      },
      {
        attacks: 8,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 50,
        kiMaint: 10,
        level: 2
      },
      {
        attacks: 10,
        primaryKiCost: 26,
        secondaryKiCost: 32,
        mkCost: 60,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 2 },
      { char: "Power", extraKiCost: 3 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 1 }
    ],
    relatedElements: [{ element: "Air" }, { element: "Water" }, { element: "Darkness" }],
    optionalAdvantages: [
      {
        name: "Continuous Attack",
        description:
          "This works identically to the Continuous Attack Advantage described under the Additional Attack effect above.",
        options: [{ option: "Continuous Attack", additionalKiCost: 10, mkCost: 30, kiMaint: 5 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  AdditionalDefense: createKiEffect({
    name: "Additional Defense",
    type: "Action",
    maintained: false,
    description:
      "This effect enables a character to make multiple penalty-free Block and Dodge attempts during a single turn.",
    effects: [
      { defenses: 1, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { defenses: 2, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 2, level: 1 },
      { defenses: 3, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 10, kiMaint: 3, level: 1 },
      { defenses: 4, primaryKiCost: 4, secondaryKiCost: 6, mkCost: 15, kiMaint: 4, level: 1 },
      { defenses: 6, primaryKiCost: 5, secondaryKiCost: 8, mkCost: 20, kiMaint: 6, level: 1 },
      { defenses: 8, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 25, kiMaint: 8, level: 1 },
      {
        defenses: 10,
        primaryKiCost: 7,
        secondaryKiCost: 10,
        mkCost: 30,
        kiMaint: 10,
        level: 2
      },
      {
        defenses: "Unlimited",
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 35,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Agility",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 1 },
      { char: "Power", extraKiCost: 3 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 1 }
    ],
    relatedElements: [{ element: "Light" }],
    optionalAdvantages: [
      {
        name: "Added Fatigue Bonus",
        description:
          "This Advantage allows a character to add any bonus he receives from using Fatigue Points to all defenses he performs with this Technique.",
        options: [{ option: "Added Fatigue Bonus", additionalKiCost: 6, mkCost: 20, kiMaint: 2 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  AdditionalAction: createKiEffect({
    name: "Additional Action",
    type: "Action",
    maintained: false,
    description:
      "This effect allows a character to perform several Active Actions in a single turn without applying penalties.",
    effects: [
      { actions: 1, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { actions: 2, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 2, level: 1 },
      { actions: 3, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 10, kiMaint: 3, level: 1 },
      { actions: 4, primaryKiCost: 4, secondaryKiCost: 6, mkCost: 15, kiMaint: 4, level: 1 },
      { actions: 5, primaryKiCost: 5, secondaryKiCost: 8, mkCost: 20, kiMaint: 6, level: 1 },
      { actions: 6, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 25, kiMaint: 8, level: 1 },
      {
        actions: 8,
        primaryKiCost: 7,
        secondaryKiCost: 10,
        mkCost: 30,
        kiMaint: 10,
        level: 2
      },
      {
        actions: 10,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 35,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 1 },
      { char: "Power", extraKiCost: 3 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 1 }
    ],
    relatedElements: [{ element: "Air" }],
    optionalAdvantages: [
      {
        name: "Added Fatigue Bonus",
        description:
          "This Advantage functions in the same way as Added Fatigue Bonus does under Additional Attacks and Additional Defenses.",
        options: [{ option: "Added Fatigue Bonus", additionalKiCost: 6, mkCost: 20, kiMaint: 1 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),
  //#endregion
  //#region Reaction Effects
  InitiativeAugmentation: createKiEffect({
    name: "Initiative Augmentation",
    type: "Reaction",
    maintained: false,
    description:
      "This effect increases a character’s Initiative for the turn. Simply add the amount under “Bonus to Initiative” to his Initiative rolls. This must be declared before calculating Initiative for that turn.",
    effects: [
      {
        initBonus: 25,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        initBonus: 50,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        initBonus: 75,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 15,
        kiMaint: 2,
        level: 1
      },
      {
        initBonus: 100,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 3,
        level: 1
      },
      {
        initBonus: 125,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 4,
        level: 2
      },
      {
        initBonus: 150,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 5,
        level: 2
      },
      {
        initBonus: 175,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 35,
        kiMaint: 6,
        level: 3
      },
      {
        initBonus: 200,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 40,
        kiMaint: 7,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Agility",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 1 },
      { char: "Power", extraKiCost: 3 },
      { char: "Willpower", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Air" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),
  //#endregion
  //#region Esoteric Effects
  States: createKiEffect({
    name: "States",
    type: "Esoteric",
    maintained: false,
    description:
      "This ability links some form of supernatural effect to a character’s offensive Technique. When receiving damage from this type of attack, however small it may be, a character must pass a Physical Resistance (PhR) Check. If the character fails the check, he suffers an esoteric effect, and the consequences of the attack automatically activate at the end of the turn.\nThe following table shows the Resistance Check difficulty of the effect. A player must choose the state to which an opponent will be subjected from the Added State Optional Advantage.",
    effects: [
      {
        phrDifficulty: 40,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        phrDifficulty: 60,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        phrDifficulty: 80,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        phrDifficulty: 100,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        phrDifficulty: 120,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        phrDifficulty: 140,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 5,
        level: 2
      },
      {
        phrDifficulty: 180,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 6,
        level: 2
      },
      {
        phrDifficulty: 200,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 50,
        kiMaint: 8,
        level: 3
      },
      {
        phrDifficulty: 240,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 80,
        kiMaint: 10,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Strength", extraKiCost: 4 },
      { char: "Dexterity", extraKiCost: 4 },
      { char: "Constitution", extraKiCost: 4 }
    ],
    relatedElements: [{ element: "Darkness" }, { element: "Light" }],
    optionalAdvantages: [
      {
        name: "Added State",
        description:
          "There is no limit to the number of states that a player can add. Each forces an opponent to make a separate PhR Check. However, each additional state raises the Advantage’s Ki cost by 2 points.",
        options: [
          { option: "Action Penalty", additionalKiCost: 2, mkCost: 5, level: 1 },
          { option: "PhR Reduction", additionalKiCost: 2, mkCost: 10, level: 1 },
          { option: "Blindness", additionalKiCost: 5, mkCost: 15, level: 1 },
          { option: "Characteristic Reduction", additionalKiCost: 2, mkCost: 10, level: 1 },
          { option: "Partial Paralysis", additionalKiCost: 6, mkCost: 10, level: 1 },
          { option: "Damage", additionalKiCost: 5, mkCost: 10, level: 1 },
          { option: "Unconsciousness", additionalKiCost: 8, mkCost: 15, level: 1 },
          { option: "Comma", additionalKiCost: 10, mkCost: 30, level: 2 },
          { option: "Total Paralysis", additionalKiCost: 8, mkCost: 20, level: 2 },
          { option: "Life Drain", additionalKiCost: 8, mkCost: 15, level: 2 },
          { option: "Control", additionalKiCost: 10, mkCost: 40, level: 3 },
          { option: "Death", additionalKiCost: 12, mkCost: 50, level: 3 }
        ]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki in order to use it.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),
  //#endregion
  //#region Special Effects
  CombatManeuversAndAiming: createKiEffect({
    name: "Combat Maneuvers and Aiming",
    type: "Special",
    maintained: false,
    description:
      "This effect allows a character to perform aimed attacks and other combat actions, such as Disarm, while decreasing the penalty for the maneuver. The penalty reduction value appears in the first column.",
    effects: [
      {
        precisionPenalty: -10,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        precisionPenalty: -25,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        precisionPenalty: -50,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        precisionPenalty: -75,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 2
      },
      {
        precisionPenalty: -100,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 15,
        kiMaint: 3,
        level: 2
      },
      {
        precisionPenalty: -120,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 3,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Dexterity",
    secondaryChars: [
      { char: "Agility", extraKiCost: 1 },
      { char: "Power", extraKiCost: 2 },
      { char: "Willpower", extraKiCost: 2 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Air" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  ArmorIncrease: createKiEffect({
    name: "Armor Increase",
    type: "Special",
    maintained: false,
    description:
      "This effect allows a character to increase his Armor Type for a complete turn. It may be combined with any other armor as an additional layer, but it does not bring additional penalties to Initiative. This effect works against all kinds of attack.",
    effects: [
      { atBonus: 1, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { atBonus: 2, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      { atBonus: 3, primaryKiCost: 4, secondaryKiCost: 6, mkCost: 10, kiMaint: 2, level: 1 },
      { atBonus: 4, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 15, kiMaint: 2, level: 1 },
      { atBonus: 5, primaryKiCost: 8, secondaryKiCost: 11, mkCost: 20, kiMaint: 3, level: 2 },
      {
        atBonus: 6,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 25,
        kiMaint: 3,
        level: 2
      },
      {
        atBonus: 7,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 30,
        kiMaint: 4,
        level: 2
      },
      {
        atBonus: 8,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 40,
        kiMaint: 5,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Constitution",
    secondaryChars: [
      { char: "Power", extraKiCost: 1 },
      { char: "Willpower", extraKiCost: 2 },
      { char: "Strength", extraKiCost: 2 },
      { char: "Agility", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Earth" }, { element: "Water" }, { element: "Light" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  ArmorDestruction: createKiEffect({
    name: "Armor Destruction",
    type: "Special",
    maintained: false,
    description:
      "This effect lowers the targeted victim’s Armor Type. The number by which the victim’s AT is reduced appears under the “Reduction” column.",
    effects: [
      {
        atReduction: -1,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        atReduction: -2,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        atReduction: -3,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        atReduction: -4,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        atReduction: -5,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 3,
        level: 2
      },
      {
        atReduction: -6,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 3,
        level: 2
      },
      {
        atReduction: -7,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 4,
        level: 2
      },
      {
        atReduction: -8,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 5,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Power", extraKiCost: 1 },
      { char: "Willpower", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Darkness" }, { element: "Fire" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  BreakageAugmentation: createKiEffect({
    name: "Breakage Augmentation",
    type: "Special",
    maintained: false,
    description: "This effect increases the Breakage value of a character’s weapon.",
    effects: [
      {
        breakageBonus: 5,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        breakageBonus: 10,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        breakageBonus: 15,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 15,
        kiMaint: 2,
        level: 1
      },
      {
        breakageBonus: 20,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 3,
        level: 1
      },
      {
        breakageBonus: 25,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 4,
        level: 2
      },
      {
        breakageBonus: 30,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 30,
        kiMaint: 5,
        level: 2
      },
      {
        breakageBonus: 35,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 35,
        kiMaint: 6,
        level: 2
      },
      {
        breakageBonus: 40,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 40,
        kiMaint: 8,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Power", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 4 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Earth" }, { element: "Fire" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  FortitudeAugmentation: createKiEffect({
    name: "Fortitude Augmentation",
    type: "Special",
    maintained: false,
    description:
      "This effect increases a character’s weapon or armor fortitude, rendering it more resistant to blows.",
    effects: [
      {
        fortitudeBonus: 10,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        fortitudeBonus: 15,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        fortitudeBonus: 20,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        fortitudeBonus: 25,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        fortitudeBonus: 30,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 3,
        level: 2
      },
      {
        fortitudeBonus: 35,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 3,
        level: 2
      },
      {
        fortitudeBonus: 40,
        primaryKiCost: 7,
        secondaryKiCost: 10,
        mkCost: 25,
        kiMaint: 4,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Power", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 4 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Earth" }, { element: "Fire" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  LongDistanceAttack: createKiEffect({
    name: "Long-Distance Attack",
    type: "Special",
    maintained: false,
    description:
      "This effect allows characters to project attacks over a distance. Any ability may be used in the attack, including Magical or Psychic projection. Any Technique performed at a distance counts as a fired projectile as far as calculating defense penalties.",
    effects: [
      {
        distance: "15 feet",
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        distance: "30 feet",
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        distance: "60 feet",
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        distance: "50 feet",
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        distance: "150 feet",
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        distance: "800 feet",
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 25,
        kiMaint: 5,
        level: 2
      },
      {
        distance: "1,500 feet",
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 30,
        kiMaint: 6,
        level: 2
      },
      {
        distance: "3,000 feet",
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 35,
        kiMaint: 8,
        level: 2
      },
      {
        distance: "3 miles",
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 40,
        kiMaint: 10,
        level: 3
      },
      {
        distance: "6 miles",
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 45,
        kiMaint: 12,
        level: 3
      },
      {
        distance: "60 miles",
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 50,
        kiMaint: 14,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Agility", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 4 }
    ],
    relatedElements: [{ element: "Air" }, { element: "Water" }, { element: "Fire" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  AreaAttack: createKiEffect({
    name: "Area Attack",
    type: "Special",
    maintained: false,
    description:
      "The effect creates an attack that affects every person within its radius using a single offensive roll. A player must choose the radius and pay the costs at the time of Technique Creation.",
    effects: [
      {
        radius: "3 feet",
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        radius: "15 feet",
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      },
      {
        radius: "30 feet",
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 15,
        kiMaint: 2,
        level: 1
      },
      {
        radius: "80 feet",
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 20,
        kiMaint: 3,
        level: 1
      },
      {
        radius: "50 feet",
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 25,
        kiMaint: 4,
        level: 2
      },
      {
        radius: "150 feet",
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 30,
        kiMaint: 5,
        level: 2
      },
      {
        radius: "1,500 feet",
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 40,
        kiMaint: 6,
        level: 2
      },
      {
        radius: "3,000 feet",
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 50,
        kiMaint: 8,
        level: 3
      },
      {
        radius: "3 miles",
        primaryKiCost: 16,
        secondaryKiCost: 20,
        mkCost: 60,
        kiMaint: 10,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Agility", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Darkness" }, { element: "Light" }, { element: "Fire" }],
    optionalAdvantages: [
      {
        name: "Target Choice",
        description:
          "This Advantage allows a character to choose specific targets within an area attack.",
        options: [{ option: "Target Choice", additionalKiCost: 2, mkCost: 10, kiMaint: 1 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  AutomaticTransportation: createKiEffect({
    name: "Automatic Transportation",
    type: "Special",
    maintained: false,
    description:
      "The character automatically covers the distance shown in the effect’s first column. Movement is automatic but does not allow passing through solid bodies unless the character is immaterial.",
    effects: [
      {
        distance: "30 feet",
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        distance: "60 feet",
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        distance: "150 feet",
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 3,
        level: 1
      },
      {
        distance: "300 feet",
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 4,
        level: 1
      },
      {
        distance: "800 feet",
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 5,
        level: 1
      },
      {
        distance: "1,500 feet",
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 6,
        level: 2
      },
      {
        distance: "3,000 feet",
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 7,
        level: 2
      },
      {
        distance: "3 miles",
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 35,
        kiMaint: 8,
        level: 2
      },
      {
        distance: "6 miles",
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 40,
        kiMaint: 10,
        level: 3
      },
      {
        distance: "60 miles",
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 50,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Agility",
    secondaryChars: [
      { char: "Strength", extraKiCost: 2 },
      { char: "Power", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Air" }, { element: "Light" }, { element: "Darkness" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  CriticalEnhancement: createKiEffect({
    name: "Critical Enhancement",
    type: "Special",
    maintained: false,
    description:
      "Whenever an attack produces a Critical, this effect allows a character to add a bonus to his roll when calculating the Critical level.",
    effects: [
      {
        criticalBonus: 10,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        criticalBonus: 25,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 5,
        kiMaint: 2,
        level: 1
      },
      {
        criticalBonus: 40,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 3,
        level: 1
      },
      {
        criticalBonus: 50,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 4,
        level: 1
      },
      {
        criticalBonus: 75,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 6,
        level: 1
      },
      {
        criticalBonus: 90,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 8,
        level: 1
      },
      {
        criticalBonus: 100,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 10,
        level: 1
      },
      {
        criticalBonus: 125,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 35,
        kiMaint: 12,
        level: 2
      },
      {
        criticalBonus: 150,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 14,
        level: 2
      },
      {
        criticalBonus: 175,
        primaryKiCost: 26,
        secondaryKiCost: 32,
        mkCost: 45,
        kiMaint: 16,
        level: 3
      },
      {
        criticalBonus: 200,
        primaryKiCost: 30,
        secondaryKiCost: 36,
        mkCost: 50,
        kiMaint: 18,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Strength", extraKiCost: 1 },
      { char: "Willpower", extraKiCost: 1 },
      { char: "Dexterity", extraKiCost: 2 },
      { char: "Constitution", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Fire" }, { element: "Earth" }],
    optionalAdvantages: [
      {
        name: "Automatic Critical",
        description:
          "This Advantage allows the Technique to cause an automatic Critical if it causes any amount of damage.",
        options: [{ option: "Automatic Critical", additionalKiCost: 8, mkCost: 30, kiMaint: 4 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  PhysicalKiWeapons: createKiEffect({
    name: "Physical Ki Weapons",
    type: "Special",
    maintained: false,
    description:
      "This effect allows to create a physical weapon using Ki. Its quality depends upon the invested points. Characters cannot create projectiles for Fired Weapons – although they can create Thrown projectile weapons.",
    effects: [
      { quality: 0, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      { quality: 5, primaryKiCost: 4, secondaryKiCost: 6, mkCost: 5, kiMaint: 1, level: 1 },
      { quality: 10, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 10, kiMaint: 2, level: 1 },
      {
        quality: 15,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 15,
        kiMaint: 3,
        level: 2
      },
      {
        quality: 20,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 20,
        kiMaint: 4,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 1 },
      { char: "Strength", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Darkness" }, { element: "Earth" }],
    optionalAdvantages: [
      {
        name: "Projectiles",
        description:
          "Projectile creation allows a character to create Fired Projectile weapons and produce unlimited ammunition.",
        options: [{ option: "Projectile Weapon", additionalKiCost: 2, mkCost: 10, kiMaint: 1 }]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  Trapping: createKiEffect({
    name: "Trapping",
    type: "Special",
    maintained: false,
    description:
      "Upon attack, a character can attempt to trap his adversary. This effect uses the same rules as the Trap combat maneuver, but without penalties.",
    effects: [
      {
        trapStrength: 4,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        trapStrength: 6,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        trapStrength: 8,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 3,
        level: 1
      },
      {
        trapStrength: 10,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 4,
        level: 1
      },
      {
        trapStrength: 12,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 5,
        level: 1
      },
      {
        trapStrength: 14,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 6,
        level: 2
      },
      {
        trapStrength: 16,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 7,
        level: 2
      },
      {
        trapStrength: 18,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 35,
        kiMaint: 8,
        level: 3
      },
      {
        trapStrength: 20,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 40,
        kiMaint: 10,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Dexterity", extraKiCost: 1 },
      { char: "Willpower", extraKiCost: 2 },
      { char: "Constitution", extraKiCost: 2 },
      { char: "Power", extraKiCost: 2 }
    ],
    relatedElements: [{ element: "Earth" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  Projection: createKiEffect({
    name: "Projection",
    type: "Special",
    maintained: false,
    description:
      "The character strikes his opponent with the Strength shown in the first column. If the opponent fails an Opposed Strength Check, he is knocked back.",
    effects: [
      {
        projectionStrength: 4,
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      },
      {
        projectionStrength: 6,
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 2,
        level: 1
      },
      {
        projectionStrength: 8,
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 3,
        level: 1
      },
      {
        projectionStrength: 10,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 4,
        level: 1
      },
      {
        projectionStrength: 12,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 5,
        level: 1
      },
      {
        projectionStrength: 14,
        primaryKiCost: 6,
        secondaryKiCost: 9,
        mkCost: 20,
        kiMaint: 6,
        level: 2
      },
      {
        projectionStrength: 16,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 25,
        kiMaint: 7,
        level: 2
      },
      {
        projectionStrength: 18,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 30,
        kiMaint: 8,
        level: 3
      },
      {
        projectionStrength: 20,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 35,
        kiMaint: 10,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Strength",
    secondaryChars: [
      { char: "Power", extraKiCost: 1 },
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Earth" }, { element: "Fire" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  EnergyShield: createKiEffect({
    name: "Energy Shield",
    type: "Special",
    maintained: false,
    description:
      "This effect enables a character to create an energy shield to defend himself until the end of the Combat Turn. The shield uses Block or Dodge Ability and has a Damage Barrier of 40.",
    effects: [
      { lp: 100, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      { lp: 200, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 5, kiMaint: 1, level: 1 },
      { lp: 300, primaryKiCost: 4, secondaryKiCost: 6, mkCost: 10, kiMaint: 2, level: 1 },
      { lp: 400, primaryKiCost: 5, secondaryKiCost: 8, mkCost: 15, kiMaint: 3, level: 1 },
      { lp: 500, primaryKiCost: 8, secondaryKiCost: 11, mkCost: 20, kiMaint: 4, level: 1 },
      { lp: 800, primaryKiCost: 12, secondaryKiCost: 15, mkCost: 25, kiMaint: 5, level: 2 },
      { lp: 1000, primaryKiCost: 14, secondaryKiCost: 18, mkCost: 30, kiMaint: 8, level: 2 },
      { lp: 1250, primaryKiCost: 18, secondaryKiCost: 22, mkCost: 35, kiMaint: 10, level: 2 },
      {
        lp: 1500,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 12,
        level: 3
      },
      { lp: 2000, primaryKiCost: 26, secondaryKiCost: 32, mkCost: 45, kiMaint: 14, level: 3 }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 2 },
      { char: "Strength", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Water" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  Intangibility: createKiEffect({
    name: "Intangibility",
    type: "Special",
    maintained: false,
    description:
      "The character and his belongings become intangible for the duration of the Turn. He can travel through solid objects and ignore conventional attacks not based on energy.",
    effects: [
      {
        effect: "Intangibility",
        primaryKiCost: 3,
        secondaryKiCost: 5,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 3 },
      { char: "Strength", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Darkness" }, { element: "Water" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description: "Predetermined Techniques require advance declaration of Ki Accumulation.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),
  Mirage: createKiEffect({
    name: "Mirage",
    type: "Special",
    maintained: false,
    description:
      "The character generates illusory images of himself that he can control. These images may perform any action and even make individual attacks. Since they are not real, anyone with the ability to detect energy or see through illusions immediately grasps their true nature. The number of beings created is specified in the “Mirages” column.",
    effects: [
      { mirages: 1, primaryKiCost: 1, secondaryKiCost: 2, mkCost: 5, kiMaint: 1, level: 1 },
      { mirages: 2, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 2, level: 1 },
      { mirages: 4, primaryKiCost: 4, secondaryKiCost: 6, mkCost: 10, kiMaint: 3, level: 1 },
      { mirages: 6, primaryKiCost: 6, secondaryKiCost: 9, mkCost: 10, kiMaint: 4, level: 1 },
      {
        mirages: 10,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 15,
        kiMaint: 6,
        level: 2
      },
      {
        mirages: 15,
        primaryKiCost: 10,
        secondaryKiCost: 13,
        mkCost: 20,
        kiMaint: 8,
        level: 2
      },
      {
        mirages: 20,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 10,
        level: 2
      },
      {
        mirages: 25,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Willpower",
    secondaryChars: [
      { char: "Power", extraKiCost: 1 },
      { char: "Agility", extraKiCost: 2 },
      { char: "Dexterity", extraKiCost: 3 },
      { char: "Constitution", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Water" }, { element: "Darkness" }],
    optionalAdvantages: [
      {
        name: "Non-detection",
        description:
          "This Advantage permits characters to try and hide the illusory nature of mirages from those trying to detect them through Ki Abilities.",
        options: [
          { option: "Moderate", additionalKiCost: 1, mkCost: 5, level: 1 },
          { option: "Difficult", additionalKiCost: 2, mkCost: 10, level: 1 },
          { option: "Very Difficult", additionalKiCost: 3, mkCost: 10, level: 1 },
          { option: "Absurd", additionalKiCost: 4, mkCost: 15, level: 1 },
          { option: "Almost impossible", additionalKiCost: 5, mkCost: 15, level: 1 },
          { option: "Impossible", additionalKiCost: 6, mkCost: 20, level: 2 },
          { option: "Inhuman", additionalKiCost: 7, mkCost: 25, level: 2 },
          { option: "Zen", additionalKiCost: 8, mkCost: 30, level: 3 }
        ]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  AttackMirroring: createKiEffect({
    name: "Attack Mirroring",
    type: "Special",
    maintained: false,
    description:
      "With a successful defense, this effect confers the ability to return the attack to the aggressor. This mirrored attack uses the same Final Attack Abilities of the initiator, as well as his attack roll.",
    effects: [
      {
        effect: "Attack Mirroring",
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 30,
        kiMaint: 8,
        level: 2
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Strength", extraKiCost: 2 },
      { char: "Agility", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Darkness" }, { element: "Water" }],
    optionalAdvantages: [
      {
        name: "Target Choice",
        description:
          "This Advantage allows a character to redirect the mirrored attack to any other target within its radius.",
        options: [{ option: "Target Choice", additionalKiCost: 2, mkCost: 10, kiMaint: 2 }]
      },
      {
        name: "Mirroring Esoteric Abilities",
        description:
          "Other than damage, the mirrored attack retains all of its special abilities – including magical or psychic ones.",
        options: [
          { option: "Mirroring Esoteric Abilities", additionalKiCost: 4, mkCost: 20, kiMaint: 1 }
        ]
      }
    ],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  EnergyDamagingAttack: createKiEffect({
    name: "Energy Damaging Attack",
    type: "Special",
    maintained: false,
    description:
      "The attack is able to damage energy, regardless of the Presence required for affecting the opponent.",
    effects: [
      {
        effect: "Energy",
        primaryKiCost: 1,
        secondaryKiCost: 2,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 2 },
      { char: "Strength", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Fire" }, { element: "Light" }, { element: "Darkness" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  ElementalAttack: createKiEffect({
    name: "Elemental Attack",
    type: "Special",
    maintained: false,
    description:
      "The attack has elemental properties; therefore, it produces increased effects against creatures especially vulnerable to them.",
    effects: [
      {
        effect: "Elemental",
        primaryKiCost: 2,
        secondaryKiCost: 4,
        mkCost: 5,
        kiMaint: 1,
        level: 1
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 2 },
      { char: "Strength", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Variable" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  SupernaturalAttack: createKiEffect({
    name: "Supernatural Attack",
    type: "Special",
    maintained: false,
    description:
      "This effect makes an attack supernatural in nature. Consequently, it uses the Energy Attack Type.",
    effects: [
      {
        effect: "Energy",
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 10,
        kiMaint: 1,
        level: 1
      }
    ],
    purchasedEffects: [],
    primaryChar: "Power",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Constitution", extraKiCost: 2 },
      { char: "Strength", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Light" }, { element: "Darkness" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  }),

  DamageResistance: createKiEffect({
    name: "Damage Resistance",
    type: "Special",
    maintained: false,
    description:
      "When using this Technique, a character functions as a creature with Damage Resistance.",
    effects: [
      { lpBonus: 100, primaryKiCost: 2, secondaryKiCost: 4, mkCost: 5, kiMaint: 1, level: 1 },
      { lpBonus: 200, primaryKiCost: 3, secondaryKiCost: 5, mkCost: 5, kiMaint: 1, level: 1 },
      {
        lpBonus: 300,
        primaryKiCost: 4,
        secondaryKiCost: 6,
        mkCost: 10,
        kiMaint: 2,
        level: 1
      },
      {
        lpBonus: 400,
        primaryKiCost: 5,
        secondaryKiCost: 8,
        mkCost: 15,
        kiMaint: 3,
        level: 1
      },
      {
        lpBonus: 600,
        primaryKiCost: 8,
        secondaryKiCost: 11,
        mkCost: 20,
        kiMaint: 4,
        level: 1
      },
      {
        lpBonus: 800,
        primaryKiCost: 12,
        secondaryKiCost: 15,
        mkCost: 25,
        kiMaint: 5,
        level: 1
      },
      {
        lpBonus: 1000,
        primaryKiCost: 14,
        secondaryKiCost: 18,
        mkCost: 30,
        kiMaint: 8,
        level: 2
      },
      {
        lpBonus: 1200,
        primaryKiCost: 18,
        secondaryKiCost: 22,
        mkCost: 35,
        kiMaint: 10,
        level: 2
      },
      {
        lpBonus: 1400,
        primaryKiCost: 22,
        secondaryKiCost: 26,
        mkCost: 40,
        kiMaint: 12,
        level: 3
      }
    ],
    purchasedEffects: [],
    primaryChar: "Constitution",
    secondaryChars: [
      { char: "Willpower", extraKiCost: 1 },
      { char: "Strength", extraKiCost: 3 },
      { char: "Power", extraKiCost: 3 },
      { char: "Dexterity", extraKiCost: 3 }
    ],
    relatedElements: [{ element: "Earth" }],
    optionalAdvantages: [],
    purchasedAdvantages: [],

    purchasedDisadvantages: [],
    optionalDisadvantages: [
      {
        name: "Elemental Binding",
        description:
          "This Disadvantage forces the player to choose effects only related to a particular element.",
        options: [
          { option: "Single Element", mkReduction: "-15" },
          { option: "Two Elements", mkReduction: "-10" }
        ]
      },
      {
        name: "Special Requirements",
        description: "Certain requirements must be met in order to perform the Technique.",
        options: [
          { option: "Simple Intensity", mkReduction: "-15" },
          { option: "Major Intensity", mkReduction: "-10" },
          { option: "Determined Condition", mkReductionRange: "-5 to -25" }
        ]
      },
      {
        name: "Predetermination",
        description:
          "Predetermined Techniques require that the character declares in advance he will Accumulate Ki.",
        options: [{ option: "Predetermination", mkReduction: "-20" }]
      }
    ]
  })

  //#endregion
};
