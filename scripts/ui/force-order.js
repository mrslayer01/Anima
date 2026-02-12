export function forceOrder(abilitiesRoot, abilities) {
  if (!abilitiesRoot) return;

  const secondariesCategories = [
    "Athletics",
    "Vigor",
    "Perception",
    "Intellectual",
    "Social",
    "Subterfuge",
    "Creative"
  ];

  const primariesCategories = ["Combat", "Supernatural", "Psychic"];

  const armorTypes = ["cut", "imp", "thr", "hea", "ele", "col", "ene"];

  if (abilities === "Secondaries") {
    for (const category of secondariesCategories) {
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
  } else if (abilities === "Primaries") {
    for (const category of primariesCategories) {
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
}
