export function forceAbilityOrder(abilitiesRoot) {
  if (!abilitiesRoot) return;

  const categories = [
    "Athletics",
    "Vigor",
    "Perception",
    "Intellectual",
    "Social",
    "Subterfuge",
    "Creative"
  ];

  for (const category of categories) {
    const categoryObj = abilitiesRoot[category];
    if (!categoryObj) continue;

    // Call the Handlebars helper to get the correct order
    const orderHelper = Handlebars.helpers[`order${category}`];
    if (!orderHelper) continue;

    const order = orderHelper();

    const sorted = {};

    // Rebuild in the correct order
    for (const key of order) {
      if (categoryObj[key]) {
        sorted[key] = categoryObj[key];
      }
    }

    // Add any unexpected keys at the end (safety)
    for (const key of Object.keys(categoryObj)) {
      if (!sorted[key]) {
        sorted[key] = categoryObj[key];
      }
    }

    abilitiesRoot[category] = sorted;
  }
}