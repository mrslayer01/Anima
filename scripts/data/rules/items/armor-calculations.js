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

  return actor.update({
    [`system.armor.${location}`]: newSection
  });
}

export async function ArmorEquipped(actor, location) {
  //handles removing/equipping armor. Subtracting/Adding values to armor per section. Also removed currently equipped armor if is in current section.

  //First, calculate the armor's final values.
  UpdateArmor(actor);
  //need to also apply natural penalties/wear armor difference penalties.
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

    const natPenFinal = a.naturalPenalty.base + a.naturalPenalty.bonus + q.naturalPenalty;
    const armorReqFinal = a.wearArmorReq.base + a.wearArmorReq.bonus + q.armorRequirement;
    const fortFinal = a.fortitude.base + a.fortitude.bonus + q.fortitude;
    const movPenFinal = a.moveRestriction.base + a.moveRestriction.bonus + q.movementPenalty;
    const presFinal = a.presence.base + a.presence.bonus + q.presence;

    await item.update({
      "system.armorType.cut.final": cutFinal,
      "system.armorType.imp.final": impFinal,
      "system.armorType.thr.final": thrFinal,
      "system.armorType.hea.final": heaFinal,
      "system.armorType.ele.final": eleFinal,
      "system.armorType.col.final": colFinal,
      "system.armorType.ene.final": eneFinal,
      "system.naturalPenalty.final": natPenFinal,
      "system.wearArmorReq.final": armorReqFinal,
      "system.fortitude.final": fortFinal,
      "system.moveRestriction.final": movPenFinal,
      "system.presence.final": presFinal
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
