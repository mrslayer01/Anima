export function createSpell(spellInput) {
  const {
    name = "",
    level = 0,
    path = "",
    action = "",
    cost = 0,
    effect = "",
    addedEffect = "",
    maintenance = "",
    maxZeon = "",
    typeOfSpell = ""
  } = spellInput;

  return {
    name,
    level,
    path,
    action,
    cost,
    effect,
    addedEffect,
    maintenance,
    maxZeon,
    typeOfSpell
  };
}

export function createFASpell(faSpellInput) {
  const {
    name = "",
    minLevel = 0,
    maxLevel = 0,
    action = "",
    cost = 0,
    effect = "",
    addedEffect = "",
    maintenance = "",
    maxZeon = "",
    typeOfSpell = "",
    closedPaths = { path1: "" }
  } = faSpellInput;

  return {
    name,
    minLevel,
    maxLevel,
    action,
    cost,
    effect,
    addedEffect,
    maintenance,
    maxZeon,
    typeOfSpell,
    closedPaths
  };
}

//#region Spells
export const ABF_SPELLS = {
  // Light Path
  CreateLight: createSpell({
    name: "Create Light",
    level: 2,
    path: "light",
    action: "active",
    cost: 20,
    effect: "Creates light in a radius of 15 feet.",
    addedEffect: "+15 feet radius.",
    maintenance: "1 every 10 (2) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  InduceCalm: createSpell({
    name: "Induce Calm",
    level: 6,
    path: "light",
    action: "active",
    cost: 40,
    effect:
      "Calms individuals feeling fear or hatred within 50 feet of the caster. Makes any Fear, Terror, or Anger States disappear, even if of supernatural origin. It does not prevent violent actions deliberately done in cold blood. The MR or PsR Check to overcome this spell has a Difficulty of 80.",
    addedEffect: "+30 feet to radius and +5 to MR or PsR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  BlindingFlash: createSpell({
    name: "Blinding Flash",
    level: 8,
    path: "light",
    action: "active",
    cost: 50,
    effect:
      "Causes a sudden flash of light for a radius of 50 feet. It blinds anyone looking at it when it goes off for as many combat turns as he fails the MR check by, divided by 10. It is not possible to designate specific targets within the flash, and everyone except the caster is equally affected. Characters can resist this spell by passing a PhR Check with a Difficulty of 140. If someone is actively avoiding looking at the flash, the PhR Check Difficulty is 80.",
    addedEffect: "+15 feet to radius.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  ShieldOfLight: createSpell({
    name: "Shield of Light",
    level: 10,
    path: "light",
    action: "passive",
    cost: 50,
    effect:
      "Forms a barrier of Energy that protects the caster from any source of attack. The shield can absorb up to 300 points before breaking, but is only damaged by supernatural attacks. Impacts based on Darkness cause double damage.",
    addedEffect: "+100 Resistance Points.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  Perceive: createSpell({
    name: "Perceive",
    level: 12,
    path: "light",
    action: "active",
    cost: 50,
    effect:
      "Improves the perception of the caster, increasing his secondary abilities of Notice and Search by +50. It also increases his Magical Appraisal by the same amount, but only for detecting or measuring magic potency, not hiding it.",
    addedEffect: "+10 to Notice, Search and Magical Appraisal.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ArmorOfLight: createSpell({
    name: "Armor of Light",
    level: 16,
    path: "light",
    action: "active",
    cost: 60,
    effect:
      "Forms a mystical armor with AT 2 against Energy-based Attacks, and an AT of 1 against all others. Although it counts as armor, it does not count as an additional layer for Initiative penalties.",
    addedEffect: "+1 to the AT.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  BanishShadows: createSpell({
    name: "Banish Shadows",
    level: 18,
    path: "light",
    action: "active",
    cost: 60,
    effect:
      "Destroys shadows within a radius of 10 meters. Darkness-based creatures must pass a MR Check Difficulty 120 or lose double their Failure Level in Life Points. Damage Resistance creatures increase this amount by their DR multiple. While maintained, creatures must repeat the MR Check each turn.",
    addedEffect: "+20 meters to radius and +10 to the MR Difficulty.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual, Effect"
  }),

  DetectNegativeEmotions: createSpell({
    name: "Detect Negative Emotions",
    level: 20,
    path: "light",
    action: "active",
    cost: 50,
    effect:
      "Detects hatred, fear, or anger within 10 meters. Also senses creatures based on such emotions. Resisting requires a MR Check Difficulty 80.",
    addedEffect: "+20 meters to radius and +10 to the MR Difficulty.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Detection"
  }),

  LightBeam: createSpell({
    name: "Light Beam",
    level: 22,
    path: "light",
    action: "active",
    cost: 50,
    effect:
      "Projects a beam of Light-based magical energy. Light Beam is an Energy Attack Type with Base Damage 60.",
    addedEffect: "+5 to Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  Hologram: createSpell({
    name: "Hologram",
    level: 26,
    path: "light",
    action: "active",
    cost: 40,
    effect:
      "Creates an immaterial luminous form up to three square feet. The caster can shape it as desired. If shaped as a creature, it mimics the caster’s physical abilities. It cannot touch or be touched, but disappears if it receives Energy damage. Detecting the illusion requires Notice (Almost Impossible) or Search (Very Difficult).",
    addedEffect: "+3 square feet to maximum size.",
    maintenance: "1 every 10 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  BondsOfLight: createSpell({
    name: "Bonds of Light",
    level: 28,
    path: "light",
    action: "active",
    cost: 60,
    effect:
      "Casts bonds of light that immobilize a target. Uses Trapping rules but without penalties. Bonds use Strength 8 for checks. Attempts to free the target treat the bonds as an Energy weapon with Fortitude 20.",
    addedEffect: "+1 to Strength for all checks.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),
  ControlLight: createSpell({
    name: "Control Light",
    level: 30,
    path: "light",
    action: "active",
    cost: 50,
    effect:
      "Modifies and controls the form, color, or intensity of light in a 60-foot radius. If cast at Light-based beings, they must pass a MR Check with a Difficulty of 80 or fall under the control of the caster. A creature can only repeat the check if ordered to do something against its nature.",
    addedEffect: "+30 feet to radius and +5 to MR Difficulty.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual, Effect"
  }),

  DetectLife: createSpell({
    name: "Detect Life",
    level: 32,
    path: "light",
    action: "active",
    cost: 60,
    effect:
      "Detects any life-form within 80 feet. The spell only detects the number of life-forms and their exact location. Resisting the spell requires beating a MR Check with a Difficulty of 140.",
    addedEffect: "+30 feet to radius and +10 to MR Difficulty.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Detection"
  }),

  SpyOfLight: createSpell({
    name: "Spy of Light",
    level: 36,
    path: "light",
    action: "active",
    cost: 100,
    effect:
      "Creates a small light of energy that moves as wished by the caster, with a Flight Value of 14, for a maximum distance of one mile. The caster can see and hear through it, but doing so overwhelms his senses. The Spy has Notice and Search 100, defends with the caster’s Magic Projection, and can only be attacked by supernatural attacks.",
    addedEffect: "+5 to Notice and Search and +1 mile to range.",
    maintenance: "1 every 5 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Ecstasy: createSpell({
    name: "Ecstasy",
    level: 38,
    path: "light",
    action: "active",
    cost: 60,
    effect:
      "Intoxicates anyone affected with a feeling of utter ecstasy. Victims suffer a –20 All Action Penalty but are immune to pain-based penalties except incapacitation. MR Check Difficulty 80, radius 30 feet.",
    addedEffect: "+30 feet to radius and +5 to MR Difficulty.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  BanishNegativeEmotions: createSpell({
    name: "Banish Negative Emotions",
    level: 40,
    path: "light",
    action: "active",
    cost: 80,
    effect:
      "Temporarily banishes hatred, fear, or anger within 300 feet. Resisting requires a MR or PsR Check with a Difficulty of 100.",
    addedEffect: "+150 feet to radius and +5 to MR or PsR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  HealingLight: createSpell({
    name: "Healing Light",
    level: 42,
    path: "light",
    action: "active",
    cost: 80,
    effect:
      "Causes the target to recover 40 Life Points. Does not restore lost limbs or remove Critical penalties.",
    addedEffect: "+5 Life Points.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  SeekingSphere: createSpell({
    name: "Seeking Sphere",
    level: 46,
    path: "light",
    action: "active",
    cost: 120,
    effect:
      "Unleashes a sphere of luminous energy with Base Damage 100. The caster controls it with Magic Projection until it hits. If dodged, it continues attacking next turn. When it deals damage or is blocked, it explodes. If abandoned, it acts independently with Magic Projection 150.",
    addedEffect: "+5 to Base Damage and +5 to the Magic Projection of the Seeking Sphere.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  ZoneOfDetection: createSpell({
    name: "Zone of Detection",
    level: 48,
    path: "light",
    action: "active",
    cost: 140,
    effect:
      "Detects any being within the area who does not beat a MR Check Difficulty 180. Reveals number and exact location. Also senses Detection spells entering the area unless their caster beats the MR. Radius up to 60 feet, stationary.",
    addedEffect: "+30 feet to radius and +10 to MR Difficulty.",
    maintenance: "1 every 20 (7) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Detection"
  }),

  EnterAnothersDreams: createSpell({
    name: "Enter Another’s Dreams",
    level: 50,
    path: "light",
    action: "active",
    cost: 120,
    effect:
      "Allows the caster to physically enter a sleeper’s dreams. The caster has no control over the dream. If the dream becomes a nightmare, or the dreamer awakens or dies, the caster is expelled. MR or PsR Check Difficulty 140. The caster may jump to another dreamer within 30 feet. If the dreamer’s consciousness is in The Wake, the caster becomes trapped.",
    addedEffect: "+30 feet additional to jumping range and +5 to MR or PsR Difficulty.",
    maintenance: "1 every 20 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  LightForm: createSpell({
    name: "Light Form",
    level: 52,
    path: "light",
    action: "active",
    cost: 100,
    effect:
      "Transforms the target into pure luminous energy, becoming intangible to matter and non-energy attacks. Grants +50 Notice and Search, +30 Resistance vs Light effects. Darkness-based damage is doubled. Maximum Presence affected is 100.",
    addedEffect: "+10 to the maximum Presence that can be affected.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Blessing: createSpell({
    name: "Blessing",
    level: 56,
    path: "light",
    action: "active",
    cost: 100,
    effect:
      "Endows allies within 15 feet with +20 to all actions and Resistances. A character cannot benefit from more than one Blessing at a time.",
    addedEffect: "+15 feet to radius.",
    maintenance: "1 every 20 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CreateGoodFeelings: createSpell({
    name: "Create Good Feelings",
    level: 58,
    path: "light",
    action: "active",
    cost: 100,
    effect:
      "Creates positive sentiments such as love, pleasure, or friendship in designated targets. Radius 60 feet. MR or PsR Check Difficulty 120. Targets may repeat the check once per day.",
    addedEffect: "+5 to MR or PsR Difficulty and +30-foot radius.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  SeeTruth: createSpell({
    name: "See Truth",
    level: 60,
    path: "light",
    action: "active",
    cost: 100,
    effect:
      "Allows perception of supernatural forces, magic, psychic matrices, and invisible or spiritual beings. Grants +50 MR vs visual illusions. Maximum Presence affected is 80.",
    addedEffect: "+10 to the maximum Presence affected.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ShieldFromNegative: createSpell({
    name: "Shield from Negative",
    level: 62,
    path: "light",
    action: "active",
    cost: 140,
    effect:
      "Enchants an area, making it impenetrable to beings based on negative emotions or Darkness. Such creatures must pass MR Difficulty 120 or lose Life Points equal to margin of failure and suffer –40 All Action Penalty. Radius up to 60 feet, stationary.",
    addedEffect: "+60 feet to radius and +5 to the MR Difficulty.",
    maintenance: "1 every 10 (14) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  Find: createSpell({
    name: "Find",
    level: 66,
    path: "light",
    action: "active",
    cost: 160,
    effect:
      "Locates any person, place, or thing and reveals its exact location regardless of distance. Targets must pass MR Difficulty 140 to avoid detection. Large places suffer –40 penalty.",
    addedEffect: "+10 to the MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Detection"
  }),

  Restore: createSpell({
    name: "Restore",
    level: 68,
    path: "light",
    action: "active",
    cost: 160,
    effect:
      "Allows the target to recover from penalties caused by fatigue, hunger, physical damage, and spells. Automatically restores any Fatigue points lost. Does not restore lost limbs. Maximum Presence affected is 100.",
    addedEffect: "+10 to the maximum Presence affected.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  HypnoticDisplay: createSpell({
    name: "Hypnotic Display",
    level: 70,
    path: "light",
    action: "active",
    cost: 140,
    effect:
      "Creates a spectacle of lights visible for half a mile that fascinates anyone who sees it. Affected characters cannot move and may only perform Passive Actions. MR or PsR Check Difficulty 120 to resist. They may repeat the check each time they are attacked. Condition for being affected is looking directly at the display.",
    addedEffect: "+1 mile to radius and +5 to MR or PsR Difficulty.",
    maintenance: "1 every 50 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  CatastrophicLight: createSpell({
    name: "Catastrophic Light",
    level: 72,
    path: "light",
    action: "active",
    cost: 120,
    effect:
      "Creates a deadly discharge of Light with Base Damage 150. It has a radius of 80 feet and is an Energy Attack Type.",
    addedEffect: "+30 feet to radius and +5 damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  LuminousMaterialObjects: createSpell({
    name: "Luminous Material Objects",
    level: 76,
    path: "light",
    action: "active",
    cost: 150,
    effect:
      "Forms a material object from luminous energy. The object may be complex or simple, has a maximum Presence of 60, and is treated as having a quality of +10. Quality does not affect Presence.",
    addedEffect: "+10 to the object’s Presence.",
    maintenance: "1 every 10 (15)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  TravelByLight: createSpell({
    name: "Travel by Light",
    level: 78,
    path: "light",
    action: "active",
    cost: 250,
    effect:
      "Transports individuals or objects from one light source to another within 60 miles. Total Presence transported cannot exceed 250. Resisting requires a MR Check Difficulty 120.",
    addedEffect: "+5 to MR Difficulty, +20 to transportable Presence and +60 miles.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Spiritual, Effect"
  }),

  LordshipOverDreams: createSpell({
    name: "Lordship Over Dreams",
    level: 80,
    path: "light",
    action: "active",
    cost: 300,
    effect:
      "Allows the caster to control any type of dream, modifying it as if he had Gnosis 45 (or 30 if the dream is a nightmare). Dreamers resisting must beat MR Difficulty 140. If cast within the Wake, the caster gains powers equivalent to Gnosis 40 in areas of positive energy, or Gnosis 30 in neutral areas.",
    addedEffect: "+5 to the MR Difficulty.",
    maintenance: "1 every 5 (60) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual, Effect"
  }),

  CreateBeingOfLight: createSpell({
    name: "Create Being of Light",
    level: 82,
    path: "light",
    action: "active",
    cost: 250,
    effect:
      "Creates a luminous being under the caster’s control, developed as a Being Between Worlds using Light Elemental rules. The creature has 600 DP and its maximum level is calculated using the same rules as Create Being from the Path of Creation.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  ReflectingPrism: createSpell({
    name: "Reflecting Prism",
    level: 86,
    path: "light",
    action: "passive",
    cost: 160,
    effect:
      "Creates a prismatic shield that reflects any spell, psychic attack, or Ki technique back at the caster if it wins a Clashing Spells check against an equivalent of 100 Base Damage. The caster must also successfully Block using the Prism. Area Attacks are only partially reflected. The Prism does not reflect Spiritual spells. It absorbs 800 damage before breaking.",
    addedEffect: "+5 to damage for Clashing Spells and +100 Resistance Points.",
    maintenance: "1 every 10 (16) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  RadiusOfOmniscience: createSpell({
    name: "Radius of Omniscience",
    level: 88,
    path: "light",
    action: "active",
    cost: 200,
    effect:
      "Grants omniscience concerning any occurrence or thought within 1,500 feet. Affects only individuals with Presence less than 60 and lower Gnosis than the caster. The caster automatically knows everything happening and everything thought within the radius. No Resistance is possible.",
    addedEffect: "+1,500 feet to radius and +5 to the affected Base Presence.",
    maintenance: "1 every 5 (40)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Predict: createSpell({
    name: "Predict",
    level: 90,
    path: "light",
    action: "active",
    cost: 200,
    effect:
      "Allows the caster to foresee future events around a person, place, or thing. Shows the most probable destiny within up to one year. Predictions may change due to higher powers or individuals with elevated Gnosis.",
    addedEffect: "Doubles the period of time covered.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  PrisonOfLight: createSpell({
    name: "Prison of Light",
    level: 92,
    path: "light",
    action: "active",
    cost: 200,
    effect:
      "Encloses the victim in a separate universe of Light with no interaction with the outside world. From within, the prison resists damage equal to 100 times the Zeon spent, with AT 10. From outside, it resists double the Zeon value. Only Energy attacks with Presence greater than 180 can damage it. Regeneration 19. Avoided with MR Difficulty 140; no further checks allowed.",
    addedEffect: "+10 to the MR Difficulty.",
    maintenance: "1 every 5 (40) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  OneWithTheLight: createSpell({
    name: "One with the Light",
    level: 96,
    path: "light",
    action: "active",
    cost: 100,
    effect:
      "The caster enters a meditative state and becomes one with the Light, ascending to the Flow of Souls. Gains x10 Zeon Regeneration and Healing Regeneration 16. The caster is unaware of the outside world. Can remain for one day.",
    addedEffect: "One day additional stay in the Flow of Souls.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Ascension: createSpell({
    name: "Ascension",
    level: 98,
    path: "light",
    action: "active",
    cost: 300,
    effect:
      "Exchanges the material essence of a person for divine energy. If cast on the caster, increases his Gnosis by 10. If cast on another, grants any Gnosis up to 10 below the caster’s own. Can affect multiple targets as long as total Presence does not exceed 80.",
    addedEffect: "+10 to the maximum Presence affected.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),
  HolocaustOfLight: createSpell({
    name: "Holocaust of Light",
    level: 100,
    path: "light",
    action: "active",
    cost: 600,
    effect:
      "Unleashes the purest power of Light, sweeping away everything in both the spiritual and material world. Creates a great luminous dome that dissolves all within it. Radius 300 feet. Energy Attack Type with Base Damage 350. Anyone receiving any amount of damage must beat a MR Check Difficulty 160 or be joined with the Light and destroyed in body and soul. All except the caster are equally affected.",
    addedEffect: "+10 Base Damage and doubles the radius of the spell.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Attack, Spiritual"
  }),

  // Darkness Path
  CreateDarkness: createSpell({
    name: "Create Darkness",
    level: 2,
    path: "darkness",
    action: "active",
    cost: 20,
    effect:
      "Completely darkens an area within a 15-foot radius. Everything within the area is perceived as though on a dark and moonless night.",
    addedEffect: "+15-foot radius.",
    maintenance: "1 every 10 (2) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  InduceFear: createSpell({
    name: "Induce Fear",
    level: 6,
    path: "darkness",
    action: "active",
    cost: 40,
    effect:
      "Temporarily causes a Fear State in all people within 50 feet of the caster. The spellcaster decides what the victims are afraid of. The MR or PsR Check to overcome this spell has a Difficulty of 80.",
    addedEffect: "+5 to MR or PsR Difficulty and +30-foot radius",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  SeeInDarkness: createSpell({
    name: "See in Darkness",
    level: 8,
    path: "darkness",
    action: "active",
    cost: 40,
    effect:
      "Permits the caster, or anyone he selects, to see perfectly in the dark. This spell can affect as many targets as desired as long as their accumulated Presence is no higher than 80.",
    addedEffect: "+5 to the maximum Presence that can be affected.",
    maintenance: "1 every 10 (4) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ShieldOfDarkness: createSpell({
    name: "Shield of Darkness",
    level: 10,
    path: "darkness",
    action: "passive",
    cost: 50,
    effect:
      "Forms a barrier of Energy that protects from any source of attack. The shield can absorb up to 300 points before breaking, but is only damaged by supernatural attacks. Impacts based on Light cause it double damage.",
    addedEffect: "+100 Resistance Points.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  Shadow: createSpell({
    name: "Shadow",
    level: 12,
    path: "darkness",
    action: "passive",
    cost: 50,
    effect:
      "Increases the caster’s ability to conceal, boosting Stealth and Hide by +50. Also increases Magic Appraisal by +50, but only for hiding magical potency, not detecting it.",
    addedEffect: "+10 Stealth, Hide, Magic Appraisal.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ArmorOfDarkness: createSpell({
    name: "Armor of Darkness",
    level: 16,
    path: "darkness",
    action: "active",
    cost: 60,
    effect:
      "Forms a mystical armor with AT 2 against Energy-based Attacks, and AT 1 against all others. Does not count as an additional armor layer for Initiative penalties.",
    addedEffect: "+1 to AT",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  BanishLight: createSpell({
    name: "Banish Light",
    level: 18,
    path: "darkness",
    action: "active",
    cost: 60,
    effect:
      "Destroys ambient light within a 30-foot radius. Light-based creatures must pass MR Difficulty 120 or lose double their Failure Level in Life Points (DR creatures multiply this by their DR multiple). While maintained, creatures must repeat the MR Check each turn.",
    addedEffect: "+10 to the MR Difficulty and +60-foot radius",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual, Effect"
  }),

  HideMagic: createSpell({
    name: "Hide Magic",
    level: 20,
    path: "darkness",
    action: "passive",
    cost: 50,
    effect:
      "Hides a spell or mystical properties of an object from magical detection. Produces a –80 penalty to Magic Appraisal attempts to detect or measure the hidden spell or object.",
    addedEffect: "–10 to Magic Appraisal.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DarkBeam: createSpell({
    name: "Dark Beam",
    level: 22,
    path: "darkness",
    action: "active",
    cost: 50,
    effect:
      "Projects a beam of Dark-based magical energy. Dark Beam is an Energy Attack Type with Base Damage 60.",
    addedEffect: "+5 to Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  Darkzone: createSpell({
    name: "Darkzone",
    level: 26,
    path: "darkness",
    action: "active",
    cost: 60,
    effect:
      "Creates a mystical environment that clouds the senses. Increases difficulty of all Perceptive checks by 2 levels and affects Ki Detection. Radius 60 feet. No Resistance is possible.",
    addedEffect: "+60-foot radius.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  BondsOfDarkness: createSpell({
    name: "Bonds of Darkness",
    level: 28,
    path: "darkness",
    action: "active",
    cost: 60,
    effect:
      "Casts bonds of darkness that hold the designated target immobile. Uses Trapping rules with no penalty to the caster. The bonds use Strength 8 for any Check. Attempts to free the target treat the bonds as an Energy weapon with Fortitude 20.",
    addedEffect: "Strength +1",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  ControlDarkness: createSpell({
    name: "Control Darkness",
    level: 30,
    path: "darkness",
    action: "active",
    cost: 50,
    effect:
      "Modifies and controls the intensity of darkness within a 60-foot radius. Darkness-based beings must pass MR Difficulty 80 or fall under the caster's control. A creature may repeat the check only if ordered to act against its nature.",
    addedEffect: "+30-foot radius and +5 to MR Difficulty",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual, Effect"
  }),

  Concealment: createSpell({
    name: "Concealment",
    level: 32,
    path: "darkness",
    action: "passive",
    cost: 60,
    effect:
      "Conceals the presence of the caster or a designated target from all forms of detection. Grants +40 resistance to mystical or psychic detection and +40 to Ki Concealment, even if the target lacks the ability.",
    addedEffect: "+10 to Resistances against detections and +10 to Ki Concealment.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Obfuscate: createSpell({
    name: "Obfuscate",
    level: 36,
    path: "darkness",
    action: "active",
    cost: 100,
    effect:
      "Modifies the body of the individual, blending him into the background and allowing natural hiding. While active, the target may substitute their Stealth and Hide with a base of 100, and gains Ki Concealment 100 even without the ability.",
    addedEffect: "+5 Stealth, Hide and Ki Concealment",
    maintenance: "1 every 5 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Enrage: createSpell({
    name: "Enrage",
    level: 38,
    path: "darkness",
    action: "active",
    cost: 60,
    effect:
      "Provokes a Rage State in those affected, making them lose control and attack the closest person. Victims gain +10 to offensive abilities and suffer –30 to all other checks. Radius 15 feet. Resisted with MR Difficulty 80.",
    addedEffect: "+15-foot radius and +5 to the MR Difficulty.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  BanishPositiveEmotions: createSpell({
    name: "Banish Positive Emotions",
    level: 40,
    path: "darkness",
    action: "active",
    cost: 80,
    effect:
      "Temporarily banishes positive sentiments such as inner peace, calm, or joy within 300 feet. Resisting requires a MR or PsR Check Difficulty 100.",
    addedEffect: "+150-foot radius and +5 to MR or PsR Difficulty",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Night: createSpell({
    name: "Night",
    level: 42,
    path: "darkness",
    action: "active",
    cost: 80,
    effect:
      "Forms a dome of darkness with a maximum radius of 80 feet. Everyone inside except the caster is subject to Vision Totally Obscured. Seeing through it requires Notice (Inhuman) or Search (Almost Impossible).",
    addedEffect: "+80-foot radius.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DarkSphere: createSpell({
    name: "Dark Sphere",
    level: 46,
    path: "darkness",
    action: "active",
    cost: 120,
    effect:
      "Unleashes a sphere of dark energy with Base Damage 100. The caster controls it with Magic Projection until it hits. If dodged, it continues attacking next turn. When it deals damage or is blocked, it explodes. If abandoned, it acts independently with Magic Projection 150.",
    addedEffect: "+5 to Base Damage and +5 to the Magic Projection of the Dark Sphere",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  ZoneOfConcealment: createSpell({
    name: "Zone of Concealment",
    level: 48,
    path: "darkness",
    action: "active",
    cost: 100,
    effect:
      "Creates a 100-foot-radius area where all forms of detection—mundane, magical, psychic, or supernatural—suffer a –80 penalty. Inside the zone, individuals appear blurred and indistinct, making identification nearly impossible.",
    addedEffect: "+50-foot radius and +10 to the detection penalty.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ShadowArmor: createSpell({
    name: "Shadow Armor",
    level: 49,
    path: "darkness",
    action: "active",
    cost: 90,
    effect:
      "Forms a living armor of darkness around the caster, granting AT 6 against physical attacks and reducing energy damage by 30. The armor absorbs the first 80 points of damage before dissipating.",
    addedEffect: "+20 absorbed damage and +1 AT.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DarkForm: createSpell({
    name: "Dark Form",
    level: 50,
    path: "darkness",
    action: "active",
    cost: 120,
    effect:
      "Transforms the caster into a semi-corporeal being of shadow. Grants Immunity to Criticals, +40 Defense, and allows passing through small openings. Physical attacks against the caster suffer –60.",
    addedEffect: "+10 Defense and –10 to enemy attack checks.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Transformation"
  }),

  AbyssalChains: createSpell({
    name: "Abyssal Chains",
    level: 52,
    path: "darkness",
    action: "active",
    cost: 110,
    effect:
      "Summons multiple chains of void energy that attempt to bind up to three targets. Bound targets cannot move and suffer –40 to all actions. Breaking free requires a Strength check Difficulty 180.",
    addedEffect: "+1 additional target and +10 to the Difficulty to break free.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Eclipse: createSpell({
    name: "Eclipse",
    level: 54,
    path: "darkness",
    action: "active",
    cost: 140,
    effect:
      "Blots out all light in a 300-foot radius, reducing visibility to zero and imposing –80 to all Perception checks. Light-based spells lose half their effectiveness while Darkness spells gain +20 to their effects.",
    addedEffect: "+100-foot radius and +5 to the Darkness bonus.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  SoulRend: createSpell({
    name: "Soul Rend",
    level: 56,
    path: "darkness",
    action: "active",
    cost: 150,
    effect:
      "Tears at the target’s spiritual essence, dealing 120 Base Damage that bypasses armor. On a failed MR check Difficulty 180, the target suffers –20 to all Characteristics for 1 minute.",
    addedEffect: "+10 Base Damage and +5 to the MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  VoidStep: createSpell({
    name: "Void Step",
    level: 58,
    path: "darkness",
    action: "active",
    cost: 100,
    effect:
      "Allows the caster to teleport up to 1 mile by stepping through a tear in the void. Leaves behind a lingering shadow echo that confuses observers, imposing –40 to attempts to track the caster.",
    addedEffect: "+1 mile of range and –10 to tracking attempts.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Movement"
  }),

  DevouringShadow: createSpell({
    name: "Devouring Shadow",
    level: 60,
    path: "darkness",
    action: "active",
    cost: 160,
    effect:
      "Unleashes a wave of consuming darkness in a 150-foot cone. Deals 100 Base Damage and restores half the damage dealt as Life Points to the caster. Targets who fail MR Difficulty 160 also lose 1 Fatigue Point.",
    addedEffect: "+10 Base Damage and +10-foot cone length.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  BlackSun: createSpell({
    name: "Black Sun",
    level: 62,
    path: "darkness",
    action: "active",
    cost: 180,
    effect:
      "Summons a miniature dark star overhead that warps energy and perception. All enemies within 200 feet suffer –60 to Attack, Defense, and Magic Projection. Light spells automatically fail unless cast with Zeon doubled.",
    addedEffect: "+20-foot radius and –5 to enemy penalties.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  GateOfShadows: createSpell({
    name: "Gate of Shadows",
    level: 64,
    path: "darkness",
    action: "active",
    cost: 200,
    effect:
      "Opens a portal to a distant location or shadow realm. Up to 10 individuals may pass through before it collapses. Unstable gates may attract hostile shadow entities if maintained too long.",
    addedEffect: "+2 additional travelers and +1 round of stability.",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Ritual"
  }),

  ShadowMaw: createSpell({
    name: "Shadow Maw",
    level: 66,
    path: "darkness",
    action: "active",
    cost: 170,
    effect:
      "Summons a massive spectral maw of darkness that erupts from the ground to bite a single target. Deals 130 Base Damage and inflicts a –40 penalty to Dodge for one round. On a failed MR 180 check, the target is partially immobilized.",
    addedEffect: "+10 Base Damage and –5 additional Dodge penalty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  CloakOfNight: createSpell({
    name: "Cloak of Night",
    level: 67,
    path: "darkness",
    action: "active",
    cost: 120,
    effect:
      "Envelops the caster in a mantle of pure night, granting total concealment from sight and magical detection. Attackers suffer –90 to attempts to locate or target the caster.",
    addedEffect: "+10 to concealment penalty.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  AbyssalGaze: createSpell({
    name: "Abyssal Gaze",
    level: 68,
    path: "darkness",
    action: "active",
    cost: 150,
    effect:
      "The caster’s eyes become void-like pits. A chosen target must resist MR 180 or suffer overwhelming terror, taking –60 to all actions for 3 turns. Even on success, the target suffers –20 for 1 turn.",
    addedEffect: "+5 to MR Difficulty and +1 turn of penalties.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  DarkFlood: createSpell({
    name: "Dark Flood",
    level: 69,
    path: "darkness",
    action: "active",
    cost: 160,
    effect:
      "Unleashes a wave of liquid shadow in a 200-foot line. Deals 110 Base Damage and knocks targets prone unless they pass a PhR 160 check. The area becomes difficult terrain for 2 turns.",
    addedEffect: "+10 Base Damage and +20-foot line length.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  VoidShell: createSpell({
    name: "Void Shell",
    level: 70,
    path: "darkness",
    action: "active",
    cost: 180,
    effect:
      "Encases the caster in a hardened sphere of void energy. Grants AT 10, reduces all damage by 40, and reflects 20% of received damage back at attackers.",
    addedEffect: "+5 damage reduction and +5% reflection.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ShadowLegion: createSpell({
    name: "Shadow Legion",
    level: 71,
    path: "darkness",
    action: "active",
    cost: 200,
    effect:
      "Summons up to five autonomous shadow warriors with Attack 140, Defense 120, and 80 LP each. They obey the caster’s commands and dissipate after 5 turns or when destroyed.",
    addedEffect: "+1 additional warrior (max 8).",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Summon"
  }),

  NightParadox: createSpell({
    name: "Night Paradox",
    level: 72,
    path: "darkness",
    action: "active",
    cost: 190,
    effect:
      "Twists the flow of time and perception around a target. The target suffers –50 to all actions and must pass MR 180 or lose their next turn entirely.",
    addedEffect: "+5 to MR Difficulty and –5 additional penalty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  OblivionWave: createSpell({
    name: "Oblivion Wave",
    level: 73,
    path: "darkness",
    action: "active",
    cost: 220,
    effect:
      "A massive pulse of void energy expands in a 150-foot radius. Deals 140 Base Damage and erases minor memories from all affected targets who fail MR 170, imposing –30 to Knowledge and Perception checks for 1 hour.",
    addedEffect: "+10 Base Damage and +10-foot radius.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  DarkStarFall: createSpell({
    name: "Dark Star Fall",
    level: 74,
    path: "darkness",
    action: "active",
    cost: 240,
    effect:
      "Calls down a collapsing star of darkness onto a single point. Deals 180 Base Damage in a 50-foot radius and reduces all Light-based effects in the area to zero for 3 turns.",
    addedEffect: "+10 Base Damage and +5-foot radius.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  GateOfEternalNight: createSpell({
    name: "Gate of Eternal Night",
    level: 75,
    path: "darkness",
    action: "active",
    cost: 260,
    effect:
      "Opens a colossal rift to the deepest shadow realms. The area within 300 feet becomes pitch black, enemies suffer –80 to all actions, and shadow entities may emerge to assist or attack depending on caster control.",
    addedEffect: "+20-foot radius and –5 additional penalty to enemies.",
    maintenance: "3 every 10 (18)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Ritual"
  }),

  UmbralDominion: createSpell({
    name: "Umbral Dominion",
    level: 76,
    path: "darkness",
    action: "active",
    cost: 220,
    effect:
      "The caster asserts absolute control over shadows within 300 feet. All enemies suffer –60 to Attack, Defense, and Magic Projection, while the caster gains +30 to all actions involving darkness.",
    addedEffect: "+10-foot radius and +5 to the caster’s bonuses.",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ShadowRebirth: createSpell({
    name: "Shadow Rebirth",
    level: 77,
    path: "darkness",
    action: "active",
    cost: 200,
    effect:
      "If the caster is reduced to 0 LP within the next 10 turns, they reform from shadow with half their LP restored. Can only trigger once per casting.",
    addedEffect: "+10% restored LP.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  AbyssalStorm: createSpell({
    name: "Abyssal Storm",
    level: 78,
    path: "darkness",
    action: "active",
    cost: 240,
    effect:
      "Creates a storm of void lightning and shadow winds in a 200-foot radius. Deals 130 Base Damage each turn to enemies and imposes –40 to movement.",
    addedEffect: "+10 Base Damage and +10-foot radius.",
    maintenance: "2 every 10 (18)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  NightMirror: createSpell({
    name: "Night Mirror",
    level: 79,
    path: "darkness",
    action: "active",
    cost: 180,
    effect:
      "Creates a reflective shadow barrier that redirects the next spell targeting the caster back at its originator. Works on spells up to level 80.",
    addedEffect: "+2 maximum reflected spell levels.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  VoidPuppeteer: createSpell({
    name: "Void Puppeteer",
    level: 80,
    path: "darkness",
    action: "active",
    cost: 260,
    effect:
      "Takes control of a target’s shadow, forcing the target to mimic the caster’s movements. Target must pass MR 190 or lose control of their body for 1 turn.",
    addedEffect: "+5 to MR Difficulty.",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  DarkHarvest: createSpell({
    name: "Dark Harvest",
    level: 81,
    path: "darkness",
    action: "active",
    cost: 220,
    effect:
      "Drains vitality from all enemies in a 150-foot radius, dealing 90 Base Damage and restoring Zeon equal to half the total damage dealt.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  ShadowTwin: createSpell({
    name: "Shadow Twin",
    level: 82,
    path: "darkness",
    action: "active",
    cost: 200,
    effect:
      "Creates a perfect duplicate of the caster made of shadow. The twin has 70% of the caster’s stats and lasts 5 turns.",
    addedEffect: "+1 turn duration.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Summon"
  }),

  AbyssalVortex: createSpell({
    name: "Abyssal Vortex",
    level: 83,
    path: "darkness",
    action: "active",
    cost: 260,
    effect:
      "Summons a spinning vortex of darkness that pulls enemies inward. Deals 120 Base Damage and immobilizes targets who fail PhR 180.",
    addedEffect: "+10 Base Damage.",
    maintenance: "2 every 10 (18)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  NightEclipse: createSpell({
    name: "Night Eclipse",
    level: 84,
    path: "darkness",
    action: "active",
    cost: 240,
    effect:
      "Creates a total eclipse over a 500-foot radius. All enemies suffer –70 to Perception and –40 to Attack and Defense.",
    addedEffect: "+20-foot radius and –5 additional penalties.",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ShadowSanctuary: createSpell({
    name: "Shadow Sanctuary",
    level: 85,
    path: "darkness",
    action: "active",
    cost: 200,
    effect:
      "Creates a protective dome of darkness that grants allies +40 Defense and regenerates 20 LP per turn.",
    addedEffect: "+5 LP regeneration.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  VoidLance: createSpell({
    name: "Void Lance",
    level: 86,
    path: "darkness",
    action: "active",
    cost: 260,
    effect:
      "Fires a concentrated beam of void energy that deals 170 Base Damage and ignores 50% of armor.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  AbyssalGatekeeper: createSpell({
    name: "Abyssal Gatekeeper",
    level: 87,
    path: "darkness",
    action: "active",
    cost: 280,
    effect:
      "Summons a colossal shadow guardian with Attack 180, Defense 160, and 300 LP. Lasts 5 turns.",
    addedEffect: "+20 LP.",
    maintenance: "3 every 10 (18)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Summon"
  }),

  DarkAnnihilation: createSpell({
    name: "Dark Annihilation",
    level: 88,
    path: "darkness",
    action: "active",
    cost: 300,
    effect:
      "Unleashes a devastating explosion of void energy in a 100-foot radius, dealing 200 Base Damage and reducing all enemy resistances by 20 for 3 turns.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  ShadowLabyrinth: createSpell({
    name: "Shadow Labyrinth",
    level: 89,
    path: "darkness",
    action: "active",
    cost: 260,
    effect:
      "Creates a maze of shifting shadows over a 400-foot area. Enemies must pass MR 180 or become lost, unable to act for 1 turn.",
    addedEffect: "+10-foot radius.",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  VoidCrown: createSpell({
    name: "Void Crown",
    level: 90,
    path: "darkness",
    action: "active",
    cost: 300,
    effect:
      "The caster becomes a nexus of void power, gaining +50 to all actions and immunity to critical hits for 5 turns.",
    addedEffect: "+1 turn duration.",
    maintenance: "2 every 10 (18)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Transformation"
  }),

  NightfallMeteor: createSpell({
    name: "Nightfall Meteor",
    level: 91,
    path: "darkness",
    action: "active",
    cost: 320,
    effect:
      "Calls down a massive meteor of condensed darkness. Deals 220 Base Damage in a 60-foot radius and leaves an area of magical darkness for 3 turns.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  AbyssalPossession: createSpell({
    name: "Abyssal Possession",
    level: 92,
    path: "darkness",
    action: "active",
    cost: 280,
    effect:
      "Attempts to overwhelm a target’s mind with void influence. On failed MR 190, the caster controls the target for 1 turn.",
    addedEffect: "+5 to MR Difficulty.",
    maintenance: "2 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ShadowCataclysm: createSpell({
    name: "Shadow Cataclysm",
    level: 93,
    path: "darkness",
    action: "active",
    cost: 340,
    effect:
      "Triggers a massive implosion of shadow energy in a 150-foot radius. Deals 180 Base Damage and teleports all enemies randomly within 200 feet.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  EternalMidnight: createSpell({
    name: "Eternal Midnight",
    level: 94,
    path: "darkness",
    action: "active",
    cost: 360,
    effect:
      "Blankets a 1-mile radius in supernatural darkness. Enemies suffer –80 to all actions, and Light spells cannot function.",
    addedEffect: "+100-foot radius.",
    maintenance: "3 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Ritual"
  }),

  VoidAscension: createSpell({
    name: "Void Ascension",
    level: 95,
    path: "darkness",
    action: "active",
    cost: 400,
    effect:
      "The caster partially merges with the void, gaining flight, +60 to all actions, and immunity to physical damage for 3 turns.",
    addedEffect: "+1 turn duration.",
    maintenance: "3 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Transformation"
  }),

  AbyssalMonolith: createSpell({
    name: "Abyssal Monolith",
    level: 96,
    path: "darkness",
    action: "active",
    cost: 420,
    effect:
      "Raises a towering monolith of void stone that radiates oppressive darkness. Enemies within 300 feet suffer –70 to all actions and lose 1 Fatigue Point per turn.",
    addedEffect: "+10-foot radius and –5 additional penalty.",
    maintenance: "3 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ShadowOverlord: createSpell({
    name: "Shadow Overlord",
    level: 97,
    path: "darkness",
    action: "active",
    cost: 450,
    effect:
      "Transforms the caster into a towering avatar of shadow. Grants +70 to all actions, +200 LP, and a fear aura imposing MR 190 or –60 to all actions.",
    addedEffect: "+10 LP and +5 to aura penalty.",
    maintenance: "3 every 10 (22)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Transformation"
  }),

  VoidCollapse: createSpell({
    name: "Void Collapse",
    level: 98,
    path: "darkness",
    action: "active",
    cost: 480,
    effect:
      "Creates a gravitational implosion of darkness in a 200-foot radius. Deals 220 Base Damage and pulls all enemies 50 feet toward the center.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  EternalShadow: createSpell({
    name: "Eternal Shadow",
    level: 99,
    path: "darkness",
    action: "active",
    cost: 500,
    effect:
      "The caster becomes permanently wreathed in supernatural darkness for 1 hour. Gains +60 Defense, +40 Magic Projection, and immunity to Light-based effects.",
    addedEffect: "+10 minutes duration.",
    maintenance: "3 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Transformation"
  }),

  NightDevourer: createSpell({
    name: "Night Devourer",
    level: 100,
    path: "darkness",
    action: "active",
    cost: 520,
    effect:
      "Summons a colossal shadow beast that consumes light and life. Deals 250 Base Damage in a 100-foot radius and reduces enemy resistances by 30 for 3 turns.",
    addedEffect: "+10 Base Damage.",
    maintenance: "3 every 10 (22)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),
  // Creation
  MinorCreation: createSpell({
    name: "Minor Creation",
    level: 2,
    path: "creation",
    action: "active",
    cost: 30,
    effect: "Creates a simple object with a Presence of no more than 25.",
    addedEffect: "Creates one additional object.",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Reconstruct: createSpell({
    name: "Reconstruct",
    level: 6,
    path: "creation",
    action: "active",
    cost: 40,
    effect:
      "Restores a non-organic object to its original form from remaining parts or sufficient prime material. Affects objects with Presence 20 or less.",
    addedEffect: "+5 to the maximum Presence of the object.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CreateEnergy: createSpell({
    name: "Create Energy",
    level: 8,
    path: "creation",
    action: "active",
    cost: 40,
    effect: "Creates one Intensity of Cold, Fire, or Electricity.",
    addedEffect: "+1 additional Intensity.",
    maintenance: "1 every 10 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Regeneration: createSpell({
    name: "Regeneration",
    level: 10,
    path: "creation",
    action: "active",
    cost: 60,
    effect:
      "Provides a base Regeneration Level of 4, replacing natural regeneration. Cannot exceed 18 without sufficient Gnosis.",
    addedEffect: "+1 to the base Regeneration Level.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  InorganicModification: createSpell({
    name: "Inorganic Modification",
    level: 12,
    path: "creation",
    action: "active",
    cost: 60,
    effect:
      "Transforms an inorganic object of Presence 20 or less into another object of equal or lesser Presence.",
    addedEffect: "+5 to the maximum Presence that can be affected.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  IncreaseResistances: createSpell({
    name: "Increase Resistances",
    level: 16,
    path: "creation",
    action: "active",
    cost: 80,
    effect:
      "Increases all Resistances (Disease, Magic, Physical, Psychic, Venom) by +10. Not cumulative.",
    addedEffect: "+5 to all Resistances.",
    maintenance: "1 every 5 (16) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  RoyalShield: createSpell({
    name: "Royal Shield",
    level: 18,
    path: "creation",
    action: "passive",
    cost: 40,
    effect: "Forms an energy barrier that absorbs 500 damage before breaking.",
    addedEffect: "+150 Resistance Points.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Defense"
  }),

  Heal: createSpell({
    name: "Heal",
    level: 20,
    path: "creation",
    action: "active",
    cost: 80,
    effect:
      "Restores 50 Life Points and removes temporary Critical penalties up to half the LP restored.",
    addedEffect: "+5 Life Points.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DamageBarrier: createSpell({
    name: "Damage Barrier",
    level: 22,
    path: "creation",
    action: "active",
    cost: 60,
    effect: "Grants a Damage Barrier of 30 points.",
    addedEffect: "+5 to the Damage Barrier.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  CreateHomunculus: createSpell({
    name: "Create Homunculus",
    level: 26,
    path: "creation",
    action: "active",
    cost: 60,
    effect:
      "Creates a zero-level Being Between Worlds under the caster’s control with strict limitations (Characteristics ≤5, Abilities ≤50, no Zeon).",
    addedEffect: "+1 additional Homunculus.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  MinorChange: createSpell({
    name: "Minor Change",
    level: 28,
    path: "creation",
    action: "active",
    cost: 60,
    effect:
      "Alters the appearance of an object or being without changing its nature. Affects up to 60 total Presence. MR 80 to resist.",
    addedEffect: "+5 MR Difficulty and +10 maximum Presence.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  Imitate: createSpell({
    name: "Imitate",
    level: 30,
    path: "creation",
    action: "active",
    cost: 100,
    effect:
      "Creates a perfect copy of an inorganic object with Presence ≤30, including supernatural qualities.",
    addedEffect: "+5 maximum Presence duplicated.",
    maintenance: "1 every 20 (5) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Immunity: createSpell({
    name: "Immunity",
    level: 32,
    path: "creation",
    action: "active",
    cost: 80,
    effect:
      "Grants immunity to 5 Intensities of Fire, Electricity, or Cold. Each Intensity reduces Base Damage by 5 and grants +5 Resistance.",
    addedEffect: "+1 Intensity of immunity.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ReductionOfDamage: createSpell({
    name: "Reduction of Damage",
    level: 36,
    path: "creation",
    action: "passive",
    cost: 80,
    effect: "Reduces the Base Damage of an incoming attack by 40. Must be cast before rolling.",
    addedEffect: "–5 to the Base Damage of the attack.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  PhysicalControl: createSpell({
    name: "Physical Control",
    level: 38,
    path: "creation",
    action: "active",
    cost: 120,
    effect:
      "Controls the physical body of a target like a puppet. MR 80 to resist; target may retry daily.",
    addedEffect: "+5 to the MR Difficulty.",
    maintenance: "1 every 5 (24) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  RaiseAbilities: createSpell({
    name: "Raise Abilities",
    level: 40,
    path: "creation",
    action: "active",
    cost: 80,
    effect: "Provides +40 to distribute among Secondary Abilities (except knowledge-based).",
    addedEffect: "+10 bonus points.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),
  Fuse: createSpell({
    name: "Fuse",
    level: 42,
    path: "creation",
    action: "active",
    cost: 140,
    effect:
      "Unites two beings into a single body, combining chosen characteristics and abilities. Total Presence of both originals cannot exceed 80. MR Check to resist.",
    addedEffect: "+5 to the MR and +5 to the maximum Presence affected.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CreateMemories: createSpell({
    name: "Create Memories",
    level: 46,
    path: "creation",
    action: "active",
    cost: 140,
    effect:
      "Creates new memories in the target without erasing existing ones. MR or PsR 100 to resist. Target may retry when suspicious.",
    addedEffect: "+5 to the MR or PsR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Recover: createSpell({
    name: "Recover",
    level: 48,
    path: "creation",
    action: "active",
    cost: 150,
    effect:
      "Restores up to 300 Life Points and removes all physical penalties except amputations or supernatural states.",
    addedEffect: "+20 additional Life Points.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  AcquirePowers: createSpell({
    name: "Acquire Powers",
    level: 50,
    path: "creation",
    action: "active",
    cost: 100,
    effect:
      "Grants 100 DP to acquire supernatural Powers as if the target had Gnosis 25. Not cumulative.",
    addedEffect: "+10 DP with which to acquire powers.",
    maintenance: "1 every 5 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CreateMonstrosity: createSpell({
    name: "Create Monstrosity",
    level: 52,
    path: "creation",
    action: "active",
    cost: 80,
    effect: "Creates a first-level Being Between Worlds with Gnosis 20 under the caster’s control.",
    addedEffect: "+1 level.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ProtectiveAura: createSpell({
    name: "Protective Aura",
    level: 56,
    path: "creation",
    action: "passive",
    cost: 120,
    effect:
      "Increases all Resistances (VR, PhR, DR, MR, PsR) of allies within 1,500 feet by +20. Not cumulative.",
    addedEffect: "+5 to the Resistances and +150-foot radius.",
    maintenance: "1 every 20 (6)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  SpiritualStandstill: createSpell({
    name: "Spiritual Standstill",
    level: 58,
    path: "creation",
    action: "active",
    cost: 150,
    effect:
      "Freezes the target’s spiritual condition. They cannot gain or lose States. MR 100 to resist.",
    addedEffect: "+5 to the MR Difficulty.",
    maintenance: "1 every 10 (15)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  PerfectShield: createSpell({
    name: "Perfect Shield",
    level: 60,
    path: "creation",
    action: "active",
    cost: 150,
    effect:
      "Creates a shield that absorbs 100 damage and fully restores at the end of each turn if not destroyed.",
    addedEffect: "+20 Resistance Points.",
    maintenance: "1 every 10 (15) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  Vitality: createSpell({
    name: "Vitality",
    level: 62,
    path: "creation",
    action: "active",
    cost: 150,
    effect: "Increases maximum Life Points by +50 while maintained. Not cumulative.",
    addedEffect: "+5 to maximum Life Points.",
    maintenance: "1 every 10 (15) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CompleteCreation: createSpell({
    name: "Complete Creation",
    level: 66,
    path: "creation",
    action: "active",
    cost: 150,
    effect: "Creates an object with Presence ≤50, or up to twice the caster’s Base Presence.",
    addedEffect: "+5 to the maximum Presence of the object created.",
    maintenance: "1 every 10 (15) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ReinforceMagic: createSpell({
    name: "Reinforce Magic",
    level: 68,
    path: "creation",
    action: "passive",
    cost: 100,
    effect: "Adds one Added Effect to another spell being cast or maintained.",
    addedEffect: "+1 Added Effect.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Transmute: createSpell({
    name: "Transmute",
    level: 70,
    path: "creation",
    action: "active",
    cost: 250,
    effect:
      "Transforms an inorganic object of Presence ≤50 into another of equal or lesser Presence. MR 120 to resist.",
    addedEffect: "+5 to the MR Difficulty and +5 to the maximum Presence that can be affected.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Spiritual"
  }),

  Metamorphism: createSpell({
    name: "Metamorphism",
    level: 72,
    path: "creation",
    action: "active",
    cost: 150,
    effect:
      "Transforms a person or object into another form of equal or lesser Presence. MR 120 to resist.",
    addedEffect: "+5 to the MR.",
    maintenance: "1 every 20 (8) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Recreate: createSpell({
    name: "Recreate",
    level: 76,
    path: "creation",
    action: "active",
    cost: 300,
    effect:
      "Restores any artificial damage or loss to a person or object, including memories and DP. Cannot affect natural changes or resurrect the dead. Maximum Presence 60.",
    addedEffect: "+5 to the maximum Presence that can be affected.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  CreateBeing: createSpell({
    name: "Create Being",
    level: 78,
    path: "creation",
    action: "active",
    cost: 250,
    effect:
      "Creates a Being Between Worlds with 600 DP and Gnosis 25. Level limited by number of created beings.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  Chimera: createSpell({
    name: "Chimera",
    level: 80,
    path: "creation",
    action: "active",
    cost: 250,
    effect:
      "Transforms the target into a Being Between Worlds with Gnosis 25 and grants 150 DP for Essential Abilities and powers.",
    addedEffect: "+10 DP and +5 DP in optional disadvantages.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ZoneOfSafety: createSpell({
    name: "Zone of Safety",
    level: 82,
    path: "creation",
    action: "active",
    cost: 350,
    effect: "Creates a 300-foot zone where no harm can occur. MR 120 to overcome.",
    addedEffect: "+5 to the MR Difficulty and +150 feet in radius.",
    maintenance: "1 every 10 (35) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  MaintainMagic: createSpell({
    name: "Maintain Magic",
    level: 86,
    path: "creation",
    action: "active",
    cost: 250,
    effect: "Adds 500 Zeon toward maintaining an existing active spell.",
    addedEffect: "+50 toward the Maintenance of the designated spell.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  ProvideSoul: createSpell({
    name: "Provide Soul",
    level: 88,
    path: "creation",
    action: "active",
    cost: 500,
    effect:
      "Creates a complete soul for a body or object with Presence ≤30, granting it independent life.",
    addedEffect: "+5 to the maximum Presence that can be affected.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  GreaterCreation: createSpell({
    name: "Greater Creation",
    level: 90,
    path: "creation",
    action: "active",
    cost: 400,
    effect:
      "Grants 500 Presence Points to create any number of inanimate objects, each with Presence ≤180.",
    addedEffect: "+50 additional Presence Points to share out.",
    maintenance: "1 every 20 (20) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),
  EternalMagic: createSpell({
    name: "Eternal Magic",
    level: 92,
    path: "creation",
    action: "active",
    cost: 600,
    effect:
      "Affects another existing spell, drastically reducing or eliminating its Maintenance Cost. Daily-maintenance spells become permanent without upkeep, even after the caster’s death. Per-turn spells become Daily. Only affects spells with Zeon cost ≤100 and Path Level <80.",
    addedEffect: "+10 to its maximum Zeon value.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),

  TheBarrier: createSpell({
    name: "The Barrier",
    level: 96,
    path: "creation",
    action: "active",
    cost: 800,
    effect:
      "Creates a hidden separation in reality over 60 square miles (or a 60‑mile line). The area becomes inaccessible and unperceivable. Crossing requires Gnosis >25, knowledge of the Barrier, and MR 120. Failure allows only one retry per day.",
    addedEffect: "+5 to the MR Difficulty and +60 miles.",
    maintenance: "1 every 20 (40) Daily",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),

  TheGiftOfLife: createSpell({
    name: "The Gift of Life",
    level: 98,
    path: "creation",
    action: "active",
    cost: 800,
    effect:
      "Creates a completely new living being of any class (Natural, Spiritual, or Between Worlds). Its maximum level cannot exceed the caster’s. The caster chooses its Gnosis (up to 10 less than their own). Natural Beings with Gnosis ≤20 gain 50 DP for racial powers.",
    addedEffect: "+1 level if the creation is Between Worlds or Spiritual, +10 DP if Natural.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),

  Create: createSpell({
    name: "Create",
    level: 100,
    path: "creation",
    action: "active",
    cost: 1000,
    effect:
      "Grants absolute power over creation. Provides 5,000 Presence Points to form anything the caster desires, up to 350 Presence per object. Can alter fundamental laws of reality (gravity, time flow, etc.). Affects anyone with Gnosis less than half the caster’s.",
    addedEffect: "+1,000 Presence Points.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),
  //Destruction
  Fragility: createSpell({
    name: "Fragility",
    level: 2,
    path: "destruction",
    action: "active",
    cost: 30,
    effect:
      "Reduces the solidity of an object. The target automatically loses its Damage Barrier; arms or armor suffer –2 Fortitude. Affects objects with Presence ≤30.",
    addedEffect: "+5 maximum Presence and –1 Fortitude.",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Dismantle: createSpell({
    name: "Dismantle",
    level: 6,
    path: "destruction",
    action: "active",
    cost: 40,
    effect:
      "Dismantles an inanimate object composed of multiple parts. Affects objects with Presence ≤20.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DestroyIntensities: createSpell({
    name: "Destroy Intensities",
    level: 8,
    path: "destruction",
    action: "active",
    cost: 40,
    effect: "Destroys one Intensity of Cold, Fire, or Electricity.",
    addedEffect: "–1 additional Intensity.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  MinorDestruction: createSpell({
    name: "Minor Destruction",
    level: 10,
    path: "destruction",
    action: "active",
    cost: 50,
    effect: "Destroys a lifeless material object with Presence ≤20.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  SphereOfDestruction: createSpell({
    name: "Sphere of Destruction",
    level: 12,
    path: "destruction",
    action: "active",
    cost: 30,
    effect: "Projects an Energy Attack with Base Damage 30.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  IncreaseWeakness: createSpell({
    name: "Increase Weakness",
    level: 16,
    path: "destruction",
    action: "active",
    cost: 50,
    effect: "Doubles the penalties from any vulnerability the target has. MR 120 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  MagicDestruction: createSpell({
    name: "Magic Destruction",
    level: 18,
    path: "destruction",
    action: "passive",
    cost: 60,
    effect: "Destroys a spell with Zeon cost ≤40. Can nullify spells cast in the same turn.",
    addedEffect: "+5 to the Zeon value of the spell affected.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  AggravateDamage: createSpell({
    name: "Aggravate Damage",
    level: 20,
    path: "destruction",
    action: "passive",
    cost: 60,
    effect:
      "Increases the Base Damage of any attack (physical or supernatural) by +30. Must be cast before dice are rolled.",
    addedEffect: "+5 Resistance Points.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DestructionOfMatrices: createSpell({
    name: "Destruction of Matrices",
    level: 22,
    path: "destruction",
    action: "active",
    cost: 80,
    effect:
      "Unravels a Psychic Power with Potential ≤80. Can nullify powers cast in the same turn.",
    addedEffect: "+10 to Psychic Potential affected.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Wound: createSpell({
    name: "Wound",
    level: 26,
    path: "destruction",
    action: "active",
    cost: 80,
    effect: "Inflicts damage equal to 20% of the target’s current Life Points. MR 120 to resist.",
    addedEffect: "–5% Life Points and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  DestroyKi: createSpell({
    name: "Destroy Ki",
    level: 28,
    path: "destruction",
    action: "active",
    cost: 80,
    effect:
      "Dissolves the target’s Ki reserves. MR 120 to resist; failure causes Ki loss equal to the margin of failure.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  ProduceDamage: createSpell({
    name: "Produce Damage",
    level: 30,
    path: "destruction",
    action: "active",
    cost: 80,
    effect:
      "Automatically inflicts 40 direct damage unless the target passes MR 120. Damage Resistance multiplies the damage.",
    addedEffect: "+5 MR Difficulty and +10 damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  DestructionOfSenses: createSpell({
    name: "Destruction of Senses",
    level: 32,
    path: "destruction",
    action: "active",
    cost: 100,
    effect: "Removes chosen senses from the target. MR 100 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  MysticBolt: createSpell({
    name: "Mystic Bolt",
    level: 36,
    path: "destruction",
    action: "active",
    cost: 80,
    effect: "Energy Attack with Base Damage 100.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  UnravelTies: createSpell({
    name: "Unravel Ties",
    level: 38,
    path: "destruction",
    action: "active",
    cost: 100,
    effect:
      "Breaks summoning ties. If cast on the creature, only its tie is broken. If cast on the summoner, breaks one tie plus one more per 10 points of MR failure (MR 120).",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  DestroyResistances: createSpell({
    name: "Destroy Resistances",
    level: 40,
    path: "destruction",
    action: "active",
    cost: 80,
    effect: "Reduces all Resistances by the margin of failure on MR 120.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),
  UndoStates: createSpell({
    name: "Undo States",
    level: 42,
    path: "destruction",
    action: "active",
    cost: 120,
    effect:
      "Immediately removes any State (as defined in Chapter 14) from any number of targets whose combined Presence is ≤120. Cannot remove Critical penalties. MR 100 to resist.",
    addedEffect: "+5 MR Difficulty and +10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DomeOfDestruction: createSpell({
    name: "Dome of Destruction",
    level: 46,
    path: "destruction",
    action: "active",
    cost: 100,
    effect:
      "Unleashes a destructive dome of energy in a 30-foot radius. Energy Attack with Base Damage 80. Targets cannot be selected.",
    addedEffect: "+5 Base Damage and +15-foot radius.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  ZoneOfDecay: createSpell({
    name: "Zone of Decay",
    level: 48,
    path: "destruction",
    action: "active",
    cost: 140,
    effect:
      "Creates a 30-foot radius zone where all life decays. Anyone inside loses 10% of total LP unless they pass MR 100. Must check every turn.",
    addedEffect: "+15-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  AuraOfDestruction: createSpell({
    name: "Aura of Destruction",
    level: 50,
    path: "destruction",
    action: "active",
    cost: 150,
    effect:
      "Enchants an object or place with a destructive aura. Anyone touching it must pass MR 80 or lose LP equal to the failure margin. Affects objects up to Presence 60; aura extends 5 feet.",
    addedEffect: "+5 Presence, +5 feet, +5 MR Difficulty.",
    maintenance: "1 every 10 (15) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DestroyMemories: createSpell({
    name: "Destroy Memories",
    level: 52,
    path: "destruction",
    action: "active",
    cost: 140,
    effect:
      "Erases chosen memories from the target. Does not affect abilities. MR or PsR 100 to resist.",
    addedEffect: "+5 MR or PsR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  BlockLearning: createSpell({
    name: "Block Learning",
    level: 56,
    path: "destruction",
    action: "active",
    cost: 120,
    effect:
      "Prevents the target from learning or gaining XP. MR 120 to resist; only one retry per day.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (12) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Forbid: createSpell({
    name: "Forbid",
    level: 58,
    path: "destruction",
    action: "active",
    cost: 100,
    effect:
      "Prohibits the target from performing a specific Active Action. MR 120 to resist. Broad actions (attack, move) grant +10 to +30 MR bonus.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  DestroyPowers: createSpell({
    name: "Destroy Powers",
    level: 60,
    path: "destruction",
    action: "active",
    cost: 140,
    effect:
      "Prevents the target from using any magical, psychic, or Ki powers. Mystical beings lose supernatural powers (not natural abilities). MR 120 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  GreaterMysticBolt: createSpell({
    name: "Greater Mystic Bolt",
    level: 62,
    path: "destruction",
    action: "active",
    cost: 150,
    effect: "Energy Attack with Base Damage 150.",
    addedEffect: "+10 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Attack"
  }),

  DestroyWill: createSpell({
    name: "Destroy Will",
    level: 66,
    path: "destruction",
    action: "active",
    cost: 160,
    effect:
      "Affects a 30-foot radius. Anyone failing MR 120 loses the ability to make decisions and cannot take Active Actions.",
    addedEffect: "+15-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ZoneOfWeakness: createSpell({
    name: "Zone of Weakness",
    level: 68,
    path: "destruction",
    action: "active",
    cost: 200,
    effect:
      "Weakens reality in a 60-foot radius. All damage is doubled, Criticals always hit vulnerable points, structures lose Damage Barrier, and objects suffer –5 Fortitude. MR 140 to resist; only one retry per day.",
    addedEffect: "+5 MR Difficulty and +30-foot radius.",
    maintenance: "1 every 10 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  EssenceOfDestruction: createSpell({
    name: "Essence of Destruction",
    level: 70,
    path: "destruction",
    action: "active",
    cost: 150,
    effect:
      "Transforms the target’s body into destructive energy. Only supernatural attacks can harm them. Contact forces MR 80 or LP loss equal to failure margin. Affects Presence ≤100.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (15)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Death: createSpell({
    name: "Death",
    level: 72,
    path: "destruction",
    action: "active",
    cost: 200,
    effect:
      "Separates the soul from the body, killing the target. Works on spiritual and necromantic beings. MR or PhR 120 to resist.",
    addedEffect: "+5 MR or PhR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  DevouringZone: createSpell({
    name: "Devouring Zone",
    level: 76,
    path: "destruction",
    action: "active",
    cost: 250,
    effect:
      "Creates a 1,500-foot radius zone that erodes Presence. Each day inside, targets must pass MR or PhR 140 or lose 5 Presence. At 0 Presence, they disintegrate. Living beings also suffer All Action Penalty equal to twice Presence lost.",
    addedEffect: "+1,500-foot radius and +5 MR/PhR Difficulty.",
    maintenance: "1 every 10 (25) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  DestroyCapabilities: createSpell({
    name: "Destroy Capabilities",
    level: 78,
    path: "destruction",
    action: "active",
    cost: 150,
    effect:
      "Destroys 50 DP worth of abilities or powers from the target. Can remove supernatural powers or CP-based advantages (100 DP per CP). MR 120 to resist.",
    addedEffect: "+5 MR Difficulty and –10 DP.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  SeverExistence: createSpell({
    name: "Sever Existence",
    level: 80,
    path: "destruction",
    action: "active",
    cost: 340,
    effect:
      "Cuts through reality, annihilating anything touched. Can be a 30-foot line or a single point. MR 120 to resist, or MR 140 if focused on a point. Destroyed beings do not return to the Flow of Souls.",
    addedEffect: "+30-foot line length and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Spiritual"
  }),
  RainOfDestruction: createSpell({
    name: "Rain of Destruction",
    level: 82,
    path: "destruction",
    action: "active",
    cost: 250,
    effect:
      "Unleashes a storm of selective destructive blasts within a 150-foot radius, affecting only designated targets. Energy Attack with Base Damage 200. Targets damaged must pass MR 140 or lose additional LP equal to the failure margin.",
    addedEffect: "+30-foot radius, +5 Base Damage, +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Attack"
  }),

  DestructionOfZeon: createSpell({
    name: "Destruction of Zeon",
    level: 86,
    path: "destruction",
    action: "active",
    cost: 200,
    effect:
      "Dissipates the power of another active spell, reducing its Zeon value by 60. If reduced below its base cost, the spell ends.",
    addedEffect: "–5 Zeon from the affected spell.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),

  SweepFromTheHeavens: createSpell({
    name: "Sweep from the Heavens",
    level: 88,
    path: "destruction",
    action: "active",
    cost: 300,
    effect:
      "Steals the divine essence of an entity, reducing its Gnosis by 10 and disabling all Gnosis-based abilities. MR 120 to resist; no retries while active.",
    addedEffect: "–5 Gnosis and +5 MR Difficulty.",
    maintenance: "1 every 5 (60) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  Void: createSpell({
    name: "Void",
    level: 90,
    path: "destruction",
    action: "active",
    cost: 250,
    effect:
      "Creates a 15-foot radius sphere of absolute void that unmakes all matter. Pulls objects and beings within 50 meters using Strength 14. Each turn inside, targets must pass MR 120 or lose Zeon equal to failure margin, and PhR 120 or lose LP equal to failure margin. When Zeon reaches zero, Power begins to be permanently lost.",
    addedEffect: "+3-foot radius, +150-foot influence area, +5 MR/PhR Difficulty.",
    maintenance: "1 every 10 (25)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  GreaterDestruction: createSpell({
    name: "Greater Destruction",
    level: 92,
    path: "destruction",
    action: "active",
    cost: 350,
    effect:
      "Destroys inorganic objects on a massive scale. Can affect any number of objects as long as total Presence ≤100.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  DestroySouls: createSpell({
    name: "Destroy Souls",
    level: 96,
    path: "destruction",
    action: "active",
    cost: 500,
    effect:
      "Unleashes a wave that destroys the souls of all beings within 3 miles. Anyone failing MR 100 dies instantly with their soul disintegrated.",
    addedEffect: "+3-mile radius and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),

  Chaos: createSpell({
    name: "Chaos",
    level: 98,
    path: "destruction",
    action: "active",
    cost: 700,
    effect:
      "Shatters the order of reality within a 60-mile radius. Alters physics, emotions, instincts, weather, and time flow unpredictably. Automatically affects anyone with Gnosis ≤15.",
    addedEffect: "+60-mile radius and +1 Gnosis affected.",
    maintenance: "1 every 10 (70) Daily",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Automatic"
  }),

  Uncreation: createSpell({
    name: "Uncreation",
    level: 100,
    path: "destruction",
    action: "active",
    cost: 1000,
    effect:
      "Erases a chosen aspect of existence—an individual, a city, a race—from reality entirely. All memories and consequences are rewritten as if it never existed. Only beings with Gnosis >40 perceive the change. MR 140 to resist, using the highest Resistance among all affected.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Automatic"
  }),
  // Air
  RaiseWind: createSpell({
    name: "Raise Wind",
    level: 2,
    path: "air",
    action: "active",
    cost: 30,
    effect:
      "Raises wind up to 10 mph. Requires open space or natural drafts. Maximum wind width is 80 feet.",
    addedEffect: "+5 mph and +15 feet width.",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Move: createSpell({
    name: "Move",
    level: 6,
    path: "air",
    action: "active",
    cost: 30,
    effect:
      "Moves inanimate objects at a distance with speed equivalent to Flight Value 10. Maximum weight 60 pounds.",
    addedEffect: "+20 pounds.",
    maintenance: "1 every 10 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  WeightReduction: createSpell({
    name: "Weight Reduction",
    level: 10,
    path: "air",
    action: "active",
    cost: 40,
    effect: "Reduces the weight of a material body by 60 pounds.",
    addedEffect: "–20 pounds.",
    maintenance: "1 every 10 (4) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  StopBreathing: createSpell({
    name: "Stop Breathing",
    level: 12,
    path: "air",
    action: "passive",
    cost: 40,
    effect:
      "Target no longer needs to breathe and is immune to suffocation. Affects multiple targets up to 80 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (4) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  FreeMotion: createSpell({
    name: "Free Motion",
    level: 16,
    path: "air",
    action: "active",
    cost: 50,
    effect:
      "Allows movement along any solid surface, ignoring gravity. Walk on water, walls, ceilings. Affects up to 80 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  AirBlow: createSpell({
    name: "Air Blow",
    level: 20,
    path: "air",
    action: "active",
    cost: 40,
    effect:
      "Unleashes a blast of air (15-foot width) with Strength 6, or Strength 10 vs a single target. Deals damage equal to twice Strength bonus using Impact Attack Type.",
    addedEffect: "+1 Strength and +15-foot width.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  AirScreen: createSpell({
    name: "Air Screen",
    level: 22,
    path: "air",
    action: "passive",
    cost: 50,
    effect:
      "Creates an air barrier protecting against all attacks except Electricity or Energy. Imposes –50 to projectile attacks. Absorbs 300 damage.",
    addedEffect: "+100 Resistance Points.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  AutomaticTransportation: createSpell({
    name: "Automatic Transportation",
    level: 26,
    path: "air",
    action: "active",
    cost: 50,
    effect:
      "Teleports the target up to 150 feet, passing through non-energy physical objects. Affects up to 60 total Presence.",
    addedEffect: "+10 maximum Presence and +150 feet distance.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Flight: createSpell({
    name: "Flight",
    level: 30,
    path: "air",
    action: "active",
    cost: 60,
    effect: "Grants Flight Value 4. Above Flight 10, each +1 requires two Added Effects.",
    addedEffect: "+1 Flight Value.",
    maintenance: "1 every 5 (12) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ReactionIncrease: createSpell({
    name: "Reaction Increase",
    level: 32,
    path: "air",
    action: "active",
    cost: 60,
    effect:
      "Increases Initiative by +30. Above 200 Initiative, each +10 requires two Added Effects.",
    addedEffect: "+10 Initiative.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Electrify: createSpell({
    name: "Electrify",
    level: 36,
    path: "air",
    action: "active",
    cost: 80,
    effect:
      "Electrifies a body (Presence ≤40, size <3 feet). Anyone touching it must pass PhR 100 or lose LP equal to half failure margin. Electricity Attack Type.",
    addedEffect: "+5 PhR Difficulty, +5 Presence, +3 feet size.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  AirCut: createSpell({
    name: "Air Cut",
    level: 40,
    path: "air",
    action: "active",
    cost: 60,
    effect:
      "Creates a 10-foot line of cutting wind. Base Damage 80 using Cut Attack Type. Reduces enemy AT by 2.",
    addedEffect: "+5 feet to line.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  Speed: createSpell({
    name: "Speed",
    level: 42,
    path: "air",
    action: "active",
    cost: 80,
    effect:
      "Doubles the target’s Movement Value (feet per round). Affects up to 50 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Lightning: createSpell({
    name: "Lightning",
    level: 46,
    path: "air",
    action: "active",
    cost: 80,
    effect:
      "Strikes a target with 100 Base Damage lightning. Then bounces once to the nearest target within 15 feet for another identical attack.",
    addedEffect: "+1 bounce and +15-foot bounce range.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  Whirlwind: createSpell({
    name: "Whirlwind",
    level: 50,
    path: "air",
    action: "active",
    cost: 140,
    effect:
      "Creates a 10-foot radius whirlwind. All inside suffer a 180 Final Attack (Impact) with 40 Base Damage and must pass Strength/Agility vs 12 or be lifted. Victims inside suffer –60 All Action Penalty.",
    addedEffect: "+5-foot radius.",
    maintenance: "1 every 5 (28)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  EtherealForm: createSpell({
    name: "Ethereal Form",
    level: 52,
    path: "air",
    action: "active",
    cost: 100,
    effect:
      "Transforms the body into air, becoming intangible to matter and non-energy attacks. Visible only with high Notice/Search or magic sight. Affects Presence ≤100.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  AirControl: createSpell({
    name: "Air Control",
    level: 56,
    path: "air",
    action: "active",
    cost: 80,
    effect:
      "Grants control over air and gases within 150 feet. Can suffocate areas or redirect storms. Can control air beings if they fail MR 120.",
    addedEffect: "+80 feet range and +5 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ElectricityControl: createSpell({
    name: "Electricity Control",
    level: 60,
    path: "air",
    action: "active",
    cost: 80,
    effect:
      "Controls electrical sources up to 5 Intensities. Can control electricity beings if they fail MR 140.",
    addedEffect: "+1 Intensity and +5 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DefensiveMovement: createSpell({
    name: "Defensive Movement",
    level: 62,
    path: "air",
    action: "passive",
    cost: 120,
    effect:
      "Allows the caster to evade attacks using Magic Projection instead of Dodge, up to 3 times per turn. Grants Movement Value 8 for area-attack penalties.",
    addedEffect: "+1 Dodge per turn and +1 Movement Value.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  Teletransportation: createSpell({
    name: "Teletransportation",
    level: 66,
    path: "air",
    action: "active",
    cost: 150,
    effect:
      "Teleports targets up to 5 miles, passing through non-energy matter. Affects up to 80 total Presence.",
    addedEffect: "+10 maximum Presence and double distance.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),
  Immateriality: createSpell({
    name: "Immateriality",
    level: 70,
    path: "air",
    action: "active",
    cost: 120,
    effect:
      "Turns the target completely immaterial, intangible to all non‑energy creatures, objects, and attacks. They can pass through any non‑supernatural matter. Unwilling targets resist with MR 100. Affects Presence ≤80.",
    addedEffect: "+10 maximum Presence and +5 MR Difficulty.",
    maintenance: "1 every 10 (12) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Hurricane: createSpell({
    name: "Hurricane",
    level: 72,
    path: "air",
    action: "active",
    cost: 200,
    effect:
      "Creates a massive gale over a 1‑mile radius. Characters must pass Strength 12 or be swept away. Structures with Damage Barrier <60 are destroyed; those <120 take 10 damage per round. Victims remain airborne until the spell ends, then fall up to 300 feet.",
    addedEffect: "+150-foot radius.",
    maintenance: "1 every 20 (10)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  SolidAir: createSpell({
    name: "Solid Air",
    level: 76,
    path: "air",
    action: "active",
    cost: 140,
    effect:
      "Solidifies air into invisible, durable matter within an 80‑foot radius. Can form barriers, bridges, or traps. Only energy weapons can damage it (150 damage per 15 feet). Acts as Strength 14 for trapping.",
    addedEffect: "+80-foot radius.",
    maintenance: "1 every 20 (7)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  WeatherControl: createSpell({
    name: "Weather Control",
    level: 80,
    path: "air",
    action: "active",
    cost: 220,
    effect:
      "Allows full control of weather within a 3‑mile radius, gradually shaping any desired climate or meteorological condition.",
    addedEffect: "+3-mile radius.",
    maintenance: "1 every 5 (44) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  CreateSylph: createSpell({
    name: "Create Sylph",
    level: 82,
    path: "air",
    action: "active",
    cost: 250,
    effect:
      "Creates a Being Between Worlds of the Air element with 600 DP, following elemental rules. Maximum level follows the same rules as Create Being (Creation Path).",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  SuperiorPsychokinesis: createSpell({
    name: "Superior Psychokinesis",
    level: 86,
    path: "air",
    action: "active",
    cost: 160,
    effect:
      "Moves organic or inorganic bodies at a distance with speed equivalent to Flight 10. Can move up to 100 tons. Living beings may resist with MR 100.",
    addedEffect: "×2 maximum weight and +5 MR Difficulty.",
    maintenance: "1 every 5 (32) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  RelocateMagic: createSpell({
    name: "Relocate Magic",
    level: 90,
    path: "air",
    action: "active",
    cost: 180,
    effect:
      "Transfers the magical source of an active spell (Zeon ≤100) to a new location or target. Works on place‑, object‑, or individual‑based spells. Spiritual spells allow a new Resistance Check.",
    addedEffect: "+5 Zeon value affected.",
    maintenance: "1 every 10 (18) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  PassiveMagic: createSpell({
    name: "Passive Magic",
    level: 92,
    path: "air",
    action: "active",
    cost: 300,
    effect:
      "Envelops the caster in instinctive magic flow. All spells he casts become Passive Actions. Affects up to 80 Presence.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (30)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  LordOfTheAir: createSpell({
    name: "Lord of the Air",
    level: 96,
    path: "air",
    action: "active",
    cost: 300,
    effect:
      "Grants control over all air and electricity nuclei within 60 miles. Allows weather manipulation and control of all air‑based creatures unless they pass MR 140.",
    addedEffect: "+60-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  APlaceInTheWorld: createSpell({
    name: "A Place in the World",
    level: 100,
    path: "air",
    action: "active",
    cost: 450,
    effect:
      "Allows the caster to rearrange the position of any beings or objects—physical or spiritual—within a 30‑mile radius. Teletransports anything anywhere within the area. MR 140 to resist.",
    addedEffect: "+5-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (45)",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),
  // Water
  Spring: createSpell({
    name: "Spring",
    level: 2,
    path: "water",
    action: "active",
    cost: 30,
    effect:
      "Draws forth underground currents or streams, causing a spring to flow from a designated spot. Affects natural liquids within 300 feet but cannot pass energy barriers.",
    addedEffect: "+100-foot radius.",
    maintenance: "1 every 10 (3) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CreateChill: createSpell({
    name: "Create Chill",
    level: 6,
    path: "water",
    action: "active",
    cost: 30,
    effect: "Creates one intensity of cold or ice. Temperature remains stable while maintained.",
    addedEffect: "+1 cold or ice intensity.",
    maintenance: "1 every 10 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  AquaticCapability: createSpell({
    name: "Aquatic Capability",
    level: 10,
    path: "water",
    action: "active",
    cost: 50,
    effect:
      "Allows the target to breathe liquids, move underwater at full Movement Value, and resist all underwater pressure. Affects up to 50 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ColdImmunity: createSpell({
    name: "Cold Immunity",
    level: 12,
    path: "water",
    action: "active",
    cost: 50,
    effect:
      "Grants immunity to 5 intensities of cold. Each intensity reduces Base Damage by 5 and grants +5 to cold Resistance Checks.",
    addedEffect: "+1 cold intensity immunity.",
    maintenance: "1 every 20 (3) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ProtectionBubble: createSpell({
    name: "Protection Bubble",
    level: 16,
    path: "water",
    action: "passive",
    cost: 40,
    effect:
      "Creates a bubble that blocks all attacks with Base Damage <40. Any attack ≥40 destroys the bubble.",
    addedEffect: "+10 Base Damage threshold.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Defense"
  }),

  WaterImpact: createSpell({
    name: "Water Impact",
    level: 20,
    path: "water",
    action: "active",
    cost: 50,
    effect:
      "Unleashes a water burst with 40 Base Damage (Impact AT) and an additional Strength 8 impact. Strength can be increased; above 12 requires two Added Effects per +1.",
    addedEffect: "+5 damage and +1 Strength.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  LiquidControl: createSpell({
    name: "Liquid Control",
    level: 22,
    path: "water",
    action: "active",
    cost: 60,
    effect:
      "Controls one gallon of liquid, altering density, color, clarity, and movement. Can control water elementals (MR 100). Can manipulate bloodstreams, causing penalties and damage equal to half failure margin.",
    addedEffect: "Double liquid amount and +5 MR Difficulty.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  FreezeEmotions: createSpell({
    name: "Freeze Emotions",
    level: 26,
    path: "water",
    action: "active",
    cost: 60,
    effect:
      "Freezes emotional states, granting immunity to all emotional effects. Affects up to 50 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ControlCold: createSpell({
    name: "Control Cold",
    level: 30,
    path: "water",
    action: "active",
    cost: 50,
    effect:
      "Controls up to 5 intensities of cold or ice, reshaping or weakening them. Can control cold-based beings (MR 100).",
    addedEffect: "+1 cold intensity and +5 MR Difficulty.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  Freeze: createSpell({
    name: "Freeze",
    level: 32,
    path: "water",
    action: "active",
    cost: 60,
    effect:
      "Freezes targets in a 15-foot radius. MR 120 (or 140 if focused). Failure <20 = Minor Paralysis; <80 = Partial Paralysis; ≥80 = Total Paralysis.",
    addedEffect: "+15-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  IceScreen: createSpell({
    name: "Ice Screen",
    level: 36,
    path: "water",
    action: "passive",
    cost: 60,
    effect:
      "Creates an ice barrier with 400 HP. Reflects Light or Darkness energy attacks using the attacker’s own Final Attack Ability.",
    addedEffect: "+100 Damage Points.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  CreateLiquids: createSpell({
    name: "Create Liquids",
    level: 40,
    path: "water",
    action: "active",
    cost: 80,
    effect:
      "Creates two gallons of water or similar liquid. Higher-Presence liquids may be reduced. Cannot create mystical liquids.",
    addedEffect: "Double liquid amount.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  IceAttack: createSpell({
    name: "Ice Attack",
    level: 42,
    path: "water",
    action: "active",
    cost: 80,
    effect:
      "Releases a 100 Base Damage ice attack using either Cold or Thrust AT. Can damage energy.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  Crystallization: createSpell({
    name: "Crystallization",
    level: 46,
    path: "water",
    action: "active",
    cost: 80,
    effect:
      "Turns the target into brittle crystal. MR or PhR 140 to resist. Causes automatic Criticals; DR creatures treat entire body as vulnerable.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  ReflectedControl: createSpell({
    name: "Reflected Control",
    level: 50,
    path: "water",
    action: "active",
    cost: 80,
    effect:
      "Links the target’s body to the caster’s, forcing them to mimic all movements. MR 80 to resist; additional checks if forced into unnatural actions.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  LiquidBody: createSpell({
    name: "Liquid Body",
    level: 52,
    path: "water",
    action: "active",
    cost: 100,
    effect:
      "Transforms the body into liquid. Grants immunity to non-energy Thrust/Cut, halves Impact damage unless energy-based. Can pass through cracks. Vulnerable to cold (–20 to Resist). Affects Presence ≤100.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ReflectStates: createSpell({
    name: "Reflect States",
    level: 56,
    path: "water",
    action: "passive",
    cost: 120,
    effect:
      "Reflects any supernatural State affecting the caster or nearby ally back onto the originator. MR 120 to resist. Each State can only be reflected once.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  IceStorm: createSpell({
    name: "Ice Storm",
    level: 60,
    path: "water",
    action: "active",
    cost: 120,
    effect:
      "Creates a 150-foot radius ice storm. Every 5 turns, targets must pass PhR 140 or take 10 cold damage and –5 All Action Penalty (cumulative). Perception difficulties increase by two levels.",
    addedEffect: "+80-foot radius.",
    maintenance: "1 every 20 (6)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  TideControl: createSpell({
    name: "Tide Control",
    level: 62,
    path: "water",
    action: "active",
    cost: 150,
    effect:
      "Controls river and sea currents, alters flow strength, creates underwater quakes or tidal waves. Affects a 1,500-foot radius, movable by caster.",
    addedEffect: "+300-foot radius.",
    maintenance: "1 every 10 (15) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  WaterConfinement: createSpell({
    name: "Water Confinement",
    level: 66,
    path: "water",
    action: "active",
    cost: 140,
    effect:
      "Creates a 30×30×30-foot cube of water that engulfs targets. Victims move as if diving and may drown. Escape requires Strength 14 opposed check, with bonuses for Swim skill.",
    addedEffect: "+30-foot length.",
    maintenance: "1 every 20 (7)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),
  Glacier: createSpell({
    name: "Glacier",
    level: 70,
    path: "water",
    action: "active",
    cost: 200,
    effect:
      "Creates a massive glacial zone in a one‑mile radius, covering the area in ice and snow and dropping temperatures far below freezing. Natural weather cannot counteract the cold while maintained.",
    addedEffect: "+½‑mile radius.",
    maintenance: "1 every 5 (40) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Tsunami: createSpell({
    name: "Tsunami",
    level: 72,
    path: "water",
    action: "active",
    cost: 250,
    effect:
      "Raises a devastating mile‑long tsunami that destroys structures with Damage Barrier <80 and severely damages stronger ones. All individuals in the area suffer the natural consequences of the massive wave.",
    addedEffect: "+1‑mile length.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  SoulReflection: createSpell({
    name: "Soul Reflection",
    level: 76,
    path: "water",
    action: "active",
    cost: 200,
    effect:
      "Creates a spiritual duplicate of a creature with identical qualities except for powers requiring Gnosis >25. The reflection obeys the caster but can only manifest near the original. Affects Presence <40. MR 140 to resist.",
    addedEffect: "+5 maximum Presence and +5 MR Difficulty.",
    maintenance: "1 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  SlowTime: createSpell({
    name: "Slow Time",
    level: 80,
    path: "water",
    action: "active",
    cost: 200,
    effect:
      "Slows time within a 300‑foot radius. One minute inside equals one hour outside. The zone expands 30 feet per round until reaching full size. Only beings with Gnosis >30 may resist with MR 120.",
    addedEffect: "+150‑foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  CreateUndine: createSpell({
    name: "Create Undine",
    level: 82,
    path: "water",
    action: "active",
    cost: 250,
    effect:
      "Creates a Water elemental Being Between Worlds with 600 DP, following elemental rules. Maximum level follows Create Being rules from the Creation Path.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  FreezeMagic: createSpell({
    name: "Freeze Magic",
    level: 86,
    path: "water",
    action: "passive",
    cost: 250,
    effect:
      "Suspends active spells (Zeon ≤150), freezing their effects without dispelling them. Suspended spells require no maintenance and resume when Freeze Magic ends. Can suspend spells cast in the same round.",
    addedEffect: "+5 Zeon value affected.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  InsideTheMirror: createSpell({
    name: "Inside the Mirror",
    level: 90,
    path: "water",
    action: "active",
    cost: 300,
    effect:
      "Creates a mirrored duplicate of a territory up to 1,500‑foot radius, copying terrain, structures, flora, and weather. Living beings with Presence ≥20 are not duplicated. The caster creates any number of portals between worlds.",
    addedEffect: "+300‑foot radius.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  LordOfIce: createSpell({
    name: "Lord of Ice",
    level: 92,
    path: "water",
    action: "active",
    cost: 300,
    effect:
      "Grants control over all cold and ice nuclei within 60 miles. Can freeze weather and crystallize ice at will. Cold‑based creatures must pass MR 140 to resist domination.",
    addedEffect: "+60‑mile radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  LordOfWater: createSpell({
    name: "Lord of Water",
    level: 96,
    path: "water",
    action: "active",
    cost: 300,
    effect:
      "Grants absolute control over all liquid substances within 60 miles, allowing manipulation of oceans, rivers, and lakes. Water‑based creatures must pass MR 140 to resist domination.",
    addedEffect: "+60‑mile radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  APerfectWorld: createSpell({
    name: "A Perfect World",
    level: 100,
    path: "water",
    action: "active",
    cost: 450,
    effect:
      "Freezes reality itself, stopping time entirely. Only the caster can move, though he cannot regenerate Zeon. Only beings with Gnosis ≥35 may resist with MR 120.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 5 (90) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),
  // Fire
  CreateFire: createSpell({
    name: "Create Fire",
    level: 2,
    path: "fire",
    action: "active",
    cost: 30,
    effect:
      "Creates a magical flame of intensity 1 that requires no fuel. If placed on flammable material, it burns naturally after the spell ends.",
    addedEffect: "+1 fire intensity.",
    maintenance: "1 every 10 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  PutOutFire: createSpell({
    name: "Put Out Fire",
    level: 6,
    path: "fire",
    action: "active",
    cost: 30,
    effect:
      "Reduces fire or heat by 1 intensity. Fire beings take 5 damage per reduced intensity (MR 100). Accumulation creatures take 25 damage per intensity.",
    addedEffect: "–1 additional intensity and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  FireImmunity: createSpell({
    name: "Fire Immunity",
    level: 10,
    path: "fire",
    action: "active",
    cost: 50,
    effect:
      "Grants immunity to 5 fire intensities. Each intensity reduces Base Damage by 5 and grants +5 to fire Resistances.",
    addedEffect: "+1 intensity immunity.",
    maintenance: "1 every 20 (3) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DetectHeat: createSpell({
    name: "Detect Heat",
    level: 12,
    path: "fire",
    action: "active",
    cost: 60,
    effect:
      "Detects any heat source within 80 feet, including intensity and size. Can sense warm‑blooded creatures. Living beings may resist with MR 120.",
    addedEffect: "+30-foot radius and +10 MR Difficulty.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Detection"
  }),

  FireBall: createSpell({
    name: "Fire Ball",
    level: 16,
    path: "fire",
    action: "active",
    cost: 50,
    effect:
      "Projects a 50 Base Damage fire explosion in a 15-foot radius. Targets cannot be selected within the area. Heat Attack Type.",
    addedEffect: "+15-foot radius and +5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  ControlFire: createSpell({
    name: "Control Fire",
    level: 20,
    path: "fire",
    action: "active",
    cost: 50,
    effect:
      "Controls up to 5 fire intensities, altering flame properties. Can control fire beings if they fail MR 100.",
    addedEffect: "+1 fire intensity and +5 MR Difficulty.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  FireBarrier: createSpell({
    name: "Fire Barrier",
    level: 22,
    path: "fire",
    action: "active",
    cost: 50,
    effect:
      "Creates a 10×10‑foot wall of fire. Crossing it triggers an automatic attack (Final Attack 240, Base Damage 80, Heat AT). Can block water, cold, or fire attacks with 300 HP.",
    addedEffect: "+5 Base Damage, +5 feet size, +50 Resistance Points.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  IgneousWeapon: createSpell({
    name: "Igneous Weapon",
    level: 26,
    path: "fire",
    action: "active",
    cost: 50,
    effect:
      "Enchants a weapon with fire, converting its attacks to Heat AT and adding +10 Base Damage.",
    addedEffect: "+5 Base Damage.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  HeatWave: createSpell({
    name: "Heat Wave",
    level: 30,
    path: "fire",
    action: "active",
    cost: 60,
    effect:
      "Projects a 50 Base Damage heat wave. Invisible unless the target sees magic, has thermal vision, or passes an Absurd Notice Check.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  ReadTheAshes: createSpell({
    name: "Read the Ashes",
    level: 32,
    path: "fire",
    action: "active",
    cost: 60,
    effect:
      "Allows the caster to see one hour into the past to witness the cause of a fire. The caster is unaware of surroundings while using the spell.",
    addedEffect: "Double regression time.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  RaiseWeatherTemperature: createSpell({
    name: "Raise Weather Temperature",
    level: 36,
    path: "fire",
    action: "active",
    cost: 60,
    effect:
      "Raises temperature by 50°F in a one‑mile radius. Additional +50°F possible with Added Effects; beyond that, each +1°F costs two Added Effects.",
    addedEffect: "+1°F and +1,500-foot radius.",
    maintenance: "1 every 5 (12) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  FireMine: createSpell({
    name: "Fire Mine",
    level: 40,
    path: "fire",
    action: "active",
    cost: 80,
    effect:
      "Creates a mine that explodes in a 30-foot radius for 80 Base Damage (Heat AT). Final Attack: 240 (far), 280 (mid), 320 (near). Affects all targets including caster.",
    addedEffect: "+30-foot radius and +5 Base Damage.",
    maintenance: "1 every 5 (16) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  IncreaseCritical: createSpell({
    name: "Increase Critical",
    level: 42,
    path: "fire",
    action: "passive",
    cost: 60,
    effect: "Adds +20 to Critical Levels for specific attacks. Must be cast before rolling.",
    addedEffect: "+5 Critical Level.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Dry: createSpell({
    name: "Dry",
    level: 46,
    path: "fire",
    action: "active",
    cost: 80,
    effect:
      "Dries all wet bodies in a 15-foot radius. Water elementals take damage equal to twice failure (MR 100). Living beings take half failure as damage.",
    addedEffect: "+5 meters radius and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Melt: createSpell({
    name: "Melt",
    level: 50,
    path: "fire",
    action: "active",
    cost: 80,
    effect:
      "Heats inorganic objects within 150 feet. Objects failing PhR 60 melt in rounds equal to their Fortitude. Anyone touching them suffers injury.",
    addedEffect: "+30-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  BodyOfFire: createSpell({
    name: "Body of Fire",
    level: 52,
    path: "fire",
    action: "active",
    cost: 100,
    effect:
      "Transforms the target into fire. Immune to non‑energy, cold, and water attacks. Gains +30 heat Resistance. Contact forces PhR vs twice Presence or take half failure as damage. Affects Presence ≤60.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  VitalSacrifice: createSpell({
    name: "Vital Sacrifice",
    level: 56,
    path: "fire",
    action: "active",
    cost: 120,
    effect:
      "Allows sacrificing LP for bonuses: every 5 LP grants +5 to a physical roll. Max 40 LP per round. LP recover at 10/day. Can be cast on others.",
    addedEffect: "+10 maximum LP sacrificed per round.",
    maintenance: "1 every 20 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Incinerate: createSpell({
    name: "Incinerate",
    level: 60,
    path: "fire",
    action: "active",
    cost: 100,
    effect:
      "Calls fire down on targets within 150 feet. Attack gains +100 on Table 73: In Flames. MR 140 to resist.",
    addedEffect: "+10 Table 73 result, +5 MR Difficulty, +80-foot radius.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  ConsumeEssence: createSpell({
    name: "Consume Essence",
    level: 62,
    path: "fire",
    action: "active",
    cost: 120,
    effect:
      "Creates a destructive aura in 30 feet. MR 120 or lose LP and Zeon equal to failure. LP cannot be naturally healed; Zeon must be absorbed.",
    addedEffect: "+15-foot radius and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  PowerSacrifice: createSpell({
    name: "Power Sacrifice",
    level: 66,
    path: "fire",
    action: "active",
    cost: 120,
    effect:
      "Allows sacrificing Zeon for Magic Accumulation: every 10 Zeon grants +5 MA until end of turn. Max 20 Zeon per round.",
    addedEffect: "+5 maximum Zeon sacrificed per round.",
    maintenance: "1 every 20 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),
  DirectCritical: createSpell({
    name: "Direct Critical",
    level: 70,
    path: "fire",
    action: "active",
    cost: 100,
    effect:
      "Causes an internal explosion in the target, inflicting an automatic Level 120 Critical. The target may defend with PhR as normal. MR 140 to resist the spell entirely.",
    addedEffect: "+10 Critical Level and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  MagicForCapacities: createSpell({
    name: "Magic for Capacities",
    level: 72,
    path: "fire",
    action: "active",
    cost: 120,
    effect:
      "Allows the caster to sacrifice Zeon to temporarily increase Characteristics. Every 20 Zeon grants +1 to a chosen Characteristic until end of turn. Max 40 Zeon per round.",
    addedEffect: "+10 maximum Zeon sacrificed per turn.",
    maintenance: "1 every 20 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  FireStorm: createSpell({
    name: "Fire Storm",
    level: 76,
    path: "fire",
    action: "active",
    cost: 150,
    effect:
      "Creates an 80-foot radius fire storm that burns everything inside. Each turn, all within suffer an automatic attack (Final Attack 240, Base Damage 100, Heat AT). Affects all targets including the caster.",
    addedEffect: "+80-foot radius.",
    maintenance: "1 every 10 (15)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  ConsumeLifeForMagic: createSpell({
    name: "Consume Life for Magic",
    level: 80,
    path: "fire",
    action: "active",
    cost: 120,
    effect:
      "Allows sacrificing Life Points to recover Zeon. Every 5 LP grants 50 Zeon. LP recover at 10/day. Max 20 LP per round. DR creatures multiply LP spent by their DR multiple.",
    addedEffect: "+10 maximum LP sacrificed per round.",
    maintenance: "1 every 20 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  CreateIfreet: createSpell({
    name: "Create Ifreet",
    level: 82,
    path: "fire",
    action: "active",
    cost: 250,
    effect:
      "Creates a Fire elemental Being Between Worlds with 600 DP, following elemental rules. Maximum level follows Create Being rules from the Creation Path.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  Pyre: createSpell({
    name: "Pyre",
    level: 86,
    path: "fire",
    action: "active",
    cost: 250,
    effect:
      "Creates 10 levels of fire intensity that burn without consuming fuel. If placed on flammable material, it burns naturally after the spell ends.",
    addedEffect: "+5 fire intensity levels.",
    maintenance: "1 every 10 (25) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Devastation: createSpell({
    name: "Devastation",
    level: 90,
    path: "fire",
    action: "active",
    cost: 200,
    effect:
      "Creates a massive 200 Base Damage fire explosion in a 1,500-foot radius. Cannot select targets. Heat Attack Type; can damage energy.",
    addedEffect: "+1,500-foot radius.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Attack"
  }),

  SacrificingOthers: createSpell({
    name: "Sacrificing Others",
    level: 92,
    path: "fire",
    action: "active",
    cost: 250,
    effect:
      "Binds others’ Life Points and Zeon to the caster, allowing him to use them for sacrifice spells (Vital Sacrifice, Magic for Capacities, Power Sacrifice, Consume Life for Magic). Affects any number of targets within 1 mile. MR 120 to resist.",
    addedEffect: "+1,500-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  LordOfFire: createSpell({
    name: "Lord of Fire",
    level: 96,
    path: "fire",
    action: "active",
    cost: 300,
    effect:
      "Grants control over all heat nuclei within 200 miles, including planetary magma. Can trigger volcanic eruptions. Fire beings must pass MR 140 to resist domination.",
    addedEffect: "+60-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  Armageddon: createSpell({
    name: "Armageddon",
    level: 100,
    path: "fire",
    action: "active",
    cost: 450,
    effect:
      "Incinerates all existence—physical and spiritual—within a 5-mile radius. All entities must pass MR 140 every minute or be annihilated. No life can exist or be created in the area while maintained.",
    addedEffect: "+2-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 5 (90) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),
  // Earth
  DetectMinerals: createSpell({
    name: "Detect Minerals",
    level: 2,
    path: "earth",
    action: "active",
    cost: 20,
    effect:
      "Detects the location of a specific mineral within 30 feet, including approximate size and purity. Cannot penetrate energy barriers.",
    addedEffect: "+5 meters radius.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  MineralControl: createSpell({
    name: "Mineral Control",
    level: 6,
    path: "earth",
    action: "active",
    cost: 30,
    effect:
      "Moves, reshapes, and controls mineral substances with Presence ≤30. Can control mineral creatures if they fail MR 100.",
    addedEffect: "+10 maximum Presence and +5 MR Difficulty.",
    maintenance: "1 every 10 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  WeightIncrement: createSpell({
    name: "Weight Increment",
    level: 10,
    path: "earth",
    action: "active",
    cost: 40,
    effect: "Increases a physical body’s weight by 20 kg.",
    addedEffect: "+10 kg.",
    maintenance: "1 every 10 (4) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  TransformMineral: createSpell({
    name: "Transform Mineral",
    level: 12,
    path: "earth",
    action: "passive",
    cost: 40,
    effect:
      "Transforms one mineral into another (e.g., limestone → gold). Affects up to 20 pounds of material with Presence ≤30.",
    addedEffect: "+5 maximum Presence and +20 pounds.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Firmness: createSpell({
    name: "Firmness",
    level: 16,
    path: "earth",
    action: "active",
    cost: 50,
    effect:
      "Enhances endurance. Living beings gain +20 PhR vs Critical effects; objects gain +2 Fortitude. Affects one target.",
    addedEffect: "+5 PhR or +1 Fortitude.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  StoneBarrier: createSpell({
    name: "Stone Barrier",
    level: 20,
    path: "earth",
    action: "passive",
    cost: 60,
    effect:
      "Creates a stone barrier that blocks all damaging attacks, including energy. Has 600 HP and Damage Barrier 60. Does not block MR/PsR effects.",
    addedEffect: "+100 Resistance Points and +5 Damage Barrier.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  Slowness: createSpell({
    name: "Slowness",
    level: 22,
    path: "earth",
    action: "active",
    cost: 60,
    effect: "Slows the target. MR 120 or Initiative –50 and Movement Value –2.",
    addedEffect: "+5 MR Difficulty, –5 Initiative, –1 Movement.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  Shell: createSpell({
    name: "Shell",
    level: 26,
    path: "earth",
    action: "active",
    cost: 80,
    effect:
      "Creates a physical shell granting AT 2 against all attacks except energy. No Initiative penalty for extra armor.",
    addedEffect: "+1 Armor Type.",
    maintenance: "1 every 5 (16) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  MagneticShield: createSpell({
    name: "Magnetic Shield",
    level: 30,
    path: "earth",
    action: "passive",
    cost: 50,
    effect:
      "Repels metallic attacks (arrows, bullets, blades). Attackers suffer –50 to offense. Shield has 300 HP and only energy can damage it.",
    addedEffect: "+100 Resistance Points.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Defense"
  }),

  PassThroughSolidMatter: createSpell({
    name: "Pass Through Solid Matter",
    level: 32,
    path: "earth",
    action: "active",
    cost: 80,
    effect:
      "Allows targets to pass through non‑energy solid objects. They remain vulnerable to heat/cold. Affects up to 100 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  EarthSpike: createSpell({
    name: "Earth Spike",
    level: 36,
    path: "earth",
    action: "active",
    cost: 80,
    effect:
      "Erupts up to two stone spikes (60 Base Damage, Thrust AT). Cannot affect immaterial or energy‑only beings unless enchanted.",
    addedEffect: "+1 additional spike.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  Breakage: createSpell({
    name: "Breakage",
    level: 40,
    path: "earth",
    action: "active",
    cost: 60,
    effect: "Increases a weapon’s or object’s Breakage by +4.",
    addedEffect: "+1 Breakage.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Telemetry: createSpell({
    name: "Telemetry",
    level: 42,
    path: "earth",
    action: "active",
    cost: 120,
    effect:
      "Reads the history of an object or person touched, revealing major events from the past year. MR 80 to resist.",
    addedEffect: "+5 MR Difficulty and +1 year history.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  MagneticControl: createSpell({
    name: "Magnetic Control",
    level: 46,
    path: "earth",
    action: "active",
    cost: 100,
    effect:
      "Controls metal within 80 feet with Strength 13 (or 8 for partial/energy‑shielded metals). Can paralyze armored foes or disarm them.",
    addedEffect: "+80-foot radius.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Forge: createSpell({
    name: "Forge",
    level: 50,
    path: "earth",
    action: "active",
    cost: 160,
    effect:
      "Magically forges objects with Forging 100, ignoring time modifiers and equipment needs. Materials must be provided.",
    addedEffect: "+5 Forging ability.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  SolidBody: createSpell({
    name: "Solid Body",
    level: 52,
    path: "earth",
    action: "active",
    cost: 100,
    effect:
      "Turns the body stone‑solid: natural AT 6 (non‑energy), Damage Barrier 100, Strength +2, Movement –2. Affects Presence ≤100.",
    addedEffect: "+10 maximum Presence, +1 AT, +10 Damage Barrier.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Resistance: createSpell({
    name: "Resistance",
    level: 56,
    path: "earth",
    action: "active",
    cost: 100,
    effect:
      "Grants 500 temporary LP and allows use of Damage Resistance rules. Target cannot use defense abilities while active.",
    addedEffect: "+50 extra LP.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Petrify: createSpell({
    name: "Petrify",
    level: 60,
    path: "earth",
    action: "active",
    cost: 140,
    effect:
      "Turns the target into stone. MR 120 to resist. Target is unconscious and immobile. Damage to statue harms the real body. Reroll allowed after 1 day, then weekly.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (7) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Fissure: createSpell({
    name: "Fissure",
    level: 62,
    path: "earth",
    action: "active",
    cost: 150,
    effect:
      "Creates a fissure 10 ft wide, 30 ft long, 60–150 ft deep. Targets must pass Agility or fall. Structures with DB >40 are unaffected.",
    addedEffect: "+10 ft length, +3 ft width, +5 DB threshold.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  ReverseGravity: createSpell({
    name: "Reverse Gravity",
    level: 66,
    path: "earth",
    action: "active",
    cost: 200,
    effect:
      "Reverses gravity in an 80‑foot radius, causing everything to fall upward up to 150 feet. MR 120 to resist.",
    addedEffect: "+30 meters radius and height.",
    maintenance: "1 every 5 (40) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  MineralCreation: createSpell({
    name: "Mineral Creation",
    level: 70,
    path: "earth",
    action: "active",
    cost: 120,
    effect:
      "Creates any mineral or metal object with Presence ≤40. The object must appear in a logically appropriate location.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (12) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  TerrainErudition: createSpell({
    name: "Terrain Erudition",
    level: 72,
    path: "earth",
    action: "active",
    cost: 120,
    effect:
      "Reveals complete knowledge of everything in contact with the ground within a 1,200‑foot radius, including constructions and living beings. Does not penetrate energy‑sealed areas.",
    addedEffect: "+600-foot radius.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  Earthquake: createSpell({
    name: "Earthquake",
    level: 76,
    path: "earth",
    action: "active",
    cost: 150,
    effect:
      "Creates a devastating tremor in a 1,600‑foot radius. Constructions with DB <40 are destroyed instantly; others take 5 damage first round, doubling each subsequent round. All individuals suffer falling debris effects.",
    addedEffect: "+800-foot radius.",
    maintenance: "1 every 10 (15)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  GravityDestruction: createSpell({
    name: "Gravity Destruction",
    level: 80,
    path: "earth",
    action: "active",
    cost: 180,
    effect:
      "Creates a 60‑foot radius gravity bubble that crushes trapped beings. Each round, targets must pass PhR 180 or take damage equal to half failure. Escape requires Strength vs 16. Immaterial beings are partially affected (+40 Resist, +6 Strength).",
    addedEffect: "+15-foot radius.",
    maintenance: "1 every 10 (18)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  CreateGolem: createSpell({
    name: "Create Golem",
    level: 82,
    path: "earth",
    action: "active",
    cost: 250,
    effect:
      "Creates an Earth elemental Being Between Worlds with 600 DP, following elemental rules. Maximum level follows Create Being rules from the Creation Path.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  GravityIncrement: createSpell({
    name: "Gravity Increment",
    level: 86,
    path: "earth",
    action: "active",
    cost: 200,
    effect:
      "Doubles the weight of everything within a 1,500‑foot radius. Each Added Effect increases the multiplier by +1 (triple, quadruple, etc.).",
    addedEffect: "+1 weight multiplier.",
    maintenance: "1 every 10 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  Meteor: createSpell({
    name: "Meteor",
    level: 90,
    path: "earth",
    action: "active",
    cost: 200,
    effect:
      "Calls down a meteor. Impact zone (30 ft): 100 Impact + 100 Heat Base Damage. Expansion wave (30–150 ft): Strength 14 + 60 Base Damage. Meteor lands in 1d10+4 rounds. Additional meteors land 1d10 rounds later.",
    addedEffect: "+1 additional meteor.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  GravityControl: createSpell({
    name: "Gravity Control",
    level: 92,
    path: "earth",
    action: "active",
    cost: 350,
    effect:
      "Grants absolute control over gravity within 60 miles. Can increase, decrease, or reverse gravity up to ×10. Everything in the area is affected.",
    addedEffect: "+30-mile radius.",
    maintenance: "1 every 5 (70) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),

  OneWithTheEarth: createSpell({
    name: "One with the Earth",
    level: 96,
    path: "earth",
    action: "active",
    cost: 300,
    effect:
      "Merges the caster with the world, granting total control over minerals and metals within 60 miles. Can reshape terrain (mountains, valleys, rivers). Stone creatures must pass MR 140 to resist.",
    addedEffect: "+60-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 5 (60) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  AtomicControl: createSpell({
    name: "Atomic Control",
    level: 100,
    path: "earth",
    action: "active",
    cost: 450,
    effect:
      "Grants total control over atomic matter within 300 feet. Affects any physical being or object failing MR or PhR 140. Can reshape, transform, or disintegrate matter entirely. Does not affect souls or fully immaterial beings.",
    addedEffect: "+15-foot radius and +5 MR/PhR Difficulty.",
    maintenance: "1 every 10 (45)",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),
  // Essence
  NaturalAffinity: createSpell({
    name: "Natural Affinity",
    level: 2,
    path: "essence",
    action: "active",
    cost: 30,
    effect:
      "Alters the target’s essence so natural beings recognize them as one of their own (e.g., wolves treat them as a wolf). Affects up to 60 Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DetectEssence: createSpell({
    name: "Detect Essence",
    level: 6,
    path: "essence",
    action: "active",
    cost: 30,
    effect:
      "Detects the base essence of beings within 30 feet, identifying elemental affinity or race. Can detect invisible spiritual beings. MR 100 to resist.",
    addedEffect: "+5 meters radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  CommunicationThroughEssence: createSpell({
    name: "Communication Through Essence",
    level: 10,
    path: "essence",
    action: "active",
    cost: 30,
    effect:
      "Creates a spiritual communication link with any living being, including plants and animals. Affects beings with Presence <40.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 5 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  NaturalKnowledge: createSpell({
    name: "Natural Knowledge",
    level: 12,
    path: "essence",
    action: "active",
    cost: 40,
    effect:
      "Analyzes natural beings (plants/animals), revealing toxicity, special properties, etc. Affects Presence <30.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  Healing: createSpell({
    name: "Healing",
    level: 16,
    path: "essence",
    action: "active",
    cost: 80,
    effect:
      "Restores 30% of lost LP to one target. Stops bleeding but cannot restore limbs or remove Critical penalties. DR beings recover half.",
    addedEffect: "+5% LP restored.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  SoulBarrier: createSpell({
    name: "Soul Barrier",
    level: 20,
    path: "essence",
    action: "active",
    cost: 60,
    effect:
      "Creates a barrier that blocks Spiritual attacks requiring MR/PhR checks below Difficulty 120. Does not block damaging attacks.",
    addedEffect: "+5 to Resistances that can be blocked.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Defense"
  }),

  ShareSenses: createSpell({
    name: "Share Senses",
    level: 22,
    path: "essence",
    action: "active",
    cost: 60,
    effect:
      "Links sight and hearing between caster and others within 1 mile. MR/PsR 100 to resist. Affects up to 100 total Presence.",
    addedEffect: "+5 maximum Presence, +5 MR/PsR Difficulty, +1 mile range.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ModifyEssence: createSpell({
    name: "Modify Essence",
    level: 26,
    path: "essence",
    action: "active",
    cost: 50,
    effect:
      "Temporarily alters a being’s elemental essence (e.g., earth → cold). Removes powers tied to the original element. MR 140 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  SoulPoison: createSpell({
    name: "Soul Poison",
    level: 30,
    path: "essence",
    action: "active",
    cost: 60,
    effect:
      "Creates a supernatural poison in the target’s soul (level ≤20). Effects follow Chapter 14 rules. Can also create antidotes.",
    addedEffect: "+5 poison level.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  AnalyzeSoul: createSpell({
    name: "Analyze Soul",
    level: 32,
    path: "essence",
    action: "active",
    cost: 60,
    effect:
      "Reveals a being’s innate powers, spiritual potential, and natural capacities. Does not reveal learned skills. MR 120 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  AcquireNaturalCapacities: createSpell({
    name: "Acquire Natural Capacities",
    level: 36,
    path: "essence",
    action: "active",
    cost: 120,
    effect:
      "Grants 50 DP to acquire natural abilities/powers from plants or animals (Gnosis 0 only). Only physical secondary abilities allowed. May alter appearance.",
    addedEffect: "+5 DP.",
    maintenance: "1 every 5 (24) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  Revitalize: createSpell({
    name: "Revitalize",
    level: 40,
    path: "essence",
    action: "active",
    cost: 100,
    effect:
      "Creates a 130-foot radius zone where all living beings regenerate as if they had Regeneration 16.",
    addedEffect: "+60-foot radius.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  LifeMind: createSpell({
    name: "Life Mind",
    level: 42,
    path: "essence",
    action: "active",
    cost: 120,
    effect:
      "Links the caster’s essence to any living being with Gnosis ≤10 within 1,500 feet. Caster perceives through the target and may cast spells through them at half MA. MR 80 to resist.",
    addedEffect: "+300-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 20 (6)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  AlterGrowth: createSpell({
    name: "Alter Growth",
    level: 46,
    path: "essence",
    action: "active",
    cost: 100,
    effect:
      "Doubles or halves the aging rate of a being with Presence ≤60. MR 100 to resist. Cannot stop time entirely.",
    addedEffect: "Further doubles/halves growth and +5 maximum Presence.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  NaturalImitation: createSpell({
    name: "Natural Imitation",
    level: 50,
    path: "essence",
    action: "active",
    cost: 60,
    effect:
      "Creates natural animals under the caster’s control. Creates up to 2 creature levels (one level‑2 or two level‑1 animals).",
    addedEffect: "+1 creature level.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  SpiritualForm: createSpell({
    name: "Spiritual Form",
    level: 52,
    path: "essence",
    action: "active",
    cost: 100,
    effect:
      "Turns the target into spiritual matter: invisible to non‑spirit sight, intangible to non‑energy matter, no need for food/water/air. Affects Presence ≤60.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  NaturalControl: createSpell({
    name: "Natural Control",
    level: 56,
    path: "essence",
    action: "active",
    cost: 100,
    effect:
      "Grants absolute control over a Gnosis 0 being (animal, plant, or human). MR 80 to resist. New check daily or when given unnatural orders.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 5 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  StateInduction: createSpell({
    name: "State Induction",
    level: 60,
    path: "essence",
    action: "active",
    cost: 100,
    effect:
      "Induces any generic State except death (e.g., paralysis, fear). MR 80 to resist. +40 bonus if inducing Coma or Complete Paralysis.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ReturnToTheFlow: createSpell({
    name: "Return to the Flow",
    level: 62,
    path: "essence",
    action: "active",
    cost: 100,
    effect:
      "Sends a spirit back to the Flow of Souls. Destroys undead. Affects dead souls awaiting the Calling. MR 120 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ShieldArea: createSpell({
    name: "Shield Area",
    level: 66,
    path: "essence",
    action: "active",
    cost: 120,
    effect:
      "Creates a 60-foot radius zone that certain beings cannot enter. Forbidden beings must pass MR 120 to enter; retry allowed hourly.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (12) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),
  SupernaturalControl: createSpell({
    name: "Supernatural Control",
    level: 70,
    path: "essence",
    action: "active",
    cost: 120,
    effect:
      "Grants total control over a spirit or Being Between Worlds. Orders are transmitted directly through essence, not mind. MR 80 to resist. New check daily or when given unnatural orders.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 5 (24) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ShareEssence: createSpell({
    name: "Share Essence",
    level: 72,
    path: "essence",
    action: "active",
    cost: 140,
    effect:
      "Binds two beings’ essences. All damage and spiritual effects suffered by one affect the other. Both use the highest MR between them. Presence total ≤100. MR 120 to resist.",
    addedEffect: "+5 MR Difficulty and +10 maximum Presence.",
    maintenance: "1 every 10 (14) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  TransmigrateSoul: createSpell({
    name: "Transmigrate Soul",
    level: 76,
    path: "essence",
    action: "active",
    cost: 180,
    effect:
      "Transfers a soul into a new host (living being, object, or corpse). If host already has a soul, both roll 1d100 + Presence to determine dominance. Affects souls with Presence ≤60. MR 100 to resist.",
    addedEffect: "+5 MR Difficulty and +10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  SpiritualExistence: createSpell({
    name: "Spiritual Existence",
    level: 80,
    path: "essence",
    action: "active",
    cost: 200,
    effect:
      "Transforms the caster permanently into a Gnosis 25 spiritual being. Grants 150 DP (100 must buy Spirit State; 50 for Natural Abilities or Being Creation powers). Cannot be cast on existing spirits.",
    addedEffect: "+10 DP and +5 optional DP in disadvantages.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  SpiritCreation: createSpell({
    name: "Spirit Creation",
    level: 82,
    path: "essence",
    action: "active",
    cost: 250,
    effect:
      "Creates a Spirit under the caster’s control. Developed as a Spirit per Chapter 26. Has 600 DP; maximum level follows Create Being rules.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  TieVitalEssence: createSpell({
    name: "Tie Vital Essence",
    level: 86,
    path: "essence",
    action: "active",
    cost: 200,
    effect:
      "Binds a soul to a physical object. The target cannot die from LP loss but remains vulnerable to damage. If the object is destroyed or moves more than 1 mile away, the target dies. Object Presence ≤30. MR 100 to resist.",
    addedEffect: "+5 maximum Presence, +5 MR Difficulty, +1 mile distance.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Greenness: createSpell({
    name: "Greenness",
    level: 90,
    path: "essence",
    action: "active",
    cost: 250,
    effect:
      "Merges the caster with Nature, allowing creation of plants and animals of existing species within a 5‑mile radius. Life appears instantly but may not survive long-term without natural conditions.",
    addedEffect: "+5-mile radius.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),

  LifeDominion: createSpell({
    name: "Life Dominion",
    level: 92,
    path: "essence",
    action: "active",
    cost: 300,
    effect:
      "Grants absolute control over all Natural beings within 60 miles. Orders are transmitted mystically. MR 100 to resist; new check daily or when given unnatural orders.",
    addedEffect: "+60-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 5 (60) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  Resurrection: createSpell({
    name: "Resurrection",
    level: 96,
    path: "essence",
    action: "active",
    cost: 400,
    effect:
      "Retrieves a soul from the Flux and returns it to life. Must be placed in a suitable body (often via Transmigrate Soul). Only works if soul Presence ≤30 and death occurred <1 month ago. Cannot resurrect destroyed or reincarnated souls.",
    addedEffect: "+5 maximum Presence and ×2 allowable time since death.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  LordOfTheSouls: createSpell({
    name: "Lord of the Souls",
    level: 100,
    path: "essence",
    action: "active",
    cost: 600,
    effect:
      "Grants dominion over all souls and Spiritual Beings within 60 miles. Can separate souls from bodies, influence reincarnation, and command spirits. MR 120 to resist; +40 MR bonus when resisting soul separation.",
    addedEffect: "+5 MR Difficulty and +60-mile radius.",
    maintenance: "1 every 5 (120) Daily",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Automatic"
  }),
  // Illusion
  IllusorySound: createSpell({
    name: "Illusory Sound",
    level: 2,
    path: "illusion",
    action: "active",
    cost: 30,
    effect:
      "Creates any sound, including voices, within 60 feet. Targets must pass MR 100 to disbelieve. Caster chooses who hears it.",
    addedEffect: "+30-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 50 (1)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  IllusorySmell: createSpell({
    name: "Illusory Smell",
    level: 6,
    path: "illusion",
    action: "active",
    cost: 30,
    effect:
      "Creates an illusory scent within 60 feet. Targets must pass MR 100 to disbelieve. Caster chooses who perceives it.",
    addedEffect: "+30-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 50 (1)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  IllusoryTouch: createSpell({
    name: "Illusory Touch",
    level: 10,
    path: "illusion",
    action: "active",
    cost: 30,
    effect:
      "Alters the perceived touch or taste of an element within 60 feet. MR 100 to disbelieve. Caster chooses who perceives it.",
    addedEffect: "+30-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 50 (1)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  VisualIllusion: createSpell({
    name: "Visual Illusion",
    level: 12,
    path: "illusion",
    action: "active",
    cost: 40,
    effect:
      "Creates a static false image up to 5 sq ft. MR 100 to disbelieve. Caster chooses who sees it.",
    addedEffect: "+5 sq ft volume and +5 MR Difficulty.",
    maintenance: "1 every 50 (1)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  DetectIllusion: createSpell({
    name: "Detect Illusion",
    level: 16,
    path: "illusion",
    action: "active",
    cost: 60,
    effect: "Detects all illusions with Zeon ≤80 within 150 feet.",
    addedEffect: "+30-foot radius and +10 Zeon value.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Detection"
  }),

  SweetTalk: createSpell({
    name: "Sweet Talk",
    level: 20,
    path: "illusion",
    action: "active",
    cost: 50,
    effect: "Enhances charisma. Grants +50 to Leadership and Persuasion.",
    addedEffect: "+10 to Leadership and Persuasion.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  AlterAppearance: createSpell({
    name: "Alter Appearance",
    level: 22,
    path: "illusion",
    action: "active",
    cost: 60,
    effect:
      "Changes appearance of a being or object, adjusting Size/Appearance by ±2 levels. MR 120 to disbelieve.",
    addedEffect: "+10 MR Difficulty.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  IllusoryInvisibility: createSpell({
    name: "Illusory Invisibility",
    level: 26,
    path: "illusion",
    action: "active",
    cost: 60,
    effect:
      "Makes beings or objects invisible. Affects up to 140 total Presence. MR 120 to see through the illusion.",
    addedEffect: "+5 MR Difficulty and +10 maximum Presence.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  MirrorImage: createSpell({
    name: "Mirror Image",
    level: 30,
    path: "illusion",
    action: "active",
    cost: 80,
    effect:
      "Creates 8 illusory copies within 15 feet. They mimic the target’s actions. Energy attacks destroy images. MR 120 to disbelieve.",
    addedEffect: "+5 MR Difficulty and +2 images.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  TotalIllusion: createSpell({
    name: "Total Illusion",
    level: 32,
    path: "illusion",
    action: "active",
    cost: 80,
    effect:
      "Creates a full multisensory illusion of an inanimate object up to 5 sq ft. MR 120 to disbelieve. Destroyed by Energy attacks.",
    addedEffect: "+5 sq ft volume and +5 MR Difficulty.",
    maintenance: "1 every 50 (2)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  Confusion: createSpell({
    name: "Confusion",
    level: 36,
    path: "illusion",
    action: "active",
    cost: 50,
    effect:
      "Overloads all senses of one target. MR 120 to resist. Failure applies penalty equal to failure margin to perception abilities; failure >40 adds –20 All Action Penalty.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  CreateIllusoryBeing: createSpell({
    name: "Create Illusory Being",
    level: 40,
    path: "illusion",
    action: "active",
    cost: 60,
    effect:
      "Creates a level‑1 illusory being (max 2 levels above caster). Exists in a 60‑foot radius zone. MR 120 to disbelieve. Cannot affect physical reality.",
    addedEffect: "+5 MR Difficulty, +1 level, +5-foot radius.",
    maintenance: "1 every 20 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  ResistanceToIllusions: createSpell({
    name: "Resistance to Illusions",
    level: 42,
    path: "illusion",
    action: "active",
    cost: 80,
    effect: "Grants +30 MR against illusions. Does not stack.",
    addedEffect: "+10 MR vs illusions.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DetectLie: createSpell({
    name: "Detect Lie",
    level: 46,
    path: "illusion",
    action: "active",
    cost: 80,
    effect: "Automatically detects deliberate lies. Liar must pass MR/PsR 120 to conceal the lie.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  GhostlyIllusion: createSpell({
    name: "Ghostly Illusion",
    level: 50,
    path: "illusion",
    action: "active",
    cost: 120,
    effect:
      "Creates ghostly objects (Presence ≤60). MR 120 to disbelieve. Uses Ghostly Spell rules.",
    addedEffect: "+5 maximum Presence and +5 MR Difficulty.",
    maintenance: "1 every 20 (6)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  DistortDetection: createSpell({
    name: "Distort Detection",
    level: 52,
    path: "illusion",
    action: "active",
    cost: 120,
    effect:
      "Distorts all supernatural detection within 150 feet. Detecting characters must pass MR 120 or receive false results.",
    addedEffect: "+150-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (12) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  Lie: createSpell({
    name: "Lie",
    level: 56,
    path: "illusion",
    action: "active",
    cost: 100,
    effect:
      "Forces targets to believe anything the caster says. MR 120 to resist; new check each hour. +40 MR bonus for absurd lies.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  DestroyIllusions: createSpell({
    name: "Destroy Illusions",
    level: 60,
    path: "illusion",
    action: "active",
    cost: 80,
    effect: "Destroys any Illusion spell with Zeon ≤60.",
    addedEffect: "+5 Zeon value affected.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  GhostlyBeing: createSpell({
    name: "Ghostly Being",
    level: 62,
    path: "illusion",
    action: "active",
    cost: 80,
    effect:
      "Creates a level‑4 ghostly being (max 3 levels above caster). MR 120 to disbelieve. Uses Ghostly Spell rules.",
    addedEffect: "+5 MR Difficulty and +1 level.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  Gullibility: createSpell({
    name: "Gullibility",
    level: 66,
    path: "illusion",
    action: "active",
    cost: 80,
    effect:
      "Weakens target’s Resistances vs Illusion spells. MR 120 or suffer penalty to future MR/PsR equal to failure margin.",
    addedEffect: "+10 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),
  GhostlyAttack: createSpell({
    name: "Ghostly Attack",
    level: 70,
    path: "illusion",
    action: "active",
    cost: 100,
    effect:
      "Projects a 100 Base Damage energy discharge using Ghostly Spell rules. MR 120 to avoid damage. Cannot clash with other discharges due to its unreal nature.",
    addedEffect: "+5 MR Difficulty and +5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Attack"
  }),

  TheGiftOfLying: createSpell({
    name: "The Gift of Lying",
    level: 72,
    path: "illusion",
    action: "active",
    cost: 140,
    effect:
      "Forces the target to lie about everything or a chosen subject. MR/PsR 120 to resist. New check each day.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (14) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  IllusoryLife: createSpell({
    name: "Illusory Life",
    level: 76,
    path: "illusion",
    action: "active",
    cost: 140,
    effect:
      "Implants false memories indistinguishable from real ones. MR/PsR 120 to resist. New check only when the target has reason to doubt their memories.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (14) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  MajorIllusion: createSpell({
    name: "Major Illusion",
    level: 80,
    path: "illusion",
    action: "active",
    cost: 250,
    effect:
      "Creates a massive illusion affecting all five senses within a 1‑mile radius. MR 120 to resist. Affected characters only recheck when they doubt the illusion.",
    addedEffect: "+500-meter radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (25) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  FixIllusion: createSpell({
    name: "Fix Illusion",
    level: 82,
    path: "illusion",
    action: "active",
    cost: 250,
    effect:
      "Makes an Illusion spell permanent by adding 1,000 Zeon Maintenance Points to it. Cannot be used on Free Access spells.",
    addedEffect: "+50 Zeon to the maintained spell.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  IllusionOfTheSenses: createSpell({
    name: "Illusion of the Senses",
    level: 86,
    path: "illusion",
    action: "active",
    cost: 200,
    effect:
      "Forces a target to believe any illusion as absolute reality. Can simulate paralysis, wounds, bonuses, or even death. MR/PsR 120 to resist.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (20)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  NonExistence: createSpell({
    name: "Non-existence",
    level: 90,
    path: "illusion",
    action: "active",
    cost: 220,
    effect:
      "Makes the target undetectable by all natural senses. Leaves no tracks or traces. Only supernatural detection can reveal them. MR 120 to resist.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (22) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic"
  }),

  DeceiveDeath: createSpell({
    name: "Deceive Death",
    level: 92,
    path: "illusion",
    action: "active",
    cost: 500,
    effect:
      "Prevents the Flow of Souls from claiming the target. They cannot die, though their body can still be destroyed. Does not protect against soul‑destroying effects. Affects Presence ≤80.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 5 (100) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  WorldOfLies: createSpell({
    name: "World of Lies",
    level: 96,
    path: "illusion",
    action: "active",
    cost: 500,
    effect:
      "Creates a 1‑mile radius artificial reality where all illusions gain Ghostly status. MR 140 to resist. Caster may create up to 100 levels of Ghostly Beings (none above half his level).",
    addedEffect: "+5 MR Difficulty, +50 levels for beings, ×2 radius.",
    maintenance: "1 every 5 (100) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),

  FalseReality: createSpell({
    name: "False Reality",
    level: 100,
    path: "illusion",
    action: "active",
    cost: 600,
    effect:
      "Creates a fabricated event or circumstance and makes it real in the present moment. Does not alter true history but changes current reality. MR 120 to disbelieve, using the highest Resistance among affected entities.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Automatic"
  }),
  // Necromancy
  FeelDeath: createSpell({
    name: "Feel Death",
    level: 2,
    path: "necromancy",
    action: "active",
    cost: 30,
    effect: "Detects any death within 300 feet. Reveals undead if they fail MR 120.",
    addedEffect: "+80-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Detection"
  }),

  SeeTheGreatBeyond: createSpell({
    name: "See the Great Beyond",
    level: 6,
    path: "necromancy",
    action: "active",
    cost: 30,
    effect:
      "Allows seeing specters and spiritual beings. Can affect multiple targets up to 80 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  ControlScavengers: createSpell({
    name: "Control Scavengers",
    level: 8,
    path: "necromancy",
    action: "active",
    cost: 40,
    effect:
      "Controls scavenger creatures (vultures, crows, maggots) within 30 feet, up to 20 total Presence.",
    addedEffect: "+30-foot radius.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  SpectralShield: createSpell({
    name: "Spectral Shield",
    level: 10,
    path: "necromancy",
    action: "passive",
    cost: 40,
    effect: "Blocks Spiritual attacks requiring MR/PhR ≤140. Does not block physical damage.",
    addedEffect: "+5 Resistance threshold.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  DrainLife: createSpell({
    name: "Drain Life",
    level: 12,
    path: "necromancy",
    action: "active",
    cost: 50,
    effect:
      "Touch attack. MR 80 or lose LP equal to failure margin; caster heals same amount (DR creatures lose ×5 LP but caster only heals 1/5).",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  NecromanticDetection: createSpell({
    name: "Necromantic Detection",
    level: 16,
    path: "necromancy",
    action: "active",
    cost: 50,
    effect: "Detects living or undead within 60 feet. MR 120 to remain hidden.",
    addedEffect: "+30-foot radius and +10 MR Difficulty.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Detection"
  }),

  TalkToTheDead: createSpell({
    name: "Talk to the Dead",
    level: 18,
    path: "necromancy",
    action: "active",
    cost: 60,
    effect:
      "Communicates with spirits within 80 feet, Presence <40. Does not require knowing their location.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  NecromanticParalysis: createSpell({
    name: "Necromantic Paralysis",
    level: 20,
    path: "necromancy",
    action: "active",
    cost: 60,
    effect:
      "Freezes undead essence. Undead within 60 feet suffer Total Paralysis unless they pass MR 120.",
    addedEffect: "+10-meter radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  Necromitude: createSpell({
    name: "Necromitude",
    level: 22,
    path: "necromancy",
    action: "active",
    cost: 80,
    effect: "Heals an undead creature for 50 LP. No effect on living beings.",
    addedEffect: "+5 LP healed.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DeathBeam: createSpell({
    name: "Death Beam",
    level: 26,
    path: "necromancy",
    action: "active",
    cost: 60,
    effect: "Projects an 80 Base Damage necromantic Energy AT attack.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack"
  }),

  RaiseCorpses: createSpell({
    name: "Raise Corpses",
    level: 28,
    path: "necromancy",
    action: "active",
    cost: 80,
    effect:
      "Animates corpses as zombies/skeletons. Up to 100 total Presence; no individual corpse >20 Presence.",
    addedEffect: "+20 total Presence and +5 max Presence.",
    maintenance: "1 every 20 (4) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DeadBody: createSpell({
    name: "Dead Body",
    level: 30,
    path: "necromancy",
    action: "active",
    cost: 80,
    effect:
      "Suspends bodily functions without killing the target. Halves physical penalties and hides true condition. Affects up to 40 Presence.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  DrainMagic: createSpell({
    name: "Drain Magic",
    level: 32,
    path: "necromancy",
    action: "active",
    cost: 60,
    effect: "MR 100 or lose Zeon equal to twice failure margin; caster absorbs the Zeon.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  DestroyTheUndead: createSpell({
    name: "Destroy the Undead",
    level: 36,
    path: "necromancy",
    action: "active",
    cost: 80,
    effect:
      "MR 120 or undead suffers damage equal to twice failure margin (×DR multiple for DR creatures).",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  DrainCharacteristics: createSpell({
    name: "Drain Characteristics",
    level: 38,
    path: "necromancy",
    action: "active",
    cost: 80,
    effect:
      "Touch attack. MR 120 or lose 1 point of chosen Characteristic per 10 failure margin. Caster gains drained points (conversion 3:1 if victim’s stat < caster’s).",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  ControlTheDead: createSpell({
    name: "Control the Dead",
    level: 40,
    path: "necromancy",
    action: "active",
    cost: 100,
    effect: "Controls undead within 60 feet. MR 120 to resist. Mindless undead cannot break free.",
    addedEffect: "+30-foot radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),
  WitherLife: createSpell({
    name: "Wither Life",
    level: 42,
    path: "necromancy",
    action: "active",
    cost: 80,
    effect:
      "Creates a necromantic aura that instantly kills inferior life forms (small animals, plants). Living beings with Presence <20 within 30 feet rot away.",
    addedEffect: "+5 meters radius.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic"
  }),

  NecromanticShield: createSpell({
    name: "Necromantic Shield",
    level: 46,
    path: "necromancy",
    action: "passive",
    cost: 80,
    effect:
      "Forms a shield of dead souls that absorbs up to 1,000 damage of any type before breaking.",
    addedEffect: "+100 Resistance Points.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense"
  }),

  DominateLife: createSpell({
    name: "Dominate Life",
    level: 48,
    path: "necromancy",
    action: "passive",
    cost: 140,
    effect:
      "Enslaves a living being’s soul. MR 100 to resist. New check daily or when given an unnatural order.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 5 (28) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  VampireStigma: createSpell({
    name: "Vampire Stigma",
    level: 50,
    path: "necromancy",
    action: "active",
    cost: 140,
    effect:
      "Target absorbs 10% of all damage they deal (2% vs DR creatures). Works on physical attacks, spells, and supernatural powers.",
    addedEffect: "+5% absorption (+1% vs DR).",
    maintenance: "1 every 20 (7)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  SpectralForm: createSpell({
    name: "Spectral Form",
    level: 52,
    path: "necromancy",
    action: "active",
    cost: 100,
    effect:
      "Transforms the caster into a burning spectral mass. Contact forces MR/PhR vs twice Presence or suffer LP loss and All Action Penalty. Only Energy attacks can harm the caster. Affects Presence ≤100.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  NecromanticModification: createSpell({
    name: "Necromantic Modification",
    level: 56,
    path: "necromancy",
    action: "active",
    cost: 100,
    effect:
      "Grants temporary Powers/Abilities. Undead gain 100 DP; living gain 50 DP. Does not stack.",
    addedEffect: "+10 DP.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  SummonTheDead: createSpell({
    name: "Summon the Dead",
    level: 58,
    path: "necromancy",
    action: "active",
    cost: 100,
    effect:
      "Summons spirits still tied to the world. Can selectively call specific souls. Total Presence ≤50.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect"
  }),

  RaiseSpecters: createSpell({
    name: "Raise Specters",
    level: 60,
    path: "necromancy",
    action: "active",
    cost: 200,
    effect:
      "Corrupts recently deceased souls into specters. Each specter is half its living Level (rounded up) and gains 100 DP as a Gnosis 20 being. Total Presence ≤100; no individual >30.",
    addedEffect: "+20 total Presence and +5 max Presence.",
    maintenance: "1 every 10 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  DrainLifeForce: createSpell({
    name: "Drain Life Force",
    level: 62,
    path: "necromancy",
    action: "active",
    cost: 180,
    effect:
      "MR 100 or lose 1 Constitution and 1 Power Point per 10 failure margin. Target ages according to failure. Absorbed points rejuvenate the recipient.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Kill: createSpell({
    name: "Kill",
    level: 66,
    path: "necromancy",
    action: "active",
    cost: 100,
    effect:
      "Stops bodily functions, causing instant death. MR or PhR 80 to survive. Does not affect spirits or some Beings Between Worlds.",
    addedEffect: "+5 MR/PhR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual"
  }),

  SoulBeam: createSpell({
    name: "Soul Beam",
    level: 68,
    path: "necromancy",
    action: "active",
    cost: 140,
    effect:
      "Projects a 100 Base Damage Energy AT attack composed of withered souls. Only affects beings with souls.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Attack"
  }),

  NecromanticChimera: createSpell({
    name: "Necromantic Chimera",
    level: 70,
    path: "necromancy",
    action: "active",
    cost: 250,
    effect:
      "Creates an undead chimera (Being Between Worlds, 600 DP, Gnosis 25). Must be assembled from corpse parts possessing desired abilities.",
    addedEffect: "+50 DP.",
    maintenance: "1 every 10 (25) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  LifePerversion: createSpell({
    name: "Life Perversion",
    level: 72,
    path: "necromancy",
    action: "active",
    cost: 180,
    effect:
      "Transforms a living being into an undead creature with Physical Exemption. MR 100 to resist.",
    addedEffect: "+5 MR/PhR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  Vassalage: createSpell({
    name: "Vassalage",
    level: 76,
    path: "necromancy",
    action: "active",
    cost: 250,
    effect:
      "Binds an undead creature’s soul to the necromancer. If the caster dies, the creature dies. MR/PhR 80 to resist.",
    addedEffect: "+5 MR/PhR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Spiritual"
  }),

  DrainSouls: createSpell({
    name: "Drain Souls",
    level: 78,
    path: "necromancy",
    action: "active",
    cost: 200,
    effect:
      "MR 120 or target loses Presence equal to half failure margin. Every 5 Presence lost = –1 Level. If Presence reaches 0, soul is extinguished. Every 10 Presence absorbed grants +1 Characteristic or 10 DP (temporary).",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual"
  }),

  SurpassDeath: createSpell({
    name: "Surpass Death",
    level: 80,
    path: "necromancy",
    action: "active",
    cost: 300,
    effect:
      "Allows a living being to transcend death at the moment of dying, becoming an undead entity (Being Between Worlds or Spirit) with Gnosis 25 and 150 DP.",
    addedEffect: "+10 DP and +5 optional DP in disadvantages.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),
  TrueRise: createSpell({
    name: "True Rise",
    level: 82,
    path: "necromancy",
    action: "active",
    cost: 320,
    effect:
      "Raises a corpse while preserving all knowledge, powers, and abilities it had in life. The creature becomes an undead without a true soul. Affects corpses with Presence <30. Cannot be used on someone already resurrected once by this spell.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  WellOfLife: createSpell({
    name: "Well of Life",
    level: 86,
    path: "necromancy",
    action: "active",
    cost: 300,
    effect:
      "Creates a 150-foot radius field of dark energy. The caster absorbs half of all Life Points lost by living beings within the area, healing himself. Does not deal damage by itself.",
    addedEffect: "+50-foot radius.",
    maintenance: "1 every 10 (30)",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect"
  }),

  CursedLand: createSpell({
    name: "Cursed Land",
    level: 88,
    path: "necromancy",
    action: "active",
    cost: 350,
    effect:
      "Corrupts a one-mile radius of land. Any creature that dies within the area is instantly resurrected as an undead under the caster’s control. One in 100 becomes a specter. Undead cannot leave the area without losing the magic sustaining them.",
    addedEffect: "+1-mile radius.",
    maintenance: "1 every 10 (35) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect"
  }),

  Sustenance: createSpell({
    name: "Sustenance",
    level: 90,
    path: "necromancy",
    action: "active",
    cost: 200,
    effect:
      "Allows undead created or maintained by the caster to persist even after their original maintenance spell ends. Affects any number of undead up to 60 total Presence.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect"
  }),

  RawMaterial: createSpell({
    name: "Raw Material",
    level: 92,
    path: "necromancy",
    action: "active",
    cost: 350,
    effect:
      "Creates necromantic material equivalent to 1,000 human bodies, used for future resurrection spells. Can also represent fewer bodies of more powerful creatures.",
    addedEffect: "+1,000 additional bodies.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect"
  }),

  LordOfTheDead: createSpell({
    name: "Lord of the Dead",
    level: 96,
    path: "necromancy",
    action: "active",
    cost: 300,
    effect:
      "Subdues all undead within 60 miles. Undead must pass MR 140 to resist. Those who succeed never need to roll again unless their Resistances change.",
    addedEffect: "+60-mile radius and +5 MR Difficulty.",
    maintenance: "1 every 5 (60) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic"
  }),

  ComeBackFromTheDead: createSpell({
    name: "Come Back from the Dead",
    level: 96,
    path: "necromancy",
    action: "active",
    cost: 400,
    effect:
      "Returns a deceased creature’s spirit to the world, even if it has returned to the Flow of Souls. The being returns as an undead with its soul intact. If the body exists, it reinhabits it; otherwise it becomes a new body or a specter. Presence ≤30 and death <1 month.",
    addedEffect: "+5 maximum Presence and ×2 allowable time since death.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic"
  }),

  TheAwakening: createSpell({
    name: "The Awakening",
    level: 100,
    path: "necromancy",
    action: "active",
    cost: 900,
    effect:
      "Corrupts the world itself, raising all deceased beings with Presence <50 across the entire world. Most return as corpses or specters; 1 in 10,000 returns with full faculties. All are under the caster’s control.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Automatic"
  })
};
//#endregion

//#region Free Access Spells
export const ABF_FREE_ACCESS_SPELLS = {
  tie: createFASpell({
    name: "Tie",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 40,
    effect:
      "This spell causes chains, ropes, or any type of string to be knotted with a 140 Base Ability in Sleight of Hand. The caster may command strings to tie a subject up, in which case the target will have to fight off an automatic attack of Absurd Difficulty, following the rules of Trapping (this is to say, he would receive a direct attack with a final ability of 180). The Strength of the binding depends on the material used. Just as a reference, a very thick rope would have Strength of 10, whereas metallic chains would have Strength 12. Note that strings are not created by the spell.",
    addedEffect: "+10 to Sleight of Hand ability.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction", path2: "illusion" }
  }),
  createFire: createFASpell({
    name: "Create Fire",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 40,
    effect:
      "This spell creates a single fire intensity if cast upon a flammable substance. If fire catches on, it will not be necessary to maintain the spell.",
    addedEffect: "+1 fire intensity.",
    maintenance: "1 every 10 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "water" }
  }),

  opening: createFASpell({
    name: "Opening",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 30,
    effect:
      "This spell allows the caster to open any closed door. If the door is blocked, the spell will try to force it by employing a Lock Picking ability of 80.",
    addedEffect: "+10 to Lock Picking.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction", path2: "fire" }
  }),

  moveObjects: createFASpell({
    name: "Move Objects",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 30,
    effect:
      "This spell moves inorganic objects without the need of physical contact, granting them a Flight Value of 10. Maximum weight affected is 50 pounds.",
    addedEffect: "+20 pounds",
    maintenance: "1 every 10 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction", path2: "earth" }
  }),

  stopFall: createFASpell({
    name: "Stop Fall",
    minLevel: 1,
    maxLevel: 10,
    action: "passive",
    cost: 40,
    effect:
      "This spell cancels the effects of falling from great heights, eliminating the impact from a 150 foot distance. It may affect several individuals simultaneously, provided their total Presence does not exceed 60.",
    addedEffect: "+30 extra feet of fall and +10 maximum Presence.",
    maintenance: "1 every 10 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  cleanliness: createFASpell({
    name: "Cleanliness",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 30,
    effect:
      "This spell removes any minor physical impurity such as dirt or bad smell from the target’s body or clothes. It can also clean places or objects. Affects up to Presence 50.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  magicDetection: createFASpell({
    name: "Magic Detection",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 40,
    effect:
      "Automatically detects any source of magic in an 80-foot radius. Hidden magic is detected with Magic Appraisal 140.",
    addedEffect: "+10 Magic Appraisal and +80 feet radius.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "darkness" }
  }),

  createMusic: createFASpell({
    name: "Create Music",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 40,
    effect:
      "Creates music audible in a 30-foot radius, performed with a Music Ability of 80. Can only play pieces the caster is familiar with.",
    addedEffect: "+25 meters range and +5 Music Ability.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  undoWriting: createFASpell({
    name: "Undo Writing",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 40,
    effect:
      "Erases up to 500 characters of text without damaging the material. Affects objects with Presence less than 30.",
    addedEffect: "+5 maximum Presence and +100 characters.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "creation" }
  }),

  staticMessage: createFASpell({
    name: "Static Message",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 30,
    effect:
      "Creates a written message on an object or place. The caster can make it appear or disappear at will. 40‑word limit.",
    addedEffect: "+10 words limit.",
    maintenance: "1 every 20 (2) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  jump: createFASpell({
    name: "Jump",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 50,
    effect:
      "Enhances the target’s Jump Ability by +50 and allows reaching Inhuman Difficulty Levels.",
    addedEffect: "+20 to Jump Ability.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  changeColor: createFASpell({
    name: "Change Color",
    minLevel: 1,
    maxLevel: 10,
    action: "active",
    cost: 30,
    effect: "Changes the color of objects or people with Presence ≤ 40. Resisted with MR 100.",
    addedEffect: "+5 MR Difficulty and +5 maximum Presence.",
    maintenance: "1 every 20 (2) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "destruction" }
  }),

  createSounds: createFASpell({
    name: "Create Sounds",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 40,
    effect: "Creates a sound in a specific place up to 150 feet away.",
    addedEffect: "+50 feet.",
    maintenance: "1 every 10 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  fog: createFASpell({
    name: "Fog",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 60,
    effect:
      "Creates fog in a 300-foot radius. Density is controlled by the caster. Wind can move or disperse it.",
    addedEffect: "+50 feet radius.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "fire" }
  }),

  breatheLiquids: createFASpell({
    name: "Breathe Liquids",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 40,
    effect: "Allows targets to breathe in liquid environments. Affects total Presence ≤ 80.",
    addedEffect: "+20 maximum Presence.",
    maintenance: "1 every 10 (4) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth", path2: "fire" }
  }),

  enchant: createFASpell({
    name: "Enchant",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 50,
    effect:
      "Enchants an object or place with Presence ≤ 50, allowing it to affect intangible beings or spells.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 20 (3) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  recreateImage: createFASpell({
    name: "Recreate Image",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 40,
    effect: "Recreates a previously seen image as a transparent hologram up to 5 square feet.",
    addedEffect: "+5 square feet.",
    maintenance: "1 every 10 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  repair: createFASpell({
    name: "Repair",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 60,
    effect:
      "Repairs an inorganic object entirely if fragments or raw materials are present. Affects Presence < 30.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction", path2: "illusion" }
  }),

  climb: createFASpell({
    name: "Climb",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 50,
    effect: "Enhances Climb Ability by +50 and allows Inhuman Difficulty climbs.",
    addedEffect: "+20 Climb Ability.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "air" }
  }),

  passWithoutLeavingTrace: createFASpell({
    name: "Pass Without Leaving Trace",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 60,
    effect:
      "Eliminates physical traces. Tracking requires an Inhuman-level Track Check. Affects total Presence ≤ 120.",
    addedEffect: "+20 maximum Presence.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect",
    closedPaths: { path1: "light" }
  }),

  slipperyArea: createFASpell({
    name: "Slippery Area",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 50,
    effect:
      "Creates a 15-foot radius slippery area requiring Acrobatics or Athleticism checks to cross.",
    addedEffect: "+5 meters to area.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "fire" }
  }),

  attractMinorVermins: createFASpell({
    name: "Attract Minor Vermins",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 30,
    effect:
      "Summons up to 60 pounds of small vermin to a designated spot. Does not create or control them.",
    addedEffect: "+20 pounds.",
    maintenance: "1 every 20 (2)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  infiniteBag: createFASpell({
    name: "Infinite Bag",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 40,
    effect:
      "Allows a container to hold up to ten times its normal capacity without increasing its weight.",
    addedEffect: "+5 additional times its storage capacity.",
    maintenance: "1 every 10 (4) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  inhumanity: createFASpell({
    name: "Inhumanity",
    minLevel: 10,
    maxLevel: 20,
    action: "active",
    cost: 50,
    effect:
      "Allows targets to achieve Inhuman-difficulty results if their abilities permit. Affects total Presence ≤ 60.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (5) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  closeWithMagic: createFASpell({
    name: "Close with Magic",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 100,
    effect:
      "Automatically closes any door or lock, increasing the Difficulty to open it by one degree up to Inhuman.",
    addedEffect: "+1 Difficulty Level.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  causeFear: createFASpell({
    name: "Cause Fear",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 100,
    effect: "All creatures within 15 feet fall prey to magical fear unless they pass MR 100.",
    addedEffect: "+5 meters radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "light" }
  }),

  understandLanguages: createFASpell({
    name: "Understand Languages",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 100,
    effect:
      "Grants temporary proficiency in a previously unknown language. Affects total Presence ≤ 80.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 5 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  net: createFASpell({
    name: "Net",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 60,
    effect:
      "Creates a sticky magical net with radius 10 feet, Strength 10, and 500 Resistance Points.",
    addedEffect: "+5 feet radius and +50 Resistance Points.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  serenity: createFASpell({
    name: "Serenity",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 50,
    effect:
      "Induces tranquility, canceling fear, terror, or rage unless supernatural. Resisted with MR 120.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "fire", path2: "darkness" }
  }),
  magicShield: createFASpell({
    name: "Magic Shield",
    minLevel: 20,
    maxLevel: 30,
    action: "passive",
    cost: 60,
    effect:
      "Creates a magical shield that protects the caster from all attacks, including supernatural ones. It can withstand up to 300 points of damage before breaking.",
    addedEffect: "+50 Resistance Points.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Defense",
    closedPaths: { path1: "none" }
  }),

  magicalProtection: createFASpell({
    name: "Magical Protection",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 60,
    effect:
      "Grants AT 2 against all attacks except Energy-based ones. Can be layered with other protection without Initiative penalties.",
    addedEffect: "+1 AT.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  clouds: createFASpell({
    name: "Clouds",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 80,
    effect:
      "Forms a thick layer of clouds with a 300-foot radius. The caster can move or shape them freely.",
    addedEffect: "+60 feet to radius.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "fire", path2: "earth" }
  }),

  sendMessage: createFASpell({
    name: "Send Message",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 80,
    effect: "Sends an oral message of 500 words or less to a familiar person up to 60 miles away.",
    addedEffect: "+60 miles range and +100 words.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  speed: createFASpell({
    name: "Speed",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 80,
    effect: "Raises a subject’s Movement Value by one degree and grants +20 Initiative.",
    addedEffect: "+10 Initiative and +1 Movement Value.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  levitation: createFASpell({
    name: "Levitation",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 50,
    effect:
      "Allows targets to levitate vertically with Flight Value 4. Affects total Presence ≤ 80.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  contraceptiveProtection: createFASpell({
    name: "Contraceptive Protection",
    minLevel: 20,
    maxLevel: 30,
    action: "active",
    cost: 60,
    effect: "Prevents sexually transmitted diseases and pregnancy. Affects total Presence ≤ 80.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  resistanceToPain: createFASpell({
    name: "Resistance to Pain",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 60,
    effect: "Applies a +60 bonus to Withstand Pain checks.",
    addedEffect: "+20 Withstand Pain.",
    maintenance: "1 every 10 (6) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "essence" }
  }),

  trueClose: createFASpell({
    name: "True Close",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect:
      "Obstructs any door, shutter, or window with Presence ≤ 20. Cannot be opened physically while maintained.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 20 (4) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  purification: createFASpell({
    name: "Purification",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect:
      "Eliminates harmful substances such as poisons up to Level 30. Affects total Presence ≤ 80.",
    addedEffect: "+10 Poison Level and +10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "creation" }
  }),

  extendPresence: createFASpell({
    name: "Extend Presence",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 100,
    effect:
      "Extends the caster’s Presence up to 15 feet away, allowing distant interaction. Presence is intangible and only harmed by Energy attacks.",
    addedEffect: "+5 meters range.",
    maintenance: "1 every 5 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  alterSize: createFASpell({
    name: "Alter Size",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect: "Increases or decreases the target’s Size by up to 2 points. Resisted with MR 120.",
    addedEffect: "Increase or decrease 1 additional Size point and +5 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "destruction" }
  }),

  invokeAggressiveness: createFASpell({
    name: "Invoke Aggressiveness",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect:
      "Increases aggressiveness in all living creatures within 60 feet. Resisted with MR or PsR 80.",
    addedEffect: "+10 meters radius and +5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "light" }
  }),

  changeOfOutlook: createFASpell({
    name: "Change of Outlook",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect:
      "Modifies the target’s face and body within Size limits. Resisted with MR 100; rechecked daily.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect, Spiritual",
    closedPaths: { path1: "destruction" }
  }),

  healDiseases: createFASpell({
    name: "Heal Diseases",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect: "Eliminates any illness of Level 30 or below. Affects total Presence ≤ 80.",
    addedEffect: "+10 Disease Level and +10 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  magicBeam: createFASpell({
    name: "Magic Beam",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 60,
    effect: "Projects a magical energy discharge using Energy AT with Base Damage 40.",
    addedEffect: "+5 Base Damage.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Attack",
    closedPaths: { path1: "creation" }
  }),

  eliminateDreams: createFASpell({
    name: "Eliminate Dreams",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 80,
    effect:
      "Suppresses an individual's ability to dream. Affects Presence ≤ 60. Resisted with MR 120.",
    addedEffect: "+5 MR Difficulty and +5 maximum Presence.",
    maintenance: "1 every 20 (4) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "light", path2: "darkness" }
  }),

  senseFeelings: createFASpell({
    name: "Sense Feelings",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 60,
    effect:
      "Detects a specific feeling in an individual within 150 feet. Resisted with MR or PsR 120.",
    addedEffect: "+10 meters radius and +5 MR/PsR Difficulty.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Detection",
    closedPaths: { path1: "none" }
  }),

  eliminateSpells: createFASpell({
    name: "Eliminate Spells",
    minLevel: 30,
    maxLevel: 40,
    action: "active",
    cost: 150,
    effect: "Destroys another active spell with a Zeonic value below 60.",
    addedEffect: "+5 Zeonic value affected.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "creation" }
  }),

  friendship: createFASpell({
    name: "Friendship",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 80,
    effect: "Creates a bond of friendship between two characters. Resisted with MR or PsR 120.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "darkness" }
  }),

  quickTransport: createFASpell({
    name: "Quick Transport",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 60,
    effect:
      "Transports the target up to 80 feet and allows passing through non-energy physical bodies. Affects Presence ≤ 50.",
    addedEffect: "+80 feet range and +5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  sendDreams: createFASpell({
    name: "Send Dreams",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 120,
    effect: "Sends images and words to a sleeping person’s subconscious. Affects Presence ≤ 50.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "none" }
  }),

  readMinds: createFASpell({
    name: "Read Minds",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 100,
    effect:
      "Allows the caster to delve into a subject’s memories or thoughts. Resisted with MR or PsR 80.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "darkness" }
  }),

  cancelMagic: createFASpell({
    name: "Cancel Magic",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 150,
    effect: "Cancels the effects of all spells in a 30-foot radius with Zeonic value below 60.",
    addedEffect: "+5 Zeonic value affected and +5 meters radius.",
    maintenance: "1 every 20 (8)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "creation" }
  }),

  curse: createFASpell({
    name: "Curse",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 200,
    effect:
      "Creates negative conditions causing automatic failure of a specified action, or –60 to an Ability. Affects others entering the field. Resisted with MR 120.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (20) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "none" }
  }),

  absorbInformation: createFASpell({
    name: "Absorb Information",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 50,
    effect:
      "Allows the caster to instantly absorb written or graphic information. Reads 500 words per turn.",
    addedEffect: "+500 words per turn.",
    maintenance: "1 every 5 (10)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  showTheInvisible: createFASpell({
    name: "Show the Invisible",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 60,
    effect:
      "Reveals invisible forces, supernatural beings, and effects within 150 feet. Resisted with MR 120.",
    addedEffect: "+10 meters radius and +5 MR Difficulty.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "darkness" }
  }),

  undo: createFASpell({
    name: "Undo",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 100,
    effect:
      "Destroys up to 100 pounds of inorganic material unless it passes a Resistance Check 80. Cannot affect Presence > 50.",
    addedEffect: "+50 pounds affected and +5 Resistance Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "creation" }
  }),

  causeSickness: createFASpell({
    name: "Cause Sickness",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 60,
    effect: "Causes a Level 30 sickness in any individual who fails the required DR Check.",
    addedEffect: "+5 Disease Level.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "illusion", path2: "water" }
  }),

  slow: createFASpell({
    name: "Slow",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 60,
    effect: "Decreases the Movement Value of a target by –2 if it fails MR 120.",
    addedEffect: "–1 Movement Value and +5 MR Difficulty.",
    maintenance: "1 every 10 (6)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "air" }
  }),

  alterEnergy: createFASpell({
    name: "Alter Energy",
    minLevel: 40,
    maxLevel: 50,
    action: "active",
    cost: 100,
    effect:
      "Transforms up to 10 Intensities of elemental energy into another type. Magical Intensities resist with MR 120.",
    addedEffect: "+2 Intensities and +5 MR Difficulty.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "destruction" }
  }),
  blindness: createFASpell({
    name: "Blindness",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 80,
    effect:
      "Causes anyone within a 15-foot radius to go blind if they fail a MR Check with Difficulty 100.",
    addedEffect: "+30 feet to radius and +5 MR Difficulty.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "creation", path2: "light" }
  }),

  deafness: createFASpell({
    name: "Deafness",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 80,
    effect:
      "Causes anyone within a 15-foot radius to go deaf if they fail a MR Check with Difficulty 120.",
    addedEffect: "+30 feet to radius and +5 MR Difficulty.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "creation" }
  }),

  inabilityToSpeak: createFASpell({
    name: "Inability to Speak",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 80,
    effect:
      "Causes any creature within a 15-foot radius to become mute if they fail a MR Check with Difficulty 120.",
    addedEffect: "+30 feet to radius and +5 MR Difficulty.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "creation" }
  }),

  healWounds: createFASpell({
    name: "Heal Wounds",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 100,
    effect:
      "Heals any kind of wound and restores 40 Life Points. Does not regenerate missing organs but stops bleeding.",
    addedEffect: "+5 Life Points.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  visualizeCartography: createFASpell({
    name: "Visualize Cartography",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 60,
    effect:
      "Allows the caster to visualize the surrounding landscape in a 15-mile radius. Cannot locate individuals or specific constructions.",
    addedEffect: "+15 miles radius.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "darkness" }
  }),

  sleep: createFASpell({
    name: "Sleep",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 80,
    effect:
      "Induces deep sleep in all subjects within 30 feet who fail MR 100. Failure by more than 20 causes instant sleep.",
    addedEffect: "+30 feet radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (8) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "none" }
  }),

  walkOnWalls: createFASpell({
    name: "Walk on Walls",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 60,
    effect:
      "Allows characters to walk on walls or ceilings as if on the ground. Affects total Presence ≤ 80.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 20 (3)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "water" }
  }),

  magicSaddle: createFASpell({
    name: "Magic Saddle",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 100,
    effect:
      "Creates a supernatural transport creature with Life Points equal to twice the Zeon invested. Max Size 20, MV 10.",
    addedEffect: "+1 maximum Size and +1 Movement Value.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "illusion" }
  }),

  mergeWithBody: createFASpell({
    name: "Merge with Body",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 60,
    effect:
      "Merges objects with a character, hiding them as scars or tattoos. Max Presence of merged objects is 100.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 5 (12) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  eliminateFatigue: createFASpell({
    name: "Eliminate Fatigue",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 80,
    effect: "Induces recovery from physical exhaustion, restoring 1 lost Fatigue Point.",
    addedEffect: "+1 Fatigue Point recovered.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "darkness" }
  }),

  acidCloud: createFASpell({
    name: "Acid Cloud",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 100,
    effect:
      "Creates a corrosive cloud (15-foot radius) that melts substances. Targets must pass PhR 120 or lose LP equal to Failure Level.",
    addedEffect: "+5 feet radius, +1 cloud MV, +5 PhR Difficulty.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "earth" }
  }),

  leaveUnprotected: createFASpell({
    name: "Leave Unprotected",
    minLevel: 50,
    maxLevel: 60,
    action: "active",
    cost: 80,
    effect: "Lowers the victim’s AT by 2 levels if they or their armor fail MR 140.",
    addedEffect: "–1 AT and +10 MR Difficulty.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "creation" }
  }),

  increasePsychicCharacteristics: createFASpell({
    name: "Increase Psychic Characteristics",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 100,
    effect:
      "Adds 1 point to Intelligence, Power, Willpower, or Perception. Increasing beyond 12 requires two Added Effects.",
    addedEffect: "+1 to enhanced Characteristic.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  magicalWeapon: createFASpell({
    name: "Magical Weapon",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 140,
    effect: "Creates a supernatural weapon treated as Quality +10 Energy damage. Max Presence 25.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (14) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  increasePhysicalCharacteristics: createFASpell({
    name: "Increase Physical Characteristics",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 80,
    effect:
      "Adds 1 point to Dexterity, Agility, Strength, or Constitution. Increasing beyond 12 requires two Added Effects.",
    addedEffect: "+1 to enhanced Characteristic.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  minorAlteration: createFASpell({
    name: "Minor Alteration",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 80,
    effect:
      "Shapes inorganic matter into another object of similar characteristics and same Presence. Max Presence 30.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 20 (4)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  bodyToMagic: createFASpell({
    name: "Body to Magic",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 100,
    effect:
      "Transforms a body into magical energy, making it intangible to matter and non‑Energy attacks. Max Presence 80.",
    addedEffect: "+10 maximum Presence.",
    maintenance: "1 every 10 (10)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  paralyze: createFASpell({
    name: "Paralyze",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 140,
    effect: "Subjects within 30 feet suffer Total Paralysis unless they pass MR 80.",
    addedEffect: "+5 meters radius and +5 MR Difficulty.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "air" }
  }),

  createEmotion: createFASpell({
    name: "Create Emotion",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 160,
    effect:
      "Creates a designated emotion in a character. Resisted with MR or PsR 120; rechecked daily or when suspicious.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (16) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "illusion" }
  }),

  forgetfulness: createFASpell({
    name: "Forgetfulness",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 160,
    effect:
      "Affects memory, causing the target to forget whatever the caster chooses unless MR or PsR 120 succeeds.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "essence" }
  }),

  weakness: createFASpell({
    name: "Weakness",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 80,
    effect: "Subjects the target to Weakness unless they pass MR 120.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "creation" }
  }),

  resist: createFASpell({
    name: "Resist",
    minLevel: 60,
    maxLevel: 70,
    action: "passive",
    cost: 80,
    effect: "Enhances one type of Resistance by +20.",
    addedEffect: "+10 to one Resistance.",
    maintenance: "1 every 5 (16)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  plague: createFASpell({
    name: "Plague",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 140,
    effect:
      "Spreads an existing disease to all individuals within 1 mile. DR avoids contagion; MR 100 also avoids it.",
    addedEffect: "+5 Disease Level, +1 mile radius, +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "illusion" }
  }),

  rejection: createFASpell({
    name: "Rejection",
    minLevel: 60,
    maxLevel: 70,
    action: "active",
    cost: 80,
    effect:
      "Imbues a body with magical energy that provokes a Strength 8 impact on contact. Max Presence 30.",
    addedEffect: "+5 maximum Presence and +1 Strength.",
    maintenance: "1 every 20 (4) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "essence", path2: "water" }
  }),

  invisibility: createFASpell({
    name: "Invisibility",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 140,
    effect:
      "Renders designated bodies invisible. Affects total Presence ≤ 80. Notice vs Inhuman or Search vs Almost Impossible to detect.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 10 (14)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "essence" }
  }),

  levitationSphere: createFASpell({
    name: "Levitation Sphere",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 150,
    effect:
      "Causes objects and creatures in an 80-foot radius to levitate. Moved with Flight Value 6. Resisted with MR or PsR 80.",
    addedEffect: "+80 feet radius and +5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (15) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "earth", path2: "water" }
  }),

  uselessness: createFASpell({
    name: "Uselessness",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 120,
    effect:
      "Target becomes clumsy and unable to perform physical maneuvers unless MR 120 succeeds.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 10 (12)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "water" }
  }),

  dominion: createFASpell({
    name: "Dominion",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 160,
    effect:
      "Bends the will of anyone who fails MR or PsR 100. New Check only when ordered to act against their nature.",
    addedEffect: "+5 MR/PsR Difficulty.",
    maintenance: "1 every 10 (16)",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "none" }
  }),

  deflectTrajectory: createFASpell({
    name: "Deflect Trajectory",
    minLevel: 70,
    maxLevel: 80,
    action: "passive",
    cost: 100,
    effect:
      "Alters the trajectory of moving bodies. Can redirect attacks if Magic Projection defense succeeds. Resisted with MR 140.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "fire" }
  }),

  stallSpell: createFASpell({
    name: "Stall Spell",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 150,
    effect:
      "Stores another spell inside an object for later use. Stored spell must have Zeonic value ≤ 100.",
    addedEffect: "+10 maximum Zeonic value of stored spell.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "air" }
  }),

  detectionMark: createFASpell({
    name: "Detection Mark",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 100,
    effect:
      "Inscribe an arcane mark that channels the caster’s five senses. Max Presence 50. Resisted with MR 120.",
    addedEffect: "+5 maximum Presence and +5 MR Difficulty.",
    maintenance: "1 every 10 (10) Daily",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect, Spiritual",
    closedPaths: { path1: "darkness" }
  }),
  flight: createFASpell({
    name: "Flight",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 100,
    effect: "The target is able to move with Flight Value 8.",
    addedEffect: "+1 to Flight Value.",
    maintenance: "1 every 20 (5)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  offensiveErudition: createFASpell({
    name: "Offensive Erudition",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 80,
    effect:
      "Increases the caster’s offensive Magic Projection by +20. Only one Offensive Erudition may affect a subject at a time.",
    addedEffect: "+5 to offensive Magic Projection.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "creation" }
  }),

  defensiveErudition: createFASpell({
    name: "Defensive Erudition",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 80,
    effect:
      "Increases the caster’s defensive Magic Projection by +20. Only one Defensive Erudition may affect a subject at a time.",
    addedEffect: "+5 to Defensive Magic Projection.",
    maintenance: "1 every 10 (8)",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "creation" }
  }),

  containment: createFASpell({
    name: "Containment",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 200,
    effect:
      "Haunts an area, preventing anyone inside from leaving unless they pass MR 120. Area cannot exceed a 30-foot radius.",
    addedEffect: "+15 feet to radius and +5 MR Difficulty.",
    maintenance: "1 every 5 (50) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "none" }
  }),

  perfectTarget: createFASpell({
    name: "Perfect Target",
    minLevel: 70,
    maxLevel: 80,
    action: "active",
    cost: 80,
    effect:
      "Enchants a projectile so it inevitably reaches its target. Grants +60 to the Attack. Projectile Presence ≤ 40.",
    addedEffect: "+10 maximum Presence of projectile.",
    maintenance: "No",
    maxZeon: "Intelligence x10",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  spellReturn: createFASpell({
    name: "Spell Return",
    minLevel: 80,
    maxLevel: 90,
    action: "passive",
    cost: 150,
    effect:
      "Turns an active spell against its original caster or another target. Spell must have Zeonic value ≤ 100.",
    addedEffect: "+5 to spell’s Zeonic value.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "none" }
  }),

  disenchantment: createFASpell({
    name: "Disenchantment",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 200,
    effect: "Destroys magical objects with Presence < 80 or removes their supernatural qualities.",
    addedEffect: "+5 maximum Presence affected.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "creation" }
  }),

  naturalSpell: createFASpell({
    name: "Natural Spell",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 350,
    effect:
      "Allows the caster to cast pre‑prepared spells repeatedly at zero Zeon cost. Total Zeonic value ≤ 100.",
    addedEffect: "+5 to Zeonic value affected.",
    maintenance: "1 every 5 (70) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  stealSpell: createFASpell({
    name: "Steal Spell",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 200,
    effect:
      "Allows the caster to take control of another spell (Zeonic value ≤ 80). Only maintenance spells can be stolen. Original caster may resist with MR 120.",
    addedEffect: "+5 Zeonic value affected and +5 MR Difficulty.",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "none" }
  }),

  immortality: createFASpell({
    name: "Immortality",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 300,
    effect:
      "Prevents aging and protects from poison and natural illness. Affects subjects with Presence < 60.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 20 (15) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  magicPrism: createFASpell({
    name: "Magic Prism",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 200,
    effect: "Creates a supernatural container for Zeon with a capacity of 400 Zeon points.",
    addedEffect: "+25 Zeon capacity.",
    maintenance: "1 every 20 (10) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  eliminateNeeds: createFASpell({
    name: "Eliminate Needs",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 300,
    effect:
      "Removes the need to eat, drink, or sleep. Affects any number of individuals with total Presence ≤ 120.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 20 (15) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect",
    closedPaths: { path1: "essence" }
  }),

  prepareSpell: createFASpell({
    name: "Prepare Spell",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 200,
    effect:
      "Stores a second spell inside an object or person for automatic casting later. Stored spell Zeonic value ≤ 100.",
    addedEffect: "+5 total stored Zeonic value.",
    maintenance: "1 every 10 (20) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  physicalImmunity: createFASpell({
    name: "Physical Immunity",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 200,
    effect: "Makes the target invulnerable to all non‑Energy damage. Affects total Presence ≤ 60.",
    addedEffect: "+5 maximum Presence.",
    maintenance: "1 every 20 (10) Daily",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Effect",
    closedPaths: { path1: "essence" }
  }),

  gate: createFASpell({
    name: "Gate",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 500,
    effect:
      "Creates a magical door linking two distant places. Max length 15 feet, max distance 500 miles. Can transport creatures equal to Presence 500 per day.",
    addedEffect: "+50 maximum Presence transported, +500 miles distance, +5 feet width.",
    maintenance: "1 every 20 (25) Daily",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  teletransportation: createFASpell({
    name: "Teletransportation",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 300,
    effect:
      "Instantly transports the caster or designated targets up to 50 miles. Affects total Presence ≤ 80.",
    addedEffect: "+50 miles range and +5 maximum Presence.",
    maintenance: "No",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect",
    closedPaths: { path1: "earth" }
  }),

  location: createFASpell({
    name: "Location",
    minLevel: 80,
    maxLevel: 90,
    action: "active",
    cost: 300,
    effect:
      "Finds the exact position of a person, place, or object within 100 miles. Target may resist with MR 120.",
    addedEffect: "+5 MR Difficulty and +100 miles range.",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Detection",
    closedPaths: { path1: "darkness" }
  }),

  eyeOfTime: createFASpell({
    name: "Eye of Time",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 300,
    effect:
      "Allows the caster to witness any event from the last 100 years at the current location. Movement ends the spell.",
    addedEffect: "+100 years.",
    maintenance: "1 every 20 (15)",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect",
    closedPaths: { path1: "darkness" }
  }),

  possession: createFASpell({
    name: "Possession",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 300,
    effect:
      "Allows the caster to take control of another individual’s body. Victim resists with MR 120. Caster’s body remains in a coma.",
    addedEffect: "+5 MR Difficulty.",
    maintenance: "1 every 20 (15)",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "none" }
  }),
  shieldAgainstPowers: createFASpell({
    name: "Shield Against Powers",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 300,
    effect:
      "This spell affects a specific area within which no supernatural powers can take effect. No spells with Zeonic values of 150 or below, no Psychic Powers with Potentials lower than 150, and no Ki Technique costing less than a total of 13 Ki Points will work within this area. In the same way, no Summoning activities with a Difficulty under 200 are allowed. The maximum area covered with this spell is a 150-foot radius, which remains stationary.",
    addedEffect:
      "+150 feet to radius, +5 to Zeonic value, +5 to Psychic Potential, +2 Ki Points and +10 to Summoning Difficulty",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "creation" }
  }),

  seal: createFASpell({
    name: "Seal",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 200,
    effect:
      "Seal will stall a maintained Spiritual spell in someone, making it impossible for the target to be freed from its effects. This enchantment is used on Spiritual spells previously cast successfully on an individual who failed the Resistance Check. In this way, the affected character loses all ability to make another MR Check, regardless of general rules or what the spell itself dictates, until the Spiritual spell itself is destroyed or maintenance is discontinued. Seal has no effect upon non-maintenance spells or those restricted to a specific area. The affected enchantments must have a Zeonic value of 100 or below.",
    addedEffect: "+5 to Zeonic value affected",
    maintenance: "No",
    maxZeon: "Intelligence x30",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  imitateSpell: createFASpell({
    name: "Imitate Spell",
    minLevel: 90,
    maxLevel: 100,
    action: "passive",
    cost: 200,
    effect:
      "This spell allows the caster to imitate a spell being cast before him. Any type of spell, from automatic to maintained ones, can be imitated, provided they are cast in the same round as the Imitate Spell and have fewer than 100 Zeon. This spell can even imitate High Magic or Divine spells without the need of the caster having the required Gnosis level to cast them. The caster determines whether to use his own Magic Projection or that of the original caster.",
    addedEffect: "+5 to Zeonic value affected",
    maintenance: "As the imitated spell’s Zeonic value.",
    maxZeon: "Intelligence x30",
    typeOfSpell: "effect (variable)",
    closedPaths: { path1: "destruction" }
  }),

  conditioning: createFASpell({
    name: "Conditioning",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 300,
    effect:
      "This spell directly affects other spells cast by the spellcaster, stalling them and delaying their activation until the advent of a particular circumstance or moment previously determined by the caster. Conditioning must be cast at the same time as the spells it will affect. Each restricted spell may be subject to a different condition, but once set, a caster can not make any changes at a later date. The conditioned spell automatically activates at the exact designated moment – even if the caster is unaware. For instance, a caster may condition Stop Fall to activate when falling from great heights. In the same way, a necromancer may condition Defeat Death to activate at the time of his death. Conditioned spells that have not been triggered require no maintenance. If the Conditioning spell itself disappears, all other spells linked to it also disappear. Any number of spells may be Conditioned as long as the total number of Zeon points is 100 or below. Only one Conditioning spell at a time may be kept active. Spell action will be Active or Passive depending on its own nature.",
    addedEffect: "+5 to the spell’s Zeonic value",
    maintenance: "1 every 5 (60) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  linkMaintenance: createFASpell({
    name: "Link Maintenance",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 200,
    effect:
      "The spellcaster may assign maintenance payment of one of his spells to somebody else, thus forcing the target to invest Zeon points unknowingly. Link Maintenance can only be used in persons with the Gift, or magical beings or objects. Characters wishing to avoid this spell need to pass a MR Check with a Difficulty of 120. Those individuals unaware of the fact that they are being targeted can not roll again for Resistance. If they realize this and try to stop it, they will be granted another Check depending on the type of spell they are being linked to. Daily maintenance spells grant daily Checks, whereas the rest will grant one Check every five turns. Linking stops as soon as the target passes his MR or runs out of Zeon points.",
    addedEffect: "+5 to MR Difficulty",
    maintenance: "No",
    maxZeon: "Intelligence x20",
    typeOfSpell: "Spiritual",
    closedPaths: { path1: "none" }
  }),

  theMagistrate: createFASpell({
    name: "The Magistrate",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 450,
    effect:
      "With this spell, the caster acts as a supreme judge of all events that transpire in a 150-foot radius around him. Within this space, the caster has the power to prohibit any Active Action taken by any person or creature who does not pass a MR Check with a Difficulty of 140. This check must be repeated each round in which an Active Action is attempted, unless the caster chooses to allow the action to occur. Only Active Actions may be prohibited, so affected targets may still perform Passive Actions, such as repelling attack. In order the prohibit an action, the caster must be aware of it, so some individuals may be able to overcome the effects of this spell through deception or subterfuge. Prohibiting another’s Active Action counts as a Passive Action for the caster. This spell’s area of effect remains stationary.",
    addedEffect: "+150 feet to radius and +5 to MR Difficulty.",
    maintenance: "1 every 10 (45) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "none" }
  }),

  theGiftOfKnowledge: createFASpell({
    name: "The Gift of Knowledge",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 300,
    effect:
      "This spell grants the target 100 bonus points to Secondary Abilities of the Intellectual field, which he may distribute freely as he sees fit. Only one Gift of Knowledge may be active in any given subject at a time.",
    addedEffect: "+10 to be allocated in Intellectual Secondary Abilities.",
    maintenance: "1 every 10 (30) Daily",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  strengthenMagic: createFASpell({
    name: "Strengthen Magic",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 200,
    effect:
      "This spell intensifies the power of the magic used by the caster, making his spells harder to destroy. As long as this spell is maintained, all other spells the caster performs are treated as having +50 Zeonic value. This increase is not actual Zeon, so it cannot provide any Added Effect bonuses, but it does make spells harder to destroy. For instance, a character casting Create Light with a Zeonic value of 30 while simultaneously maintaining Strengthen Magic would not see an increase in the Light spell, but if another character cast Destroy against him, the spell would have, to all practical purposes, a Zeonic value of 80 instead of 30.",
    addedEffect: "+5 Zeonic value to spells",
    maintenance: "1 every 10 (20) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Effect",
    closedPaths: { path1: "destruction" }
  }),

  innateMagic: createFASpell({
    name: "Innate Magic",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 500,
    effect:
      "This spell increases the environmental magical potential of an area, thus increasing the capability for spellcasters to perform magic innately. The spell enchants an 80-foot radius area, within which innate spells have a +30 Potential (in addition to what the caster’ MA indicates). The caster of Innate Magic can choose who will benefit from this spell.",
    addedEffect: "+30 feet to radius",
    maintenance: "1 every 10 (50) Daily",
    maxZeon: "Intelligence x50",
    typeOfSpell: "Effect",
    closedPaths: { path1: "none" }
  }),

  predestination: createFASpell({
    name: "Predestination",
    minLevel: 90,
    maxLevel: 100,
    action: "active",
    cost: 600,
    effect:
      "This spell allows the caster to modify future events according to his plan, thus predestining several circumstances in the future. The complexity of the events is left to the caster’s own design. He may preordain one event, leaving the different small happenings that lead up to its realization to chance, or quite on the contrary, he may try to determine each one of the aspects involved in producing a final result. The spell is not meant to cause a completely impossible outcome. However, the odds are limited only by the caster’s imagination. Preordained events may be set for a specific date or they may be scheduled to repeat eternally through time—solstices in leap years, for example. Given the huge complexity of the spell, let’s look at a few examples of what it could be used for: An imprecise Predestination would be a caster’s prediction of misfortune befalling an entire family and their offspring, condemning all their members to a horrible death before reaching a certain age. On the other hand, should the caster wish to be more explicit, he could condemn their first born children to be murdered by wild wolves on the very night of their birth. Naturally, not all predestinations need to be negative; the caster might predestine a child to become a king. However, the future created by the spell is not absolute and inevitable; there is always the chance of preventing it from coming true. Anyone outside the limits preordained by the caster, that is, anyone passing the MR Check, can keep destiny from fulfilling itself. In order to neutralize the actions of third parties, the caster may plan ahead for some security measures inside the limits of the spell. A good example of this would be the inclusion of a clause stating that any one who tries to thwart destiny will be murdered by wolves. Preventing this spell from working only requires that the person, creature, or object with the highest resistance of those directly affected by the spell passes a MR Check with a Difficulty of 140 at the time the spell is being cast. Those influenced by its effects will not be able to do anything to stop it from happening; chance will inevitably play against them in the most unavoidable of ways. The MR can be repeated only when some of the predestined events have come true. Therefore, the greater the detail the greater the chances of preventing the event. If any of the preordained events should be stopped, the whole spell is cancelled.",
    addedEffect: "+5 to MR Difficulty",
    maintenance: "1 every 20 (30) Daily",
    maxZeon: "Intelligence x40",
    typeOfSpell: "Automatic",
    closedPaths: { path1: "none" }
  })
};
//#endregion
