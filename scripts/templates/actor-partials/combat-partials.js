export function InitializeCombatPartials() {
  //load Combat Partials
  for (const p of combatPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/combat/${p}.hbs`
    ]);
  }
}

const combatPartials = ["weapons", "combat", "armor"];
