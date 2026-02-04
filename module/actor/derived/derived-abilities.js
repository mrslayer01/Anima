import { toNum } from "../lookup.js";

// 1. Full initialization (prevents undefined finals)
export function initializeAllAbilities(system) {

  //#region Class
  const classes = system.classes || [];

  const allClassAbilityLimits = extractCostMap(classes, "abilityLimits");
  const allPrimaryAbilityCosts = extractCostMap(classes, "primaryAbilityCosts");
  const allSupernaturalAbilityCosts = extractCostMap(classes, "supernaturalAbilityCosts");
  const allPsychicAbilityCosts = extractCostMap(classes, "psychicAbilityCosts");
  const allSecondaryAbilityCosts = extractCostMap(classes, "secondaryAbilityCosts");

  const allPrimaryInnateBonuses = extractInnateArray(classes, "primaryAbilities");
  const allSecondaryAbilities = extractInnateArray(classes, "secondaryAbilities");

  //#endregion

  //Primary Abilities




  //Secondary Abilities
  for (const [categoryName, categoryData] of Object.entries(system.abilities)) {
    for (const [abilityName, abilityData] of Object.entries(categoryData)) {
      const linkedChar = abilityData.characteristic;
      const charFinal = toNum(system.characteristics[linkedChar]?.final) || 0;    
      //First, add the class ability limits, bonuses and costs before determining mastery, etc
      //Secondary Ability Costs from class, iterate through each category of abilities and add the base cost first.
      for (const secondary of allSecondaryAbilityCosts) {
        if(secondary.name == categoryName) {
            //console.log(secondary.name, secondary.cost);
            //If the ability matches the category, apply general cost for ability increase
            abilityData.cost = secondary.cost;
        }
      }
      
      //Secondary Ability innate bonuses and reduced costs.
      const anySecondaryInnate = allSecondaryAbilities.find(b => b.name === abilityName);
      if(anySecondaryInnate != null) {
        abilityData.class = (anySecondaryInnate.innateBonus * anySecondaryInnate.level);

        if(anySecondaryInnate.reducedCost > 0) {
          abilityData.cost = anySecondaryInnate.reducedCost;
        }
      }

      const abilBase = toNum(abilityData.base);
      const abilBonus = toNum(abilityData.bonus);
      const abilClass = toNum(abilityData.class);
      const abilSpecial = toNum(abilityData.special);

      // Calculate final
      abilityData.final = abilBase + abilBonus + abilClass + abilSpecial + charFinal;
      // determine if undeveloped
        if ((abilBase + abilBonus + abilClass + abilSpecial) > 0) {
            abilityData.undeveloped = false;
        } else {
            abilityData.undeveloped = true;
        }

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


        //#region Class
        //First, add the class ability limits, bonuses and costs before determining mastery, etc
        //Secondary Ability Costs from class, iterate through each category of abilities and add the base cost first.
        for (const secondary of allSecondaryAbilityCosts) {
          if(secondary.name == categoryName) {
              //console.log(secondary.name, secondary.cost);
              //If the ability matches the category, apply general cost for ability increase
              abilityData.cost = secondary.cost;
          }
        }
        
        //Secondary Ability innate bonuses and reduced costs.
        const anySecondaryInnate = allSecondaryInnateBonuses.find(b => b.name === abilityName);
        if(anySecondaryInnate != null) {
          abilityData.class = (anySecondaryInnate.innateBonus * anySecondaryInnate.level);
            if(anySecondaryInnate.reducedCost > 0) {
              abilityData.cost = anySecondaryInnate.reducedCost;
            }
        }

        //#endregion

        const linkedChar = abilityData.characteristic;
        const charFinal = system.characteristics[linkedChar]?.final || 0;

        const abilBase = toNum(abilityData.base);
        const abilBonus = toNum(abilityData.bonus);
        const abilClass = toNum(abilityData.class);
        const abilSpecial = toNum(abilityData.special);

        // Calculate final
        abilityData.final = abilBase + abilBonus + abilClass + abilSpecial + charFinal;
        
        // determine if undeveloped
        if ((abilBase + abilBonus + abilClass + abilSpecial) > 0) {
            abilityData.undeveloped = false;
        } else {
            abilityData.undeveloped = true;
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

function extractCostMap(classes, key, { includeLevel = false } = {}) {
  //console.log(classes);
  return classes.flatMap(cls =>
    Object.entries(cls[key] || {}).map(([name, cost]) => ({
      name: normalizeAbilityName(name),
      cost,
      ...(includeLevel ? { level: cls.level || 0 } : {})
    }))
  );
}

function extractInnateArray(classes, key) {
  return classes.flatMap(cls =>
    (cls.innateBonuses?.[key] || []).map(bonus => ({
      ...bonus,
      name: normalizeAbilityName(bonus.name),
      level: cls.level || 0
    }))
  );
}