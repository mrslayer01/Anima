import { toNum } from "../lookup.js";

// 1. Full initialization (prevents undefined finals)
export function initializeAllAbilities(system) {
    const allSecondaryInnateBonuses = (system.classes || [])
      .flatMap(cls =>
        (cls.innateBonuses?.secondaryAbilities || []).map(bonus => ({
          ...bonus,
          name: normalizeAbilityName(bonus.name), // proper normalization
          level: cls.level || 0
        }))
    );
  for (const [categoryName, categoryData] of Object.entries(system.abilities)) {
    for (const [abilityName, abilityData] of Object.entries(categoryData)) {
      const linkedChar = abilityData.characteristic;
      const charFinal = toNum(system.characteristics[linkedChar]?.final) || 0;
      const abilBase = toNum(abilityData.base);
      const abilBonus = toNum(abilityData.bonus);
      const abilClass = toNum(abilityData.class);
      const abilSpecial = toNum(abilityData.special);
      
      //add class bonus, if any.
      const match = allSecondaryInnateBonuses.find(b => b.name === abilityName);

      if(match != null) {
        abilityData.class = (match.innateBonus * match.level);
      }

      // Calculate final
      abilityData.final = abilBase + abilBonus + abilClass + abilSpecial + charFinal;

      // determine if undeveloped
      abilityData.undeveloped = (abilBase + abilBonus + abilClass + abilSpecial) === 0;

      // determine if ability mastery
      abilityData.mastery = (abilBase + abilBonus + abilClass + abilSpecial) >= 200;
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


        const allSecondaryInnateBonuses = (system.classes || [])
          .flatMap(cls =>
            (cls.innateBonuses?.secondaryAbilities || []).map(bonus => ({
              ...bonus,
              name: normalizeAbilityName(bonus.name), // proper normalization
              level: cls.level || 0
            }))
        );
        const linkedChar = abilityData.characteristic;
        const charFinal = system.characteristics[linkedChar]?.final || 0;
        const abilBase = toNum(abilityData.base);
        const abilBonus = toNum(abilityData.bonus);
        const abilClass = toNum(abilityData.class);
        const abilSpecial = toNum(abilityData.special);

        //add class bonus, if any.
        const match = allSecondaryInnateBonuses.find(b => b.name === ability);

        if(match != null) {
          abilityData.class = (match.innateBonus * match.level);
        }

        // Calculate final
        abilityData.final = abilBase + abilBonus + abilClass + abilSpecial + charFinal;
        
        // determine if undeveloped
        if ((abilBase + abilBonus + abilClass + abilSpecial) === 0) {
            abilityData.undeveloped = true;
        } else {
            abilityData.undeveloped = false;
        }

        // determine if ability mastery
        if ((abilBase + abilBonus + abilClass + abilSpecial) >= 200) {
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

function normalizeAbilityName(name) {
  return name
    .trim()
    .split(/\s+/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}