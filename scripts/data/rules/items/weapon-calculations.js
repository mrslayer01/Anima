import { getBreakageBonus, lookupCharacteristicMod } from "../../../utils/lookup.js";
import { toNum } from "../../../utils/numbers.js";

export async function WeaponBaseCalculations(actor) {
  UpdateWeapon(actor);
}

export async function WeaponEquipped(actor, item) {
  // 1. Capture the equipped state of all weapons AFTER this toggle
  const equippedWeapons = actor.items.filter((i) => i.type === "weapon" && i.system.equipped);

  // 2. Recompute all weapon stats
  const allWeaponSpeed = await UpdateWeapon(actor);

  // 3. Determine which weapon should apply attack/block
  let activeWeapon = null;

  if (equippedWeapons.length === 1) {
    // Only one weapon equipped → always use it (even if it's a shield)
    activeWeapon = equippedWeapons[0];
  } else {
    // Multiple weapons equipped → ignore shields
    activeWeapon = equippedWeapons.find((w) => w.system.weaponType !== "shield") ?? null;
  }

  // 4. Build update object
  const updateData = {
    "system.initiative.weaponPenalty": allWeaponSpeed
  };

  if (activeWeapon) {
    updateData["system.abilities.primary.Combat.Attack.weapon"] = activeWeapon.system.attackBonus;
    updateData["system.abilities.primary.Combat.Block.weapon"] =
      activeWeapon.system.blockBonus.final ?? activeWeapon.system.blockBonus;
  } else {
    // No valid weapon → zero out
    updateData["system.abilities.primary.Combat.Attack.weapon"] = 0;
    updateData["system.abilities.primary.Combat.Block.weapon"] = 0;
  }

  // 5. Apply update
  return await actor.update(updateData);
}

export async function UpdateWeapon(actor) {
  const strMod = toNum(actor.system.characteristics.Strength.final);
  const strBase = toNum(actor.system.characteristics.Strength.base);

  let allWeaponSpeed = 0;

  for (const item of actor.items) {
    if (item.type !== "weapon") continue;

    const w = item.system;

    const baseDamage = toNum(w.damage.base ?? w.damage ?? 0);
    const qualityValue = toNum(w.specialValue ?? 0);

    // Get all quality bonuses
    const q = quality(qualityValue);

    // Get Strength Penalty if any
    const strPenalty = strength(w.strengthReq, w.handling, strBase);

    // Compute final damage
    const atkBonusfinal = q.attack + w.modifier.value + strPenalty;
    let blockBonusfinal = 0;
    if (w.weaponType != "projectile" && w.weaponType != "throwing") {
      // Ranged weapons can't block
      blockBonusfinal = q.block + w.modifier.value + strPenalty + (w.blockBonus.base ?? 0);
    }
    const weaponSpeed = w.speed.base + w.speed.bonus + q.speed;
    if (item.system.equipped) {
      allWeaponSpeed += weaponSpeed;
    }
    let finalDamage = baseDamage + strMod + q.damage;
    if (w.handling === "twoHanded" && w.strengthReq.twoHanded > 0 && w.weaponType != "projectile") {
      finalDamage = baseDamage + strMod * 2 + q.damage;
    }

    let finalProjectileRange = 0;
    // Ranged weapons add damage from equipped ammo and don't apply quality bonus to damage.
    if (w.weaponType === "projectile" || w.weaponType === "throwing") {
      //Get equipped ammo if any
      let ammoStr = 0;
      for (const ammo of w.ammo) {
        // Get the list of ammo for this weapon and only return the ammo that is equipped.
        const item = actor.items.get(ammo.id);
        if (item.system.equipped) {
          ammoStr = toNum(item.system.damage);
        }
      }
      if (toNum(w.projectileWeaponStrength) > 0) {
        // If projectile weapon has a listed strength, (crossbows, etc) use that instead of base strength.
        finalProjectileRange =
          toNum(w.projectileWeaponRange.base) +
          lookupCharacteristicMod(toNum(w.projectileWeaponStrength));
        finalDamage =
          baseDamage + lookupCharacteristicMod(toNum(w.projectileWeaponStrength)) + ammoStr;
      } else {
        finalProjectileRange = toNum(w.projectileWeaponRange.base) + strMod;
        finalDamage = baseDamage + strMod + ammoStr;
      }
    }

    const finalpresence = w.presence.base + w.presence.bonus + q.presence;
    const finalbreakage =
      w.breakage.base + w.breakage.bonus + q.breakage + getBreakageBonus(strBase);
    const finalfortitude = w.fortitude.base + w.fortitude.bonus + q.fortitude;

    await item.update({
      "system.attackBonus": atkBonusfinal,
      "system.blockBonus.final": blockBonusfinal,
      "system.dodgeBonus": w.dodgeBonus,
      "system.speed.final": weaponSpeed,
      "system.damage.final": finalDamage,
      "system.presence.final": finalpresence,
      "system.breakage.final": finalbreakage,
      "system.fortitude.final": finalfortitude,
      "system.armorReduction": q.armorReduction,
      "system.projectileWeaponRange.final": finalProjectileRange
    });
  }

  // Update speed to include all weapons equipped speed.
  return allWeaponSpeed;
}

export function quality(qualityValue) {
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

    // Presence only increases for positive quality
    presence: q > 0 ? steps * 50 : 0
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
