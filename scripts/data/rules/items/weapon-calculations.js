import { toNum } from "../../../utils/numbers.js";

export async function WeaponBaseCalculations(actor) {
  UpdateWeapon(actor);
}

export async function WeaponEquipped(actor, item) {
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
  const strMod = toNum(actor.system.characteristics.Strength.final);
  const strBase = toNum(actor.system.characteristics.Strength.base);
  for (const item of actor.items) {
    if (item.type !== "weapon") continue;

    const w = item.system;

    const baseDamage = Number(w.damage.base ?? w.damage ?? 0);
    const qualityValue = Number(w.specialValue ?? 0);

    // Get all quality bonuses
    const q = quality(qualityValue);

    // Get Strength Penalty if any
    const strPenalty = strength(w.strengthReq, w.handling, strBase);

    // Compute final damage
    const atkBonusfinal = q.attack + w.modifier.value + strPenalty;
    let blockBonusfinal = 0;
    if (w.weaponType != "projectile" && w.weaponType != "throwing") {
      // Ranged weapons can't block
      blockBonusfinal = q.block + w.modifier.value + strPenalty;
    }
    const finalSpeed = w.speed.base + w.speed.bonus + q.speed;
    let finalDamage = baseDamage + strMod + q.damage;
    if (w.handling === "twoHanded" && w.strengthReq.twoHanded > 0) {
      finalDamage = baseDamage + strMod * 2 + q.damage;
    }
    const finalpresence = w.presence.base + w.presence.bonus + q.presence;
    const finalbreakage = w.breakage.base + w.breakage.bonus + q.breakage;
    const finalfortitude = w.fortitude.base + w.fortitude.bonus + q.fortitude;

    await item.update({
      "system.attackBonus": atkBonusfinal,
      "system.blockBonus": blockBonusfinal,
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

function strength(strengthReq, handling, str) {
  // get the difference between the strength req and base strength. If it's positive there is no negatives to attack or block (if weapon can block)
  // If it's negative it's -10 for every point difference. Depends on current handling.
  const strReqOneHanded = toNum(strengthReq.oneHanded);
  const strReqTwoHanded = toNum(strengthReq.twoHanded);
  let penalty = 0;

  if (handling === "oneHanded" || strengthReq.twoHanded === 0) {
    // If handling is one handed or if the weapon can't be wielded two handed.
    const diff = Math.max(0, strReqOneHanded - str);
    penalty = diff * -10;
  } else {
    // If handling is two handed.
    const diff = Math.max(0, strReqTwoHanded - str);
    penalty = diff * -10;
  }
  return penalty;
}
