export function createAdvantage(advInput) {
  const {
    name = "",
    type = "",
    effects = "",
    restriction = "",
    special = "",
    cost = 0,
    description = "",
    journal = ""
  } = advInput;

  return {
    name,
    type,
    effects,
    restriction,
    special,
    cost,
    description,
    journal
  };
}

export const ABF_ADVANTAGES = {
  //Common
  addOnePointToACharacteristic: createAdvantage({
    name: "Add One Point To A Characteristic",
    type: "Common",
    effects: "Add a point to the value of a single Characteristic.",
    restriction:
      "Strength, Dexterity, Agility, and Constitution cannot be increased to more than 11 through this Advantage. Intelligence, Power, Willpower, and Perception cannot be increased to more than 13 through this Advantage.",
    special: "You may take this Advantage as many times as you wish.",
    cost: 0,
    description: "One of the character's attributes is greater than before.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.UgeRpnAbbdvgZzYS"
  }),

  acuteSenses: createAdvantage({
    name: "Acute Senses",
    type: "Common",
    effects:
      "Adds +1 to Perception for Characteristic Checks and grants a +30 bonus to Notice and Search.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character’s senses are as sharp as those of an animal.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.4l792pocJEes65DG"
  }),

  artifact: createAdvantage({
    name: "Artifact",
    type: "Common",
    effects:
      "The character possesses a mystical device of significant power. Its abilities are determined collaboratively with the Game Master.",
    restriction: "",
    special: "Additional points increase the artifact’s capabilities.",
    cost: 0,
    description: "A powerful and unique magical object accompanies the character.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.ryROWltDOM5xmfio"
  }),

  ambidextrous: createAdvantage({
    name: "Ambidextrous",
    type: "Common",
    effects:
      "The character can use both hands equally well. In combat, he suffers only –10 to attacks made with an additional weapon.",
    restriction: "",
    special: "",
    cost: 0,
    description: "Both hands function with equal coordination and precision.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.E6Ryy95bVkp1H55j"
  }),

  increaseOneCharacteristicToNine: createAdvantage({
    name: "Increase One Characteristic to Nine",
    type: "Common",
    effects: "One Primary Characteristic is set to a value of 9, regardless of its original value.",
    restriction: "",
    special: "This Advantage may be taken multiple times.",
    cost: 0,
    description: "One of the character’s attributes is significantly enhanced.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.MaFHAx7KG9X2Wcjv"
  }),

  accessToOnePsychicDiscipline: createAdvantage({
    name: "Access to One Psychic Discipline",
    type: "Common",
    effects: "Grants affinity to a single psychic discipline and access to its matrix powers.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character possesses limited psychic talent focused on a single discipline.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.I7wA2lEY3d9eRtTx"
  }),

  charm: createAdvantage({
    name: "Charm",
    type: "Common",
    effects:
      "The character naturally receives positive reactions from strangers and may be treated more permissively.",
    restriction: "",
    special: "The exact limits are determined by the Game Master.",
    cost: 0,
    description: "A magnetic personality makes others instinctively like the character.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.7YFHZurYy0kZeG98"
  }),

  disquieting: createAdvantage({
    name: "Disquieting",
    type: "Common",
    effects:
      "The character can make others uneasy at will, discouraging aggression or influencing intimidating individuals.",
    restriction: "",
    special: "The exact limits are determined by the Game Master.",
    cost: 0,
    description: "A subtle aura of menace unsettles those nearby.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.8GMoqJhd4I6KGTmc"
  }),

  animalAffinity: createAdvantage({
    name: "Animal Affinity",
    type: "Common",
    effects:
      "The character gains positive reactions from animals and can communicate basic intentions with them.",
    restriction: "",
    special: "Trained attack animals may still attack, but usually after warning the character.",
    cost: 0,
    description: "A natural bond with animals allows limited communication and trust.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.FHYiqZ3GFHxwjD3T"
  }),

  dangerSense: createAdvantage({
    name: "Danger Sense",
    type: "Common",
    effects:
      "The character cannot be taken by surprise unless the attacker’s Initiative exceeds his by 150 or more.",
    restriction: "",
    special: "",
    cost: 0,
    description: "A sixth sense alerts the character to imminent danger.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.yLg2vHtmzIVuZAB0"
  }),

  beenAround: createAdvantage({
    name: "Been Around",
    type: "Common",
    effects:
      "The character begins with 50, 100, or 150 additional Experience Points, depending on points spent.",
    restriction: "",
    special: "",
    cost: 0,
    description: "Past experiences have taught the character valuable lessons.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.v24rx76txKSn42iA"
  }),

  aptitudeInASubject: createAdvantage({
    name: "Aptitude in a Subject",
    type: "Common",
    effects: "Reduces the Development Cost of a single Secondary Ability by 1 per point spent.",
    restriction: "Development Costs cannot be reduced below 1.",
    special: "",
    cost: 0,
    description: "The character excels naturally in one specific Secondary Ability.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.P8vxEabfG9gt03JB"
  }),

  accessToNaturalPsychicPowers: createAdvantage({
    name: "Access to Natural Psychic Powers",
    type: "Common",
    effects:
      "The character can use one Psychic Ability instinctively once per minute without rolling. Additional points increase the difficulty tier.",
    restriction: "",
    special: "",
    cost: 0,
    description: "A latent psychic talent manifests without conscious control.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.ueRaEAO8m9wUkEkT"
  }),

  aptitudeInAField: createAdvantage({
    name: "Aptitude in a Field",
    type: "Common",
    effects: "Reduces the Development Cost of an entire field of Secondary Abilities by 1.",
    restriction: "Development Costs cannot be reduced below 1.",
    special: "",
    cost: 0,
    description: "The character learns an entire category of abilities with exceptional ease.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.iIV5swnbFVVDBYSL"
  }),

  repeatACharacteristicsRoll: createAdvantage({
    name: "Repeat a Characteristics Roll",
    type: "Common",
    effects:
      "Allows the player to roll one additional die during Characteristic generation and replace one previous result.",
    restriction: "Not compatible with the fourth method of generating Characteristics.",
    special: "This Advantage may be taken multiple times.",
    cost: 0,
    description: "The character’s natural attributes benefit from a second chance.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.AnjL0XtvRwu4X4lB"
  }),

  martialMastery: createAdvantage({
    name: "Martial Mastery",
    type: "Common",
    effects:
      "Adds 40, 80, or 120 points to the character’s Martial Knowledge, depending on points spent.",
    restriction: "",
    special: "",
    cost: 0,
    description: "Exceptional training or innate talent grants superior Martial Knowledge.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.MUbExbetWy2RmvPZ"
  }),

  goodLuck: createAdvantage({
    name: "Good Luck",
    type: "Common",
    effects: "Reduces the fumble range by 1. With mastery, the character fumbles only on a 1.",
    restriction: "",
    special: "",
    cost: 0,
    description: "Fortune favors the character in all endeavors.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.QZDKfaKgQrorLfgF"
  }),

  kiRecovery: createAdvantage({
    name: "Ki Recovery",
    type: "Common",
    effects:
      "The character recovers 1 Ki every 10 minutes. Additional points reduce the interval to 5 minutes and 1 minute.",
    restriction: "",
    special: "",
    cost: 0,
    description: "Spiritual energy replenishes far faster than normal.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.NbFr733m5kVCJXjj"
  }),

  jackOfAllTrades: createAdvantage({
    name: "Jack of All Trades",
    type: "Common",
    effects:
      "The character never suffers the –30 penalty for untrained Secondary Abilities and gains +10 to all of them.",
    restriction: "",
    special: "",
    cost: 0,
    description: "A broad base of knowledge allows competence in any situation.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.tne2opm4c30g8VcT"
  }),

  naturalArmor: createAdvantage({
    name: "Natural Armor",
    type: "Common",
    effects:
      "Grants natural armor 2 against all attacks except energy-based ones, without applying armor penalties.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character’s body is exceptionally tough and resistant.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.iRpi0zFnJwQpo05Q"
  }),

  mysticalArmor: createAdvantage({
    name: "Mystical Armor",
    type: "Common",
    effects:
      "Grants natural armor 4 against energy-based attacks, without applying armor penalties.",
    restriction: "",
    special: "",
    cost: 0,
    description: "A protective aura shields the character from supernatural harm.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.bZrbLpqCEhHLuOZW"
  }),

  untiring: createAdvantage({
    name: "Untiring",
    type: "Common",
    effects: "Adds +3 Fatigue. Additional points increase this to +6 and +9.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character possesses exceptional endurance and stamina.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.kQ0byssV12oLpL6b"
  }),

  uncommonSize: createAdvantage({
    name: "Uncommon Size",
    type: "Common",
    effects: "Allows the character to increase or decrease Size by up to 5 points during creation.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character’s physical proportions differ significantly from the norm.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.imB9lpa7279H0N7f"
  }),

  startingWealth: createAdvantage({
    name: "Starting Wealth",
    type: "Common",
    effects:
      "This Advantage provides starting money or equipment valued at 2,000 gold crowns (GC). Further points spent increase this amount to 5,000 and 10,000, respectively.",
    restriction:
      "The Game Master may prefer to give a different amount of money tailored to his game. In this case, both the GM and the player should decide the amount.",
    special: "",
    cost: 0,
    description: "The character has a great fortune in materials and equipment.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.XV3By8c7d88bNhfv"
  }),

  regeneration: createAdvantage({
    name: "Regeneration: Basic, Advanced, and Greater",
    type: "Common",
    effects:
      "This Advantage increases the character’s Regeneration by two levels. Spending additional points increases Regeneration by four and six levels, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description: "Wounds suffered by the character heal easily.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.IdbCsGGl4QSguuwc"
  }),

  elan: createAdvantage({
    name: "Elan",
    type: "Common",
    effects:
      "The character has Elan 25 for the entity he chooses. Spending additional points increases the level to 45 and 60, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "A character with this Advantage has attracted the attention of a Shajad or a Beryl.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.oSmI9IgMSyBF8BYv"
  }),

  immunityToPainAndFatigue: createAdvantage({
    name: "Immunity to Pain and Fatigue",
    type: "Common",
    effects: "Penalties caused by pain and Fatigue are reduced by half.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character is especially resistant to the effects of pain and fatigue.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.mD9PyyafX7g73TZy"
  }),

  theGift: createAdvantage({
    name: "The Gift",
    type: "Common",
    effects: "The character can see and use magic. He also adds a special bonus of +10 to his MR.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character can feel and control supernatural energies inherent within his own soul.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.AzQVmccKpRhnQf5M"
  }),

  seeSupernatural: createAdvantage({
    name: "See Supernatural",
    type: "Common",
    effects:
      "The character sees supernatural things—including magic and psychic matrices—as spiritual creatures.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character can perceive the Soul Flow and the energy of psychic matrices.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.rwtuqeTeFJFEJnaK"
  }),

  nightVision: createAdvantage({
    name: "Night Vision",
    type: "Common",
    effects:
      "The character may ignore any penalty caused by the dark—except magically induced dark or absolute lack of light.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character can see in the dark and adapt quickly to changes in light intensity.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.nVSQ9QzKPPakH0cH"
  }),
  fortunate: createAdvantage({
    name: "Fortunate",
    type: "Common",
    effects:
      "The character will never suffer the negative effects of a trap or attack determined solely by chance.",
    restriction: "",
    special: "",
    cost: 0,
    description: "A fortunate character enjoys true luck and often escapes difficult situations.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.LKTvx42MRNNtLKri"
  }),

  freeAccessToAnyPsychicDiscipline: createAdvantage({
    name: "Free Access to Any Psychic Discipline",
    type: "Common",
    effects:
      "This Advantage enables the character to use as many psychic disciplines as he wishes using his Psychic Points.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character may use any type of psychic discipline and its abilities.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.5YtoqLd30EhAndSK"
  }),

  quickReflexes: createAdvantage({
    name: "Quick Reflexes",
    type: "Common",
    effects:
      "Grants a special bonus of +25 to a character’s Initiative score. Spending additional Creation Points increases the bonus to +45 and +60, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character has exceptional reflexes that allow him to respond quickly to any situation.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.MUQRY3JU2L8Kw8dn"
  }),

  learning: createAdvantage({
    name: "Learning",
    type: "Common",
    effects:
      "The character gains an additional 3 Experience Points when the Game Master grants points at the end of each game session. Spending additional Creation Points increases the benefit to 6 and 9 points, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character possesses an enormous capacity to learn and develop his potential.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.v2RBOTVodq4CkyiX"
  }),

  naturalLearner: createAdvantage({
    name: "Natural Learner",
    type: "Common",
    effects:
      "Grants a special modifier of +10 per level in a single Secondary Ability. Spending additional points increases the bonus to +20 and +30, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character naturally improves in a specific Secondary Ability.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.97sqnOIivuB6klZE"
  }),

  naturalLearnerField: createAdvantage({
    name: "Natural Learner (Field)",
    type: "Common",
    effects:
      "Grants a special +5 per level bonus to all Secondary Abilities in a field. Spending an additional point increases the bonus to +10.",
    restriction: "",
    special: "",
    cost: "2, 3",
    description:
      "The character improves naturally in all Secondary Abilities within a chosen field.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.ZQkRWwjvjn3wcZxh"
  }),

  exceptionalMagicResistance: createAdvantage({
    name: "Exceptional Magic Resistance",
    type: "Common",
    effects:
      "Adds a special bonus of +25 to Magic Resistance (MR). Spending a second Creation Point increases the bonus to +50.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character possesses heightened resistance to magical attacks and effects.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.PlhTo5UYOm1SR4h4"
  }),

  exceptionalPhysicalResistance: createAdvantage({
    name: "Exceptional Physical Resistance",
    type: "Common",
    effects:
      "Adds a special bonus of +25 to Physical Resistance (PhR), Venom Resistance (VR), and Disease Resistance (DR). Spending a second Creation Point increases the bonus to +50.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character possesses heightened resistance to physical attacks, poisons, and diseases.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.gGaiz4oKossuZrZH"
  }),

  exceptionalPsychicResistance: createAdvantage({
    name: "Exceptional Psychic Resistance",
    type: "Common",
    effects:
      "Adds a special bonus of +25 to Psychic Resistance (PsR). Spending a second Creation Point increases the bonus to +50.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character possesses strong mental barriers that protect him from psychic attacks.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.BtytsDeY9MvnmhuS"
  }),

  lightSleeper: createAdvantage({
    name: "Light Sleeper",
    type: "Common",
    effects: "The character applies a penalty of only –20 to his Notice ability while sleeping.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character remains partially conscious while sleeping and wakes easily.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.9OzPcoZ4M5mS659n"
  }),
  //Magic Advantages
  elementalCompatibility: createAdvantage({
    name: "Elemental Compatibility",
    type: "Magic",
    effects:
      "The character has a special bonus of +20 to his MA and to his MR in the magical path that he chooses. When he uses spells of the opposed path, he has a penalty of –20 to his MA and to his MR. If the chosen path is Necromancy, apply the penalty to all other paths.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character is naturally compatible with the powers of a specific magical path and weaker in its opposite.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.eVz2stUcanjg1MuA"
  }),

  naturalKnowledgeOfAPath: createAdvantage({
    name: "Natural Knowledge of a Path",
    type: "Magic",
    effects:
      "This Advantage grants innate knowledge of a Path at level 40 without investing Magic Level points. As it is innate knowledge, the wizard can continue to develop it beyond level 40 by spending new Magic Level points.",
    restriction: "",
    special: "This Advantage can be acquired again for different Paths.",
    cost: 0,
    description:
      "The character can cast certain spells naturally, without study, as if the Path responds instinctively to him.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.7IYLuwlpvaHC0mt1"
  }),

  contestedSpellMastery: createAdvantage({
    name: "Contested Spell Mastery",
    type: "Magic",
    effects:
      "The character applies a bonus of +50 to his roll to calculate the result of a Collision against another beam.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character’s attack spells are stronger when clashing against another Supernatural Beam.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.ooEnIx88tcnsHUqN"
  }),

  aptitudeForMagicDevelopment: createAdvantage({
    name: "Aptitude for Magic Development",
    type: "Magic",
    effects:
      "A player can add 3 points to his character’s Intelligence to determine the maximum potential of the spell. This bonus is not applied to any other ability—not even to calculate the character’s level of magic.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character can achieve levels of spell power far beyond what his Intelligence would normally allow.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.k0AWfa4pWYFNld2N"
  }),

  halfAttunedToTheTree: createAdvantage({
    name: "Half-Attuned to the Tree",
    type: "Magic",
    effects:
      "The wizard has a special bonus of +20 to his MA and his MR in the five magical Paths of a segment of the Tree. In the rest, he has a penalty of –20 to his MA and his MR.",
    restriction: "Necromancy is not included in this Advantage.",
    special: "",
    cost: 0,
    description:
      "The character is naturally compatible with the magic of half of the Mystical Tree.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.xuNMraWMzRxuiOZK"
  }),

  improvedInnateMagic: createAdvantage({
    name: "Improved Innate Magic",
    type: "Magic",
    effects:
      "The innate spells of the wizard add +10 to their potential as indicated by their MA. Additional Creation Points increase the value to +20 and +30, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character can execute his innate spells with greater potential than normal.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.yWsswGSqFIk9KYu5"
  }),

  unspokenCasting: createAdvantage({
    name: "Unspoken Casting",
    type: "Magic",
    effects: "The character can cast spells in complete silence without reducing his MA.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character does not need to speak to control the powers of the Soul Flow.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.JiPhv9aS6Cjdepr3"
  }),

  gesturelessCasting: createAdvantage({
    name: "Gestureless Casting",
    type: "Magic",
    effects: "The character does not reduce his MA if unable to gesture.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character does not need to make physical gestures to use his magic.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.tOGOpPcxaanUhMXI"
  }),
  superiorMagicRecovery: createAdvantage({
    name: "Superior Magic Recovery",
    type: "Magic",
    effects:
      "The character recovers his Zeon at twice his normal Zeonic regeneration rate. Spending additional Creation Points will triple or quadruple the normal rate.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character’s essence draws in magic more efficiently, regenerating power at an accelerated rate.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.KPlqr6I3heGoIPk0"
  }),
  //Psychic Advantages
  amplifySustainedPower: createAdvantage({
    name: "Amplify Sustained Power",
    type: "Psychic",
    effects:
      "Any powers maintained in this way are one difficulty level higher than what the psychic could normally attain.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character can maintain his psychic powers with greater force.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.RgSRV1Jj6WkVDKjw"
  }),

  psychicPointRecovery: createAdvantage({
    name: "Psychic Point Recovery",
    type: "Psychic",
    effects:
      "The character’s recovery rate for Psychic Points is 1 point every 10 minutes. Spending additional Creation Points increases the rate to 1 point every five minutes or every minute, respectively.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character can easily recover from using his abilities.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.ObMrhkKhv5uw3hCO"
  }),

  psychicFatigueResistance: createAdvantage({
    name: "Psychic Fatigue Resistance",
    type: "Psychic",
    effects:
      "If a character fails in the use of one of his powers, he does not lose Fatigue when he has used up his available PP. Third level powers are not affected by this Advantage.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character never experiences exhaustion when using his psychic powers.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.9UMleJ0jEh44wqcR"
  }),

  passiveConcentration: createAdvantage({
    name: "Passive Concentration",
    type: "Psychic",
    effects: "The psychic can concentrate to harness a power even while executing active actions.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character can concentrate in any situation, regardless of difficulty or complications.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.9l3kK9vwadMEdXfX"
  }),

  psychicInclination: createAdvantage({
    name: "Psychic Inclination",
    type: "Psychic",
    effects:
      "The character automatically gains one level of difficulty greater than normal when using the powers of a specific discipline.",
    restriction: "",
    special: "",
    cost: 0,
    description: "The character has developed one of his Psychic Disciplines more than the rest.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.zqDfYYsplL65Grob"
  }),

  focus: createAdvantage({
    name: "Focus",
    type: "Psychic",
    effects:
      "Psychic Points spent to improve Psychic Projection increase the ability by +20 instead of +10.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character can harness his ability more than normal and focus his powers on a particular objective.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.prb13Vop1aF7cBOj"
  }),

  extremeConcentration: createAdvantage({
    name: "Extreme Concentration",
    type: "Psychic",
    effects:
      "The psychic doubles the bonus he normally gains from concentration. For example, if he concentrates for a full round, he gains +20 instead of +10.",
    restriction: "",
    special: "",
    cost: 0,
    description:
      "The character can concentrate far more intensely than most psychics, gaining greater benefits from his abilities.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.hw9DMaWeFLfiifJ3.JournalEntryPage.WrEyuN14clI61fRs"
  })
};
