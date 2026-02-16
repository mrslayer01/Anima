import { AddModifier } from "../../../utils/helpers.js";
import { toNum } from "../../../utils/numbers.js";

export async function ArmorCalculation(actor, item) {
  //Equipped armor values were modified, recalculate sheet armor.
  //First, calculate the armor's final values.
  UpdateArmor(actor);

  // Now update the actor's AT
  const location = item.system.location;
  const newSection = {};

  for (const [type, value] of Object.entries(item.system.armorType)) {
    newSection[type] = value.final;
  }

  // //update global modifiers for the item changed.
  // AddModifier(actor.system.globalModifiers.Physical, {
  //   id: item._id,
  //   source: "Armor",
  //   value: item.system.physicalPenalty,
  //   type: "armor"
  // });

  // AddModifier(actor.system.globalModifiers.Natural, {
  //   id: item._id,
  //   source: "Armor",
  //   value: item.system.naturalPenalty.final,
  //   type: "armor"
  // });
  // AddModifier(actor.system.globalModifiers.Natural, {
  //   id: item._id,
  //   source: "Armor",
  //   value: item.system.moveRestriction.final,
  //   type: "movement"
  // });

  // AddModifier(actor.system.globalModifiers.Perception, {
  //   id: item._id,
  //   source: "Armor",
  //   value: item.system.perceptionPenalty,
  //   type: "armor"
  // });

  return actor.update({
    [`system.armor.${location}`]: newSection
  });
}

export async function ArmorEquipped(actor, location) {
  //handles removing/equipping armor. Subtracting/Adding values to armor per section. Also removed currently equipped armor if is in current section.

  //First, calculate the armor's final values.
  await UpdateArmor(actor);
  const newSection = {};
  for (const key of Object.keys(actor.system.armor[location])) {
    newSection[key] = 0;
  }

  for (const armor of actor.system.items.armor) {
    if (armor.system.location !== location) continue;
    if (!armor.system.equipped) continue;

    for (const [type, value] of Object.entries(armor.system.armorType)) {
      newSection[type] += value.final;
    }
  }

  return actor.update({
    [`system.armor.${location}`]: newSection
  });
}

export async function UpdateArmor(actor) {
  for (const item of actor.items) {
    if (item.type !== "armor") continue;
    const a = item.system;
    const qualityValue = Number(a.specialValue ?? 0);
    const q = quality(qualityValue);

    // compute Final values
    const cutFinal = a.armorType.cut.base + a.armorType.cut.bonus + q.at;
    const impFinal = a.armorType.imp.base + a.armorType.imp.bonus + q.at;
    const thrFinal = a.armorType.thr.base + a.armorType.thr.bonus + q.at;
    const heaFinal = a.armorType.hea.base + a.armorType.hea.bonus + q.at;
    const eleFinal = a.armorType.ele.base + a.armorType.ele.bonus + q.at;
    const colFinal = a.armorType.col.base + a.armorType.col.bonus + q.at;

    let eneFinal = 0;
    if (a.isEnchanted) {
      // Only apply Energy AT bonus from quality if armor is magical.
      eneFinal = a.armorType.ene.base + a.armorType.ene.bonus + q.at;
    } else {
      eneFinal = a.armorType.ene.base + a.armorType.ene.bonus;
    }

    const armorReqFinal = a.wearArmorReq.base + a.wearArmorReq.bonus + q.armorRequirement;
    const fortFinal = a.fortitude.base + a.fortitude.bonus + q.fortitude;
    const presFinal = a.presence.base + a.presence.bonus + q.presence;
    const natPen = a.naturalPenalty.base + a.naturalPenalty.bonus + q.naturalPenalty;
    const movePen = a.moveRestriction.base + a.moveRestriction.bonus + q.movementPenalty;

    // Calculate Penalties using finals
    const natPenalty = naturalPenalty(actor, armorReqFinal);
    const phyPenalty = physicalPenalty(actor, armorReqFinal);
    const movPenalty = moveRestriction(actor, armorReqFinal);

    let natPenFinal = natPenalty + natPen;
    if (natPenFinal < 0) {
      natPenFinal = 0;
    }
    let movPenFinal = movPenalty + movePen;
    if (movPenFinal < 0) {
      movPenFinal = 0;
    }
    const phyPenFinal = phyPenalty;

    await item.update({
      "system.armorType.cut.final": cutFinal,
      "system.armorType.imp.final": impFinal,
      "system.armorType.thr.final": thrFinal,
      "system.armorType.hea.final": heaFinal,
      "system.armorType.ele.final": eleFinal,
      "system.armorType.col.final": colFinal,
      "system.armorType.ene.final": eneFinal,
      "system.wearArmorReq.final": armorReqFinal,
      "system.fortitude.final": fortFinal,
      "system.presence.final": presFinal,

      //Penalties
      "system.naturalPenalty.final": natPenFinal,
      "system.moveRestriction.final": movPenFinal,
      "system.physicalPenalty": phyPenFinal,
      "system.perceptionPenalty": a.perceptionPenalty
    });

    //finally remove any global modifiers that may exist for specific armor.
    AddModifier(actor.system.globalModifiers.Physical, {
      id: item._id,
      source: "Armor",
      value: 0,
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Natural, {
      id: item._id,
      source: "Armor",
      value: 0,
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Natural, {
      id: item._id,
      source: "Armor",
      value: 0,
      type: "movement"
    });

    AddModifier(actor.system.globalModifiers.Perception, {
      id: item._id,
      source: "Armor",
      value: 0,
      type: "armor"
    });
  }
  // Lastly, re calculate ArmorPenalties
  ArmorPenalties(actor);
}

function ArmorPenalties(actor) {
  // Apply/Remove Armor penalties to global modifiers depending on if armor was equipped/unequipped.
  for (const armor of actor.system.items.armor) {
    // rebuild armor penalties based on all equipped armor.
    console.log(armor);
    if (armor.system.equipped == false) continue;
    AddModifier(actor.system.globalModifiers.Physical, {
      id: armor._id,
      source: "Armor",
      value: toNum(armor.system.physicalPenalty),
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Natural, {
      id: armor._id,
      source: "Armor",
      value: toNum(armor.system.naturalPenalty.final),
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Natural, {
      id: armor._id,
      source: "Armor",
      value: toNum(armor.system.moveRestriction.final),
      type: "movement"
    });

    AddModifier(actor.system.globalModifiers.Perception, {
      id: armor._id,
      source: "Armor",
      value: toNum(armor.system.perceptionPenalty),
      type: "armor"
    });
  }
}

function quality(qualityValue) {
  // Normalize to nearest multiple of 5, clamp to [-25, 25]
  const q = Math.max(-25, Math.min(25, Math.floor(qualityValue / 5) * 5));
  const steps = Math.abs(q) / 5;
  const sign = q >= 0 ? 1 : -1;

  return {
    naturalPenalty: sign * steps * -5, // -5 per +5 quality
    armorRequirement: sign * steps * -5, // -5 per +5 quality
    at: sign * steps * 1, // +1 AT per +5
    fortitude: sign * steps * 10, // +10 per +5
    movementPenalty: sign * steps * -1, // -1 per +5

    // Presence NEVER decreases for negative quality
    presence: steps * 50
  };
}

function physicalPenalty(actor, armorReqFinal) {
  // compare final WearArmor ability to the armor's final wearArmorReq. The difference is the penalty.
  const wearArmor = toNum(actor.system.abilities.primary.Combat.WearArmor.base);
  const wearArmorReq = toNum(armorReqFinal);

  const diff = wearArmorReq - wearArmor;

  if (diff > 0) {
    return diff;
  } else {
    return 0;
  }
}

function naturalPenalty(actor, armorReqFinal) {
  const wearArmor = toNum(actor.system.abilities.primary.Combat.WearArmor.base);
  const wearArmorReq = toNum(armorReqFinal);

  const diff = wearArmor - wearArmorReq;

  // If diff > 0, reduce natural penalty by that amount
  if (diff > 0) {
    return -diff; // reduction is negative (reduces penalty)
  }

  return 0; // no reduction
}

function moveRestriction(actor, armorReqFinal) {
  const wearArmor = toNum(actor.system.abilities.primary.Combat.WearArmor.base);
  const wearArmorReq = toNum(armorReqFinal);

  const diff = wearArmor - wearArmorReq;

  // Only positive diff reduces movement restriction
  if (diff <= 0) return 0;

  // Every 50 points above requirement reduces movement penalty by 1
  const reduction = Math.floor(diff / 50);

  // Reduction is negative because it reduces a penalty
  return -reduction;
}
