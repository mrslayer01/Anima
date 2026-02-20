export function ValidateDPAbilities(name, value, input, actor) {
  if (name.startsWith("system.abilities.secondary.")) {
    const parts = name.split(".");
    const category = parts[3];
    const ability = parts[4];

    const abil = actor.system.abilities.secondary[category][ability];
    const oldBase = Number(abil.base) || 0;
    const newBase = value;

    if (name.endsWith(".base")) {
      const cost = Number(abil.cost) || 0;

      const delta = newBase - oldBase;
      const dpCost = delta * cost;

      if (dpCost > 0) {
        if (ValidateDPRemaining(dpCost, actor)) {
          ui.notifications.error("Not enough Development Points.");
          input.value = oldBase;
          return;
        }
      }
    }
  }

  if (name.startsWith("system.abilities.primary.")) {
    const parts = name.split(".");
    const category = parts[3]; // Combat / Psychic / Supernatural
    const ability = parts[4]; // Attack, Block, Dodge, etc.

    const abil = actor.system.abilities.primary[category][ability];
    let oldBase = Number(abil.base) || 0;
    const newBase = value;
    const cost = Number(abil.cost) || 0;

    const delta = newBase - oldBase;
    const dpCost = delta * cost;

    if (name.endsWith(".base")) {
      // Only validate increases
      if (dpCost > 0) {
        const dp = actor.system.developmentPoints;

        // --- 1. DP REMAINING CHECK ---

        if (ValidateDPRemaining(dpCost, actor)) {
          ui.notifications.error("Not enough Development Points.");
          input.value = oldBase;
          return;
        }

        // --- 2. CATEGORY LIMIT CHECK ---
        const limits = actor.system.abilities.primary.abilityLimits;
        const percent = Number(limits[category].percent) || 0;

        let limit = (dp.final * percent) / 100;

        // Focus halves the limit
        if (abil.focus === true) {
          limit = limit / 2;
        }

        const currentSpent = dp.spentRecords
          .filter((r) => r.category === category)
          .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

        const newTotal = currentSpent + dpCost;

        if (newTotal > limit) {
          ui.notifications.error("Outside of allowed limit for this ability.");
          input.value = oldBase;
          return;
        }

        // --- 3. OFFENSIVE / DEFENSIVE DP LIMIT (Attack + Block + Dodge <= 50% of total DP) ---
        if (category === "Combat" && ["Attack", "Block", "Dodge"].includes(ability)) {
          const dp = actor.system.developmentPoints;

          // Maximum DP allowed for Attack+Block+Dodge combined
          const offDefLimit = dp.final * 0.5;

          // Current DP spent on Attack+Block+Dodge
          const offDefSpent = dp.spentRecords
            .filter(
              (r) => r.category === "Combat" && ["Attack", "Block", "Dodge"].includes(r.ability)
            )
            .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

          // New total after attempted change
          const newOffDefTotal = offDefSpent + dpCost;

          if (newOffDefTotal > offDefLimit) {
            ui.notifications.error("Cannot exceed 50% of total DP on Attack, Block, and Dodge.");
            input.value = oldBase;
            return;
          }
        }

        // --- 4. PSYCHIC PROJECTION DP LIMIT (Can't exceed 50% of the Psychic DP Ability Limit, not total DP like Above) ---
        if (category === "Psychic" && ["PsychicProjection"].includes(ability)) {
          const dp = actor.system.developmentPoints;
          const limits = actor.system.abilities.primary.abilityLimits;

          // Psychic category limit (already computed in your system)
          const psychicLimit = Number(limits.Psychic.final) || 0;

          // Psychic Projection may not exceed 50% of the Psychic category limit
          const projLimit = psychicLimit * 0.5;

          // Current DP spent on Psychic Projection
          const projSpent = dp.spentRecords
            .filter((r) => r.category === "Psychic" && r.ability === "PsychicProjection")
            .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

          // New total after attempted increase
          const newProjTotal = projSpent + dpCost;

          if (newProjTotal > projLimit) {
            ui.notifications.error("Psychic Projection cannot exceed 50% of the Psychic DP limit.");
            input.value = oldBase;
            return;
          }
        }

        // --- 4. MAGIC PROJECTION DP LIMIT (Can't exceed 50% of the Supernatural DP Ability Limit) ---
        if (category === "Supernatural" && ability === "MagicProjection") {
          const dp = actor.system.developmentPoints;
          const limits = actor.system.abilities.primary.abilityLimits;

          const magicLimit = Number(limits.Supernatural.final) || 0;
          const projLimit = magicLimit * 0.5;

          const projSpent = dp.spentRecords
            .filter((r) => r.category === "Supernatural" && r.ability === "MagicProjection")
            .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

          const newProjTotal = projSpent + dpCost;

          if (newProjTotal > projLimit) {
            ui.notifications.error(
              "Magic Projection cannot exceed 50% of the Supernatural DP limit."
            );
            input.value = oldBase;
            return;
          }
        }

        // --- 5. ATTACK / BLOCK / DODGE RULE ---
        if (category === "Combat" && ["Attack", "Block", "Dodge"].includes(ability)) {
          const prim = actor.system.abilities.primary.Combat;

          const attack = prim.Attack;
          const block = prim.Block;
          const dodge = prim.Dodge;

          const focused = attack.focus
            ? "Attack"
            : block.focus
              ? "Block"
              : dodge.focus
                ? "Dodge"
                : null;

          // If one is focused, the others cannot increase
          if (focused && ability !== focused) {
            if (newBase > oldBase) {
              ui.notifications.error("Only the focused combat ability may be increased.");
              input.value = oldBase;
              return;
            }
          }

          // If editing the focused one, skip the 50‑point rule
          if (!focused || focused !== ability) {
            let attackBase = Number(attack.base) || 0;
            let blockBase = Number(block.base) || 0;
            let dodgeBase = Number(dodge.base) || 0;

            if (ability === "Attack") attackBase = newBase;
            if (ability === "Block") blockBase = newBase;
            if (ability === "Dodge") dodgeBase = newBase;

            const diffBlock = Math.abs(attackBase - blockBase);
            const diffDodge = Math.abs(attackBase - dodgeBase);

            if (diffBlock > 50 || diffDodge > 50) {
              ui.notifications.error(
                "Attack, Block, and Dodge must remain within 50 points of each other."
              );
              input.value = oldBase;
              return;
            }
          }
        }
      }
    }
  }

  return value;
}

function ValidateDPRemaining(dpCost, actor) {
  const dp = actor.system.developmentPoints;

  return dpCost > dp.remaining;
}
