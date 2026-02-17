export function InitializeAbilitiesPartials() {
  const primaryPartials = ["primaries", "combat", "supernatural", "psychic", "modules"];

  const secondaryPartials = [
    "athletics",
    "secondaries",
    "vigor",
    "perception",
    "intellectual",
    "social",
    "subterfuge",
    "creative"
  ];

  //register partials
  for (const p of primaryPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/abilities/primary/${p}.hbs`
    ]);
  }

  for (const p of secondaryPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/abilities/secondary/${p}.hbs`
    ]);
  }
}
