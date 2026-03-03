export function InitializeMysticPartials() {
  // load Mystic Primary Partials
  for (const p of primaryPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/mystic/${p}.hbs`
    ]);
  }
}

const primaryPartials = ["mystic-main", "mystic-spells"];
