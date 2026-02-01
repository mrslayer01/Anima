// 1. Full initialization (prevents undefined finals)
export function initializeAllAbilities(system) {
  for (const [categoryName, categoryData] of Object.entries(system.abilities)) {

    for (const [, abilityData] of Object.entries(categoryData)) {
      const linkedChar = abilityData.characteristic;
      const charFinal = system.characteristics[linkedChar]?.final || 0;

      // Calculate final
      abilityData.final =
        (abilityData.base || 0) +
        (abilityData.bonus || 0) +
        (abilityData.class || 0) +
        charFinal;

      // determine if undeveloped
      abilityData.undeveloped = abilityData.base === 0;

      // determine if ability mastery
      abilityData.mastery = abilityData.base >= 200;
    }

  }
}

// 2. Selective recalculation (only recalc changed ability)
export function applyChangedAbilities(system, actor) {
    const changed = actor._changedAbilities;
    if (!Array.isArray(changed)) return;

    for (const { category, ability } of changed) {
        // NORMAL (object)
        const abilityData = system.abilities[category]?.[ability];
        if (!abilityData) continue;

        const linkedChar = abilityData.characteristic;
        const charFinal = system.characteristics[linkedChar]?.final || 0;

        // Calculate final
        abilityData.final =
            (abilityData.base || 0) +
            (abilityData.bonus || 0) +
            (abilityData.class || 0) +
            charFinal;
        
        // determine if undeveloped
        if (abilityData.base === 0) {
            abilityData.undeveloped = true;
        } else {
            abilityData.undeveloped = false;
        }

        // determine if ability mastery
        if (abilityData.base >= 200) {
            abilityData.mastery = true;
        } else {
            abilityData.mastery = false;
        }  
    }

    delete actor._changedAbilities;
}

// 3. Change detection (called from update-calculations.js)
export function detectChangedAbilities(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);

  const updatedCategories = expanded.system?.abilities ?? {};

  for (const [categoryName, abilities] of Object.entries(updatedCategories)) {

    // NORMAL (object)
    for (const [abilityName, fields] of Object.entries(abilities)) {
      const oldAbility = oldSystem.abilities[categoryName][abilityName];

      for (const [field, newValue] of Object.entries(fields)) {
        if (oldAbility[field] !== newValue) {
          changed.push({ category: categoryName, ability: abilityName });
          break;
        }
      }
    }
  }

  return changed;
}