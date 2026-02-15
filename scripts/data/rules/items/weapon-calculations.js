export async function WeaponBaseCalculations(actor) {
  UpdateWeapon(actor);
}

export async function WeaponEquipped(actor, item) {
  console.log("Weapon Equipped");
  // Apply weapon negatives/bonuses to respective abilities. Attack, Block Dodge, init.
  //first UpdateWeapon
  UpdateWeapon(actor);

  //Apply values to Attack, block and init's weapon value.
  if (item.system.equipped) {
    return actor.update({
      "system.abilities.primary.Combat.Attack.weapon": item.system.attackBonus,
      "system.abilities.primary.Combat.Block.weapon": item.system.blockBonus,
      "system.initiative.weaponPenalty": item.system.speed.final
    });
  } else {
    return actor.update({
      "system.abilities.primary.Combat.Attack.weapon": 0,
      "system.abilities.primary.Combat.Block.weapon": 0,
      "system.initiative.weaponPenalty": 0
    });
  }
}

export async function UpdateWeapon(actor) {
  const strMod = actor.system.characteristics.Strength.final;
  for (const item of actor.items) {
    if (item.type !== "weapon") continue;

    const w = item.system;

    const baseDamage = Number(w.damage.base ?? w.damage ?? 0);
    const qualityValue = Number(w.specialValue ?? 0);

    // Get all quality bonuses
    const q = quality(qualityValue);

    // Compute final damage
    console.log(q.speed);
    const finalSpeed = w.speed.base + w.speed.bonus + q.speed;
    let finalDamage = baseDamage + strMod + q.damage;
    if (w.handling === "twoHanded") {
      finalDamage = baseDamage + strMod * 2 + q.damage;
    }
    const finalpresence = w.presence.base + w.presence.bonus + q.presence;
    const finalbreakage = w.breakage.base + w.breakage.bonus + q.breakage;
    const finalfortitude = w.fortitude.base + w.fortitude.bonus + q.fortitude;

    await item.update({
      "system.attackBonus": q.attack + w.modifier.value,
      "system.blockBonus": q.block + w.modifier.value,
      "system.speed.final": finalSpeed,
      "system.damage.final": finalDamage,
      "system.presence.final": finalpresence,
      "system.breakage.final": finalbreakage,
      "system.fortitude.final": finalfortitude,
      "system.armorReduction": q.armorReduction
    });
  }
}

function quality(qualityValue) {
  // Normalize to nearest multiple of 5, clamp to [-25, 25]
  const q = Math.max(-25, Math.min(25, Math.floor(qualityValue / 5) * 5));
  const steps = Math.abs(q) / 5;
  const sign = q >= 0 ? 1 : -1;

  return {
    attack: sign * steps * 5,
    block: sign * steps * 5,
    speed: sign * steps * 5,
    damage: sign * steps * 10,
    breakage: sign * steps * 5,
    fortitude: sign * steps * 10,
    armorReduction: sign * steps * 1,

    // Presence NEVER decreases for negative quality
    presence: steps * 50
  };
}
