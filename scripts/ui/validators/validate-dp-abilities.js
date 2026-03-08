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

        // --- 2. CATEGORY LIMIT CHECK (Class % Limit, Focus halves limit) ---
        const limits = actor.system.abilities.primary.abilityLimits;
        const percent = Number(limits[category].percent) || 0;

        let limit = (dp.final * percent) / 100;

        // Detect which Combat ability is focused
        let focusedAbility = null;
        if (category === "Combat") {
          const prim = actor.system.abilities.primary.Combat;
          if (prim.Attack.focus) focusedAbility = "Attack";
          else if (prim.Block.focus) focusedAbility = "Block";
          else if (prim.Dodge.focus) focusedAbility = "Dodge";
        }

        // Halve limit ONLY for the focused ability
        if (focusedAbility && ability === focusedAbility) {
          limit = limit / 2;
        }

        const currentSpent = dp.spentRecords
          .filter((r) => r.category === category)
          .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

        const newTotal = currentSpent + dpCost;

        if (newTotal > limit) {
          ui.notifications.error(
            focusedAbility && ability === focusedAbility
              ? "Outside of allowed limit for this category. When focused the limit is halved specifically for Attack, Block and Dodge."
              : "Outside of allowed limit for this category."
          );
          input.value = oldBase;
          return;
        }

        // --- 3. ATTACK + BLOCK + DODGE DP SUB-LIMIT (50% of TOTAL DP) ---
        if (category === "Combat" && ["Attack", "Block", "Dodge"].includes(ability)) {
          const totalDP = dp.final;
          const abdLimit = totalDP * 0.5;

          const spentABD = dp.spentRecords
            .filter(
              (r) => r.category === "Combat" && ["Attack", "Block", "Dodge"].includes(r.ability)
            )
            .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

          const newABDTotal = spentABD + dpCost;

          if (newABDTotal > abdLimit) {
            ui.notifications.error(
              "You cannot spend more than 50% of your total DP on Attack, Block, and Dodge."
            );
            input.value = oldBase;
            return;
          }
        }

        // --- 4. PSYCHIC PROJECTION DP LIMIT (50% of Psychic DP Limit) ---
        if (category === "Psychic" && ability === "PsychicProjection") {
          const psychicLimit = Number(limits.Psychic.final) || 0;
          const projLimit = psychicLimit * 0.5;

          const projSpent = dp.spentRecords
            .filter((r) => r.category === "Psychic" && r.ability === "PsychicProjection")
            .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

          const newProjTotal = projSpent + dpCost;

          if (newProjTotal > projLimit) {
            ui.notifications.error("Psychic Projection cannot exceed 50% of the Psychic DP limit.");
            input.value = oldBase;
            return;
          }
        }

        // --- 5. MAGIC PROJECTION DP LIMIT (50% of Supernatural DP Limit) ---
        if (category === "Supernatural" && ability === "MagicProjection") {
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
      }
      // --- ATTACK / BLOCK / DODGE RULE ---
      if (category === "Combat" && ["Attack", "Block", "Dodge"].includes(ability)) {
        const combat = actor.system.abilities.primary.Combat;

        // Determine which ability is focused
        const focused = combat.Attack.focus
          ? "Attack"
          : combat.Block.focus
            ? "Block"
            : combat.Dodge.focus
              ? "Dodge"
              : null;

        // Current values
        let attackBase = Number(combat.Attack.base) || 0;
        let blockBase = Number(combat.Block.base) || 0;
        let dodgeBase = Number(combat.Dodge.base) || 0;

        // Apply the new value to the edited ability
        if (ability === "Attack") attackBase = newBase;
        if (ability === "Block") blockBase = newBase;
        if (ability === "Dodge") dodgeBase = newBase;

        // Helper: check if X is within 50 of Y
        const within50 = (a, b) => Math.abs(a - b) <= 50;

        // --- ATTACK CHECK ---
        if (focused !== "Attack") {
          const ok = within50(attackBase, blockBase) || within50(attackBase, dodgeBase);

          if (!ok) {
            ui.notifications.error("Attack must be within 50 points of either Block or Dodge.");
            input.value = oldBase;
            return;
          }
        }

        // --- BLOCK CHECK ---
        if (focused !== "Block") {
          const ok = within50(blockBase, attackBase) || within50(blockBase, dodgeBase);

          if (!ok) {
            ui.notifications.error("Block must be within 50 points of either Attack or Dodge.");
            input.value = oldBase;
            return;
          }
        }

        // --- DODGE CHECK ---
        if (focused !== "Dodge") {
          const ok = within50(dodgeBase, attackBase) || within50(dodgeBase, blockBase);

          if (!ok) {
            ui.notifications.error("Dodge must be within 50 points of either Attack or Block.");
            input.value = oldBase;
            return;
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
