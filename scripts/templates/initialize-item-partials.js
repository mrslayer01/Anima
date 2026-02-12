const commonPartials = ["common", "description"];
const partials = ["weapon", "armor"];

export function InitalizeAllItemPartials() {
  for (const p of commonPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/common/${p}.hbs`
    ]);
  }

  for (const p of partials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/${p}.hbs`
    ]);
  }
}
