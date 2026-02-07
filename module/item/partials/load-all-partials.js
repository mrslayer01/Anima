export function loadAllItemPartials() {
  const defaultPartial = ["common", "description"];
  const weaponPartials = ["weapon"];

  for (const p of defaultPartial) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/common/${p}.hbs`
    ]);
  }

  for (const p of weaponPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/weapon/${p}.hbs`
    ]);
  }
}
