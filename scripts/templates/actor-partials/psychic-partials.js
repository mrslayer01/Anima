export function InitializePsychicPartials() {
  for (const p of primaryPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/psychic/${p}.hbs`
    ]);
  }
}

const primaryPartials = ["psychic-main", "psychic-powers"];
