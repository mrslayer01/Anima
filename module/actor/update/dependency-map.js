export const DEPENDENCIES = {
  resistances: {
    // These paths trigger resistance recalculation
    triggers: [
      "system.resistances",        // direct edits to resistance fields
      "system.characteristics",    // characteristic finals change
      "system.presence.final",      // presence changes
      "system.level"
    ],

    // When triggered, recalc ALL resistances
    recalc: actor => Object.keys(actor.system.resistances)
  }
};