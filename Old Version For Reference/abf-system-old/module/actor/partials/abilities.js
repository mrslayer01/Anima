export function navAbilities() {
  const navPrimariesPartials = ["primaries", "combat", "supernatural", "psychic", "supplemental"];

  const navSecondariesPartials = [
    "athletics",
    "secondaries",
    "vigor",
    "perception",
    "intellectual",
    "social",
    "subterfuge",
    "creative"
  ];

  //nav abilites

  for (const p of navPrimariesPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/abilities/primaries/${p}.hbs`
    ]);
  }
  for (const p of navSecondariesPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/abilities/secondaries/${p}.hbs`
    ]);
  }
}
