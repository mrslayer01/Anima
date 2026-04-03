export function InitializeDominePartials() {
  //load Domine Partials
  for (const p of dominePartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/domine/${p}.hbs`
    ]);
  }
}

const dominePartials = ["domine", "ki-abilities"];
