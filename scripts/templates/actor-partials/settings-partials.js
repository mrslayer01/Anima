export function InitializeSettingsPartials() {
  //load Combat Partials
  for (const p of combatPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/settings/${p}.hbs`
    ]);
  }
}

const combatPartials = ["settings"];
