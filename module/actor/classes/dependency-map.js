export const DEPENDENCIES = {
  resistances: {
    // These paths trigger resistance recalculation
    triggers: [
      "system.resistances",
      "system.level",
      "system.presence",
      "system.characteristics",
      "system.classes"
    ],

    // When triggered, recalc ALL resistances
    recalc: actor => Object.keys(actor.system.resistances)
  },
  presence: {
    // These paths trigger presence recalculation
    triggers: [
      "system.presence.bonus",
      "system.classes"
    ]
  },
  characteristics: {
    // These paths trigger resistance recalculation
    triggers: [
      "system.characteristics"
    ],

    // When triggered, recalc ALL resistances
    recalc: actor => Object.keys(actor.system.characteristics)
  },
  abilities: {
    // These paths trigger resistance recalculation
    triggers: [
      "system.abilities",
      "system.classes",
      "system.characteristics"
    ],

    // When triggered, recalc ALL resistances
    recalc: actor => Object.keys(actor.system.abilities)
  },
};