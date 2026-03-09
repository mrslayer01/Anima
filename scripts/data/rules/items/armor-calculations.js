import { AddModifier } from "../../../utils/helpers.js";
import { ARMOR_SECTIONS } from "../../../utils/lookup.js";
import { toNum } from "../../../utils/numbers.js";

export async function ArmorCalculate(actor) {
  // 1. Recompute each armor item's final AT values (quality, bonuses, etc.)
  await UpdateArmor(actor);

  // 2. Gather equipped armor
  const allCurrentArmor = actor.items.filter((i) => i.type === "armor" && i.system.equipped);

  // 3. Compute combined values
  const totalPenalties = getPenalties(allCurrentArmor);
  // Perception penalty comes ONLY from helm
  const helm = allCurrentArmor.find((a) => a.system.location === "helm");
  const perceptionPenalty = helm ? helm.system.perceptionPenalty : 0;

  const totalWearArmorReq = getTotalWearArmorRequirement(allCurrentArmor);
  const wornAT = getWornAT(allCurrentArmor);
  const naturalAT = getNaturalAT(allCurrentArmor);
  const totalAT = getTotalAT(wornAT, naturalAT);

  // console.log(
  //   "Total Penalties, totalArmorReq, totalATValues",
  //   totalPenalties,
  //   totalWearArmorReq,
  //   totalATValues
  // );

  const updateData = {};

  // ------------------------------------------------------------
  // 4. Clear all armor sections
  // ------------------------------------------------------------
  for (const section of Object.keys(actor.system.armor)) {
    for (const type of Object.keys(actor.system.armor[section])) {
      updateData[`system.armor.${section}.${type}`] = 0;
    }
  }

  // ------------------------------------------------------------
  // 5. Write combined AT into ONE section only (Model A)
  //    We choose "complete" as the canonical combined-armor section.
  // ------------------------------------------------------------
  // 1. Clear ONLY worn-armor sections (NOT natural)
  for (const section of ARMOR_SECTIONS) {
    if (section === "natural") continue; // preserve natural armor

    for (const type of Object.keys(actor.system.armor[section])) {
      updateData[`system.armor.${section}.${type}`] = 0;
    }
  }

  // 2. Write worn AT into each equipped worn-armor section
  for (const armor of allCurrentArmor) {
    const section = armor.system.location;

    if (section === "natural") continue; // never overwrite natural

    for (const type of Object.keys(wornAT)) {
      updateData[`system.armor.${section}.${type}`] = wornAT[type];
    }
  }

  // 3. Write natural armor values into the natural section
  for (const type of Object.keys(naturalAT)) {
    updateData[`system.armor.natural.${type}`] = naturalAT[type];
  }

  // ------------------------------------------------------------
  // 6. Apply combined penalties via global modifiers
  //    (ArmorRule will NOT apply per-armor penalties anymore)
  // ------------------------------------------------------------

  // Set combined penalties for derrived armor.js
  updateData["system.armor.combinedPenalties"] = {
    physical: totalPenalties.PhysicalPenalty,
    natural: totalPenalties.NaturalPenalty,
    movement: totalPenalties.MovementPenalty,
    perception: perceptionPenalty // from helm only
  };

  // Clear old combined modifiers
  AddModifier(actor.system.globalModifiers.Physical, {
    id: `combined-physical`,
    source: "Armor",
    value: 0,
    type: "armor"
  });

  AddModifier(actor.system.globalModifiers.Natural, {
    id: `combined-natural`,
    source: "Armor",
    value: 0,
    type: "armor"
  });

  AddModifier(actor.system.globalModifiers.Movement, {
    id: `combined-movement`,
    source: "Armor",
    value: 0,
    type: "armor"
  });

  AddModifier(actor.system.globalModifiers.Perception, {
    id: `perception`,
    source: "Armor",
    value: 0,
    type: "armor"
  });

  // Apply new combined penalties
  AddModifier(actor.system.globalModifiers.Physical, {
    id: `combined-physical`,
    source: "Armor",
    value: -totalPenalties.PhysicalPenalty,
    type: "armor"
  });

  AddModifier(actor.system.globalModifiers.Natural, {
    id: `combined-natural`,
    source: "Armor",
    value: -totalPenalties.NaturalPenalty,
    type: "armor"
  });

  AddModifier(actor.system.globalModifiers.Movement, {
    id: `combined-movement`,
    source: "Armor",
    value: -totalPenalties.MovementPenalty,
    type: "armor"
  });

  AddModifier(actor.system.globalModifiers.Perception, {
    id: `perception`,
    source: "Armor",
    value: -perceptionPenalty ?? 0,
    type: "armor"
  });

  // ------------------------------------------------------------
  // 7. Initiative penalty (layer penalty)
  // ------------------------------------------------------------
  updateData["system.initiative.armorPenalty"] = totalPenalties.LayerPenalty;

  // ------------------------------------------------------------
  // 8. Wear Armor Requirement (total)
  // ------------------------------------------------------------
  updateData["system.armorRequirement.total"] = totalWearArmorReq;

  // ------------------------------------------------------------
  // 9. Commit update (recursion-safe)
  // ------------------------------------------------------------
  await actor.update(updateData, { noArmorRecalc: true });
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
    if (a.isEnchanted || a.armorType.ene.base > 0) {
      // Only apply Energy AT bonus from quality if armor is magical or already an energy value.
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

    await item.update(
      {
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
      },
      { noArmorRecalc: true }
    );

    //finally remove any global modifiers that may exist for specific armor.
    AddModifier(actor.system.globalModifiers.Physical, {
      id: `${item._id}-physical`,
      source: "Armor",
      value: 0,
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Natural, {
      id: `${item._id}-natural`,
      source: "Armor",
      value: 0,
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Movement, {
      id: `${item._id}-movement`,
      source: "Armor",
      value: 0,
      type: "armor"
    });

    AddModifier(actor.system.globalModifiers.Perception, {
      id: `${item._id}-perception`,
      source: "Armor",
      value: 0,
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

function getPenalties(allCurrentArmor) {
  // Layer Penalty - -20 penalty per extra layer, max of -40 (2 soft, 1 hard allowed). (Affects initiative and armor effected secondaries), natural penalty and movement penalty
  // Get the count of all equipped armor excluding Natural
  const armorTotal = allCurrentArmor.filter((i) => i.system.location !== "natural").length;
  const allArmor = allCurrentArmor.filter((i) => i.system.location !== "natural");

  let totalLayerPenalty = 0;
  let totalNaturalPenalty = 0;
  let totalMovementPenalty = 0;
  let totalPhysicalPenalty = 0;

  if (armorTotal > 1) {
    // Layer Penalty
    totalLayerPenalty = (armorTotal - 1) * -20;
  }

  // Other Penalties
  for (const armor of allArmor) {
    totalNaturalPenalty += armor.system.naturalPenalty.final;
    totalMovementPenalty += armor.system.moveRestriction.final;
    totalPhysicalPenalty += armor.system.physicalPenalty;
  }

  return {
    LayerPenalty: totalLayerPenalty,
    NaturalPenalty: totalNaturalPenalty,
    MovementPenalty: totalMovementPenalty,
    PhysicalPenalty: totalPhysicalPenalty
  };
}

function getTotalWearArmorRequirement(allCurrentArmor) {
  // Wear armor Requirement - Wear armor is cumulative. The final wear armor requirement is the sum of each equipped piece's wear armor requirement.
  // Get the wear armor of each piece of armor equipped, excluding natural which should not have a requirement.

  let wearArmorReq = 0;

  for (const armor of allCurrentArmor.filter((i) => i.system.location !== "natural")) {
    wearArmorReq += armor.system.wearArmorReq.final;
  }

  return wearArmorReq;
}

function getWornAT(allCurrentArmor) {
  const DAMAGE_TYPES = ["cut", "imp", "thr", "hea", "ele", "col", "ene"];

  const wornArmor = allCurrentArmor.filter((a) => a.system.location !== "natural");

  const finalAT = {};

  for (const type of DAMAGE_TYPES) {
    const values = wornArmor.map((a) => a.system.armorType[type].final);

    if (values.length === 0) {
      finalAT[type] = 0;
      continue;
    }

    const highest = Math.max(...values);
    const others = values.filter((v) => v !== highest);
    const halfSum = others.reduce((sum, v) => sum + Math.floor(v / 2), 0);

    finalAT[type] = highest + halfSum;
  }

  return finalAT;
}

function getNaturalAT(allCurrentArmor) {
  const DAMAGE_TYPES = ["cut", "imp", "thr", "hea", "ele", "col", "ene"];

  const naturalArmor = allCurrentArmor.filter((a) => a.system.location === "natural");

  const finalAT = {};

  for (const type of DAMAGE_TYPES) {
    finalAT[type] = naturalArmor.reduce((sum, a) => sum + a.system.armorType[type].final, 0);
  }

  return finalAT;
}

function getTotalAT(wornAT, naturalAT) {
  const final = {};
  for (const type of Object.keys(wornAT)) {
    final[type] = wornAT[type] + naturalAT[type];
  }
  return final;
}
