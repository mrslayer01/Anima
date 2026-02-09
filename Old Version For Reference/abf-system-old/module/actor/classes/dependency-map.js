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
    recalc: (actor) => Object.keys(actor.system.resistances)
  },
  presence: {
    // These paths trigger presence recalculation
    triggers: ["system.presence.bonus", "system.classes"]
  },
  characteristics: {
    // These paths trigger resistance recalculation
    triggers: ["system.characteristics"],

    // When triggered, recalc ALL resistances
    recalc: (actor) => Object.keys(actor.system.characteristics)
  },
  secondariesAbilities: {
    // These paths trigger resistance recalculation
    triggers: ["system.abilities.Secondaries", "system.classes", "system.characteristics"],

    // When triggered, recalc ALL resistances
    recalc: (actor) => Object.keys(actor.system.abilities.Secondaries)
  },
  primariesAbilities: {
    // These paths trigger resistance recalculation
    triggers: ["system.abilities.Primaries", "system.classes", "system.characteristics"],

    // When triggered, recalc ALL resistances
    recalc: (actor) => Object.keys(actor.system.abilities.Primaries)
  }
};
