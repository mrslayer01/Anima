export function navSecondaries() {
  const navSecondariesPartials = [
    "athletics",
    "secondaries",
    "vigor",
    "perception",
    "intellectual",
    "social",
    "subterfuge",
    "creative",
  ];

  //nav secondaries
  for (const p of navSecondariesPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/secondaries/${p}.hbs`,
    ]);
  }
}
