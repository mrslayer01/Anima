import { promptInitiativeModifierWindow } from "../../utils/combat.js";
import { capitalizeFirst, getActorOwner } from "../../utils/helpers.js";
import {
  ARMOR_COVERAGE,
  computeCounterattack,
  computeDamagePercent,
  difficultyMap,
  MAGIC_PROJECTION_DIFFICULTY,
  PSYCHIC_PROJECTION_DIFFICULTY
} from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";
import {
  animaOpenRoll,
  castCheck,
  castPsychicPower,
  characteristicCheck,
  resistanceCheck
} from "../../utils/rolls.js";
import { CombatWindow } from "../windows/combat-window.js";
import { DefendWindow } from "../windows/defend-window.js";

export function RollListeners(sheet, html) {
  html.find(".char-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".char-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;
    // Pull the base from the actor to be used as the target.
    const value = sheet.actor.system.characteristics[char].base;
    characteristicCheck({
      value,
      label: `${char} Check`,
      actor: sheet.actor
    });
  });

  //Characteristic Open Roll
  html.find(".open-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".open-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;

    animaOpenRoll({
      value: sheet.actor.system.characteristics[char].final,
      label: `${char} Open Roll`,
      actor: sheet.actor
    });
  });

  //Ability Open Roll
  html.find(".ability-roll").off("click");
  html.find(".ability-roll").on("click", (ev) => {
    const categoryName = ev.currentTarget.dataset.category;
    const abilityName = ev.currentTarget.dataset.ability;

    const primaries = sheet.actor.system?.abilities?.primary;
    const secondaries = sheet.actor.system?.abilities?.secondary;

    const primaryAbility = primaries?.[categoryName]?.[abilityName];

    const secondaryAbility = secondaries?.[categoryName]?.[abilityName];

    new Dialog({
      title: "Open Roll Modifier",
      content: `
                    <div style="margin-bottom: 1em;">
                      <label><b>Modifier:</b></label>
                      <input type="number" id="mod" value="0" style="width: 100%;" />
                    </div>
                  `,
      buttons: {
        roll: {
          label: "Roll",
          callback: (html) => {
            const modifier = toNum(html.find("#mod").val());

            // Primary ability roll
            if (primaryAbility) {
              animaOpenRoll({
                value: primaryAbility.final + modifier,
                label: `${abilityName} Open Roll`,
                actor: sheet.actor,
                undeveloped: false,
                mastery: primaryAbility.mastery
              });
            }
            // Secondary ability roll
            if (secondaryAbility) {
              if (secondaryAbility.undeveloped && secondaryAbility.knowledge) {
                return ui.notifications.error(
                  "Unable to roll for an undeveloped knowledge ability."
                );
              }

              animaOpenRoll({
                value: secondaryAbility.final + modifier,
                label: `${abilityName} Open Roll`,
                actor: sheet.actor,
                undeveloped: secondaryAbility.undeveloped,
                mastery: secondaryAbility.mastery
              });
              return;
            }
          }
        }
      },
      default: "roll"
    }).render(true);
  });

  //initiative open roll
  html.find(".init-roll").off("click");
  html.find(".init-roll").on("click", async (ev) => {
    const actor = sheet.actor;
    const baseInit = toNum(ev.currentTarget.dataset.ability) || 0;

    // Ask the user for modifiers (custom + situational)
    const { final, mod, situational } = await promptInitiativeModifierWindow(actor);

    // Perform the open roll
    const rollResult = await animaOpenRoll({
      value: baseInit + final,
      label: `Initiative`,
      actor,
      undeveloped: false,
      mastery: false,
      capture: false
    });

    // Update initiative if in combat
    const combat = game.combat;
    if (combat) {
      const combatant = combat.combatants.find((c) => c.actor?.id === actor.id);
      if (combatant) {
        await combat.setInitiative(combatant.id, rollResult.final);
      }
    }
  });

  //Resistance Roll
  html.find(".res-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".res-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;

    new Dialog({
      title: "Resistance Check",
      content: `
                <div>
                  <label><b>Difficulty:</b></label>
                  <select id="diff" style="width: 100%;">
                    ${Object.entries(difficultyMap)
                      .map(([value, label]) => {
                        return `
                          <option 
                            value="${value}" 
                            title="${label}"
                            ${String(value) === "0" ? "selected" : ""}
                          >
                            ${label}
                          </option>
                        `;
                      })
                      .join("")}
                  </select>
                </div>
              `,
      buttons: {
        roll: {
          label: "Roll",
          callback: (html) => {
            const value = sheet.actor.system.resistances[char].final;
            const difficulty = toNum(html.find("#diff").val());

            resistanceCheck({
              value,
              difficulty,
              label: `${char} Resistance Check`,
              actor: sheet.actor
            });
          }
        }
      },
      default: "roll"
    }).render(true);
  });

  html.find(".attack-roll").off("click");
  html.find(".attack-roll").on("click", async (ev) => {
    // ---------------------------------------------------------
    // WEAPON + ATTACK BASE VALUE
    // ---------------------------------------------------------
    const equippedWeapon = sheet.actor.items.find((i) => i.type === "weapon" && i.system.equipped);
    if (!equippedWeapon) {
      ui.notifications.error("No weapon equipped, unable to make the attack.");
      return;
    }

    const w = equippedWeapon.system;
    let attackValue = toNum(sheet.actor.system.abilities.primary.Combat.Attack.final);

    const {
      final,
      region,
      directed,
      attackType: atkTypeInitial
    } = await promptAttackModifierWindow({
      isSpellAttack: false,
      weapon: w,
      attackValue,
      actor: sheet.actor
    });

    let attackType = atkTypeInitial;
    attackValue += final;

    let armorPen = 0;

    // ---------------------------------------------------------
    // PROJECTILE WEAPON → REQUIRE EQUIPPED AMMO
    // ---------------------------------------------------------
    if (w.weaponType === "projectile") {
      const ammoRefs = w.ammo ?? [];
      let equippedAmmo = null;

      for (const ref of ammoRefs) {
        const ammoItem = sheet.actor.items.get(ref.id);
        if (ammoItem?.system?.equipped) {
          equippedAmmo = ammoItem;
          break;
        }
      }

      if (!equippedAmmo) {
        ui.notifications.error("You cannot attack with a projectile weapon without equipped ammo.");
        return;
      }

      attackType = equippedAmmo.system.primaryAtkType;
      armorPen = equippedAmmo.system.armorReduction ?? 0;
    }

    const targets = Array.from(game.user.targets);
    const isAOE = false;
    const weaponType = w.weaponType;
    const attackData = { attackValue, armorPen, directed, attackType, weaponType, isAOE };

    if (targets.length === 0) {
      return await manualDefend(sheet, attackData);
    }

    if (targets.length === 1) {
      // existing single-target logic
      return await handleSingleTargetAttack(
        sheet,
        w,
        attackData,
        region,
        directed,
        attackType,
        targets[0],
        false
      );
    }

    // NEW multi-target logic
    return await handleMultiTargetAttack(
      sheet,
      w,
      attackData,
      region,
      directed,
      attackType,
      targets,
      false
    );
  });

  html.find(".spell-attack-roll").off("click");
  html.find(".spell-attack-roll").on("click", async (ev) => {
    const actor = sheet.actor;

    const targets = Array.from(game.user.targets);

    let attackValue = toNum(
      actor.system.abilities.primary.Supernatural.MagicProjection.offensiveFinal
    );

    // If there is no target, prompt the choice between manual attack, or non combat porjection.
    if (targets.length === 0) {
      const isSpellAttack = await checkMagicProjectionType({
        value: attackValue,
        label: "Magic Projection check",
        actor: sheet.actor
      });

      if (!isSpellAttack) return;
    }

    const { final, region, directed, attackType, zeonCost, isAOE } =
      await promptAttackModifierWindow({
        isSpellAttack: true,
        attackValue,
        actor: sheet.actor
      });

    attackValue += final;

    let armorPen = 0; // spells normally have no armor penetration
    const weaponType = "Spell Attack";

    const attackData = { attackValue, armorPen, directed, attackType, weaponType, isAOE };

    // ---------------------------------------------------------
    // CHECK ZEON
    // ---------------------------------------------------------
    const enoughZeon = await zeon(zeonCost, actor);
    if (!enoughZeon) {
      if (zeonCost > 0) {
        return ui.notifications.warn("Not enough Zeon is accumulated to cast this spell.");
      } else {
        // Do nothing but let the user know.
        ui.notifications.warn("No Zeon cost was specified.");
      }
    }

    if (targets.length === 0) {
      return await manualDefend(sheet, attackData);
    }

    if (targets.length === 1) {
      // single-target logic
      return await handleSingleTargetAttack(
        sheet,
        null,
        attackData,
        region,
        directed,
        attackType,
        targets[0],
        true
      );
    }

    // multi-target logic
    return await handleMultiTargetAttack(
      sheet,
      null,
      attackData,
      region,
      directed,
      attackType,
      targets,
      true
    );
  });

  html.find(".psychic-attack-roll").off("click");
  html.find(".psychic-attack-roll").on("click", async (ev) => {
    const index = toNum(ev.currentTarget.dataset.index);
    const actor = sheet.actor;

    const targets = Array.from(game.user.targets);

    const psychicProjection = actor.system.abilities.primary.Psychic.PsychicProjection;

    let attackValue = toNum(psychicProjection.final);

    // Before doing anything, first make a Psychic Potential check and record the results.

    const powers = actor.system.psychic.mentalPowers;
    const power = powers[index];
    if (!power) return;

    const castPower = await castPsychicPower(actor, index);
    if (!castPower) return;

    // If there is no target, prompt the choice between manual attack, or non combat porjection.
    if (targets.length === 0) {
      const isSpellAttack = await checkPsychicProjectionType({
        value: attackValue,
        label: "Psychic Projection check",
        actor: sheet.actor
      });

      if (!isSpellAttack) return;
    }

    const { final, region, directed, attackType, isAOE, ppSpent, ppBonus } =
      await promptAttackModifierWindow({
        isPsychicAttack: true,
        attackValue,
        actor: sheet.actor
      });

    attackValue += final + (ppBonus ?? 0);

    if (ppSpent > 0) {
      await actor.update({
        "system.abilities.primary.Psychic.PsychicPoints.temp":
          (actor.system.abilities.primary.Psychic.PsychicPoints.temp || 0) + ppSpent
      });
    }

    let armorPen = 0; // spells normally have no armor penetration
    const weaponType = "Psychic Attack";

    const attackData = { attackValue, armorPen, directed, attackType, weaponType, isAOE };

    if (targets.length === 0) {
      return await manualDefend(sheet, attackData);
    }

    if (targets.length === 1) {
      // single-target logic
      return await handleSingleTargetAttack(
        sheet,
        null,
        attackData,
        region,
        directed,
        attackType,
        targets[0],
        true
      );
    }

    // multi-target logic
    return await handleMultiTargetAttack(
      sheet,
      null,
      attackData,
      region,
      directed,
      attackType,
      targets,
      true
    );
  });

  html.find(".damage-roll").off("click");
  html.find(".damage-roll").on("click", async (ev) => {
    const baseDamage = toNum(ev.currentTarget.dataset.damage) || 0;

    const { dmg, pct } = await promptDamageCalculation(baseDamage);

    postDamageCard({ dmg, pct });
  });
}

async function manualDefend(sheet, attackData) {
  const result = await new Promise((resolve) => {
    new DefendWindow(resolve, {
      manual: true,
      attackData,
      defValue: 0
    }).render(true);
  });

  let dodgeMastery = false;
  let blockMastery = false;

  if (result.defenseValue >= 200) {
    if (result.type === "dodge") dodgeMastery = true;
    if (result.type === "block") blockMastery = true;
  }

  let defensePenalty = 0;

  if (attackData.weaponType === "Spell Attack") {
    if (!attackData.isAOE) {
      defensePenalty = DefensePenalty("spell", result.type, false, false);
    } else {
      defensePenalty = DefensePenalty("aoe", result.type, false, false);
    }
  } else {
    defensePenalty = DefensePenalty(
      attackData.weaponType,
      result.type,
      blockMastery,
      result.hasShield,
      dodgeMastery
    );
  }

  let defenseFinal = 0;

  if (result.type === "block") {
    defenseFinal = result.defenseValue + defensePenalty + result.modifier;
  } else if (result.type === "dodge") {
    defenseFinal = result.defenseValue + defensePenalty + result.modifier;
  } else if (result.type === "projection") {
    defenseFinal = result.defenseValue + defensePenalty + result.modifier;
  }

  const manualAT = result.manualAT;

  const finalAttack = attackData.attackValue;

  const defender = await animaOpenRollCapture({
    value: defenseFinal,
    label: "Defense (Manual)",
    actor: sheet.actor
  });

  const attacker = await animaOpenRollCapture({
    value: finalAttack,
    label: "Attack",
    actor: sheet.actor
  });

  setTimeout(
    () =>
      postCombinedCombatCard(
        attacker,
        defender,
        manualAT,
        attackData.armorPen,
        attackData.directed,
        attackData.attackType
      ),
    2000
  );

  return;
}

async function getDefense(defenderUser, targetActor, attackData) {
  let defense;
  const block = toNum(targetActor.system.abilities.primary.Combat.Block.final);
  const dodge = toNum(targetActor.system.abilities.primary.Combat.Dodge.final);
  const projection = toNum(
    targetActor.system.abilities.primary.Supernatural.MagicProjection.defensiveFinal
  );
  const options = { targetActor, attackData, block, dodge, projection };

  //console.log(options);

  // ---------------------------------------------------------
  // CASE A — Attacker and Defender are the SAME user → local prompt
  // ---------------------------------------------------------
  if (defenderUser.id === game.user.id) {
    //console.log("GM is defender → showing local defense dialog.");
    defense = await promptDefenseChoice(options);
  }

  // ---------------------------------------------------------
  // CASE B — Defender is ONLINE → send socket prompt
  // ---------------------------------------------------------
  else if (defenderUser.active) {
    //console.log("Defender online → sending socket prompt.");
    game.socket.emit("system.abf-system", {
      type: "defense:prompt",
      userId: defenderUser.id,
      attackerId: game.user.id,
      targetId: targetActor.id,
      attackData
    });

    defense = await waitForDefenseResponse(game.user.id);
  }

  // ---------------------------------------------------------
  // CASE C — Defender is OFFLINE → GM handles locally
  // ---------------------------------------------------------
  else {
    //console.log("Defender offline → GM handles defense locally.");
    defense = await promptDefenseChoice(options);
  }
  return defense;
}

function DefensePenalty(weaponType, type, blockMastery, equippedshield, dodgeMastery) {
  let penalty = 0;
  // Projection sufferens no penalties when defending, regardless of the attack.
  if (weaponType === "projectile") {
    if (type === "block") {
      // If blocking check if has mastery or is wearing a shield.
      if (blockMastery) {
        if (!equippedshield) {
          //If has mastery but no shield there is a -20 penalty.
          penalty = -20;
        }
      } else {
        //If no blocking mastery
        if (!equippedshield) {
          // No block master and not wearing a shield is a -80 penalty.
          penalty = -80;
        } else {
          // No block mastery and wearing a shield is a -30 penalty
          penalty = -30;
        }
      }
    }
    if (type === "dodge") {
      // If dodging check if has mastery.
      if (!dodgeMastery) {
        // If dodging and does not have mastery it's -30
        penalty = -30;
      }
    }
  } else if (weaponType === "throwing") {
    // Throwing only applies a penalty if attempting to block without master or a shield.
    if (type === "block") {
      // If blocking check if has mastery or is wearing a shield.
      if (!blockMastery && !equippedshield) {
        penalty = -50;
      }
    }
  } else if (weaponType === "aoe" || weaponType === "spell") {
    // When attempoting to defend against an AOE attack, they only primary option is to try and dodge. It gives a -80 by default. If attempts to block it's -120.
    if (type === "block") {
      penalty = -120;
    } else if (type === "dodge") {
      penalty = -80;
    }
  }
  return penalty;
}

function getEffectiveAT(actor, region, attackType) {
  let total = 0;

  // Get real armor items
  const armors = actor.items.filter((i) => i.type === "armor" && i.system.equipped);

  for (const armor of armors) {
    const coverage = ARMOR_COVERAGE[armor.system.location] ?? [];

    if (coverage.includes(region)) {
      total += actor.system.armor.total[attackType] ?? 0;
    }
  }

  return total;
}

async function animaOpenRollCapture(opts) {
  const roll = await animaOpenRoll({
    ...opts,
    capture: true,
    hideDice: opts.hideDice
  });

  // Attach token reference for chat card display
  roll.token = opts.token ?? null;

  return roll;
}

async function checkMagicProjectionType(opt) {
  return new Promise((resolve) => {
    new Dialog({
      title: "Spell Projection",
      content: `
        <div style="margin-bottom: 0.75em;">
          <p><b>Type of Magic Projection</b></p>
        </div>
      `,
      buttons: {
        attack: {
          label: "Attack",
          callback: () => resolve(true)
        },
        general: {
          label: "General",
          callback: () => {
            resolve(false);

            const dlg = new Dialog({
              title: "Magic Projection Difficulty",
              content: `
                <div>
                  <label><b>Difficulty:</b></label>
                  <select id="mpDiff">
                    ${Object.entries(MAGIC_PROJECTION_DIFFICULTY)
                      .map(([key, entry]) => {
                        return `
                          <option 
                            value="${key}"
                            data-description="${entry.description}"
                          >
                            ${entry.label}
                          </option>
                        `;
                      })
                      .join("")}
                  </select>

                  <div id="mpDescription">
                    ${MAGIC_PROJECTION_DIFFICULTY.routine.description}
                  </div>
                </div>
              `,
              buttons: {
                confirm: {
                  label: "Confirm",
                  callback: async (html) => {
                    const key = html.find("#mpDiff").val();
                    const entry = MAGIC_PROJECTION_DIFFICULTY[key].value;

                    await animaCastCheckCapture({
                      value: opt.value,
                      difficulty: entry,
                      label: "Magic Projection check",
                      actor: opt.actor,
                      capture: true
                    });
                  }
                }
              },
              default: "confirm",

              render: (html) => {
                const select = html.find("#mpDiff")[0];
                const descBox = html.find("#mpDescription")[0];

                select.addEventListener("change", () => {
                  const selected = select.options[select.selectedIndex];
                  descBox.textContent = selected.dataset.description;
                  dlg.setPosition({ height: "auto" });
                });

                dlg.setPosition({ height: "auto" });
              }
            });

            dlg.render(true);
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => resolve(false)
        }
      },
      default: "attack"
    }).render(true);
  });
}

async function checkPsychicProjectionType(opt) {
  return new Promise((resolve) => {
    new Dialog({
      title: "Spell Projection",
      content: `
        <div style="margin-bottom: 0.75em;">
          <p><b>Type of Psychic Projection</b></p>
        </div>
      `,
      buttons: {
        attack: {
          label: "Attack",
          callback: () => resolve(true)
        },
        general: {
          label: "General",
          callback: () => {
            resolve(false);

            const dlg = new Dialog({
              title: "Psychic Projection Difficulty",
              content: `
                <div>
                  <label><b>Difficulty:</b></label>
                  <select id="mpDiff">
                    ${Object.entries(PSYCHIC_PROJECTION_DIFFICULTY)
                      .map(([key, entry]) => {
                        return `
                          <option 
                            value="${key}"
                            data-description="${entry.description}"
                          >
                            ${entry.label}
                          </option>
                        `;
                      })
                      .join("")}
                  </select>

                  <div id="mpDescription">
                    ${PSYCHIC_PROJECTION_DIFFICULTY.routine.description}
                  </div>
                </div>
              `,
              buttons: {
                confirm: {
                  label: "Confirm",
                  callback: async (html) => {
                    const key = html.find("#mpDiff").val();
                    const entry = PSYCHIC_PROJECTION_DIFFICULTY[key].value;

                    await animaCastCheckCapture({
                      value: opt.value,
                      difficulty: entry,
                      label: "Psychic Projection check",
                      actor: opt.actor,
                      capture: true
                    });
                  }
                }
              },
              default: "confirm",

              render: (html) => {
                const select = html.find("#mpDiff")[0];
                const descBox = html.find("#mpDescription")[0];

                select.addEventListener("change", () => {
                  const selected = select.options[select.selectedIndex];
                  descBox.textContent = selected.dataset.description;
                  dlg.setPosition({ height: "auto" });
                });

                dlg.setPosition({ height: "auto" });
              }
            });

            dlg.render(true);
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => resolve(false)
        }
      },
      default: "attack"
    }).render(true);
  });
}

async function animaCastCheckCapture(opts) {
  const success = await castCheck({
    ...opts,
    capture: true
  });

  return success;
}

export function promptAttackModifierWindow(options = {}) {
  return new Promise((resolve) => {
    new CombatWindow(resolve, options).render(true);
  });
}

export async function promptDefenseChoice(options) {
  return new Promise((resolve) => {
    new DefendWindow(resolve, options).render(true);
  });
}

function postCombinedCombatCard(attacker, defender, defenderAT, armorPen, directed, attackType) {
  if (!attacker || !defender) return;

  const margin = attacker.final - defender.final;
  const counterBonus = computeCounterattack(margin);

  if (counterBonus > 0 || margin < 0) {
    return postCounterattackCard(attacker, defender, counterBonus);
  }

  const { pct } = computeDamagePercent(margin, defenderAT);

  const attackerName = attacker.token?.name ?? attacker.actor.name;
  const defenderName = defender.token?.name ?? defender.actor.name;

  const content = `
    <h4>Combat Exchange</h4>

    <h5>Attacker: ${attackerName}'s ${attacker.label}</h5>
    <b>Bonus:</b> ${attacker.bonus}<br>
    <b>Attack Type:</b> ${attackType}<br>
    ${armorPen > 0 ? `<b>Armor Pen:</b> ${armorPen}<br>` : ""}
    ${directed !== "None" ? `<b>Directed Attack:</b> ${directed}<br>` : ""}
    <b>Breakdown:</b><br>${attacker.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${attacker.final}<br>
    <hr>

    <h5>Defender: ${defenderName}'s ${defender.label}</h5>
    <b>AT:</b> ${defenderAT}<br>
    <b>Bonus:</b> ${defender.bonus}<br>
    <b>Breakdown:</b><br>${defender.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${defender.final}<br>
    <hr>

    <h5>Result</h5>
    <b>Margin:</b> ${margin}<br>
    <b>Damage Percent:</b> ${pct}%<br>
  `;

  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content
  });
}

async function promptDamageCalculation(baseDamage) {
  return new Promise((resolve) => {
    new Dialog({
      title: "Damage Calculation",
      content: `
        <div style="margin-bottom: 1em;">
          <label><b>Base Damage:</b></label>
          <input type="number" id="baseDmg" value="${baseDamage}" style="width: 100%;" />
        </div>

        <div style="margin-bottom: 1em;">
          <label><b>Damage Percent (%):</b></label>
          <input type="number" id="dmgPct" value="0" style="width: 100%;" />
        </div>
      `,
      buttons: {
        apply: {
          label: "Apply",
          callback: (html) => {
            const dmg = toNum(html.find("#baseDmg").val()) || 0;
            const pct = toNum(html.find("#dmgPct").val()) || 0;
            resolve({ dmg, pct });
          }
        }
      },
      default: "apply"
    }).render(true);
  });
}

async function postCounterattackCard(attacker, defender, counterBonus) {
  const margin = attacker.final - defender.final;

  const attackerName = attacker.token?.name ?? attacker.actor.name;
  const defenderName = defender.token?.name ?? defender.actor.name;

  const content = `
    <h4 style="color:#b30000;">Counterattack!</h4>

    <h5>Attacker: ${attackerName}</h5>
    <b>Bonus:</b> ${attacker.bonus}<br>
    <b>Breakdown:</b><br>${attacker.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${attacker.final}<br>

    <hr>

    <h5>Defender: ${defenderName}</h5>
    <b>Bonus:</b> ${defender.bonus}<br>
    <b>Breakdown:</b><br>${defender.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${defender.final}<br>

    <hr>

    <h5>Result</h5>
    <b>Margin:</b> ${margin}<br>
    <b>${defenderName}</b> counters.<br>
    <b>Counterattack Bonus:</b> +${counterBonus}<br>
    <hr>
  `;

  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content
  });
}

function postDamageCard({ dmg, pct }) {
  let final = dmg;
  if (pct > 0) final = Math.ceil(dmg * (pct / 100));

  const content = `
    <h4>Damage Result</h4>
    <b>Base Damage:</b> ${dmg}<br>
    <b>Percent Applied:</b> ${pct}%<br>
    <hr>
    <b>Final Damage:</b> <span style="color:red;"><b>${final} LP</b></span>
  `;

  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content
  });
}

async function zeon(zeonCost, actor) {
  if (zeonCost === 0) return false;
  // Removes the spell cost from the Accumulated pool, then adds what's left back to the reserve. Setting the accumulated to 0.
  const zeonPath = actor.system.abilities.primary.Supernatural.Zeon;
  let baseZeonAccumulated = zeonPath.temp;
  let baseZeonReserve = zeonPath.reserve;

  let finalZeonAccumulated = 0;
  let finalZeonReserve = 0;

  // First verify that there is even enough in the accumulated to cover the spell cost. If there is not, prompt the user, and don't remove any Zeon.
  if (baseZeonAccumulated < zeonCost) return false;

  finalZeonAccumulated = baseZeonAccumulated - zeonCost;
  finalZeonReserve = baseZeonReserve + finalZeonAccumulated;

  await actor.update({
    "system.abilities.primary.Supernatural.Zeon.temp": 0,
    "system.abilities.primary.Supernatural.Zeon.reserve": finalZeonReserve
  });

  return true;
}

function waitForDefenseResponse(attackerUserId) {
  return new Promise((resolve) => {
    const handler = (msg) => {
      if (msg.type === "defense:response" && msg.attackerId === attackerUserId) {
        game.socket.off("system.abf-system", handler);
        resolve(msg.defense);
      }
    };
    game.socket.on("system.abf-system", handler);
  });
}

function waitForDefenseResponseMulti(requestId, timeoutMs = 15000) {
  return new Promise((resolve) => {
    let resolved = false;

    const handler = (msg) => {
      if (msg.type === "defense:response-multi" && msg.requestId === requestId) {
        if (!resolved) {
          resolved = true;
          game.socket.off("system.abf-system", handler);
          resolve(msg.defense);
        }
      }
    };

    game.socket.on("system.abf-system", handler);

    // TIMEOUT FAILSAFE — prevents stale listeners
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        game.socket.off("system.abf-system", handler);
        resolve({
          type: "dodge",
          modifier: 0
        }); // fallback so the attack flow continues
      }
    }, timeoutMs);
  });
}

function getPreferredDefenderUser(actor) {
  const owners = game.users.filter((u) => actor.ownership[u.id] === 3);

  // Remove attacker from owner list
  const filteredOwners = owners.filter((u) => u.id !== game.user.id);

  // 1. Online non-GM owners
  const onlinePlayers = filteredOwners.filter((u) => !u.isGM && u.active);
  if (onlinePlayers.length > 0) return onlinePlayers[0];

  // 2. Offline non-GM owners
  const offlinePlayers = filteredOwners.filter((u) => !u.isGM && !u.active);
  if (offlinePlayers.length > 0) return offlinePlayers[0];

  // 3. Online GM
  const activeGM = game.users.find((u) => u.isGM && u.active);
  if (activeGM) return activeGM;

  // 4. Any GM
  return game.users.find((u) => u.isGM);
}

function getFinalDefenseValueSpell(targetActor, defense, isAOE) {
  const { type, modifier } = defense;
  let defenseValue = 0;

  const blockFinal = toNum(targetActor.system.abilities.primary.Combat.Block.final);
  const dodgeFinal = toNum(targetActor.system.abilities.primary.Combat.Dodge.final);
  const projectionFinal = toNum(
    targetActor.system.abilities.primary.Supernatural.MagicProjection.defensiveFinal
  );

  // Spell attacks count as Fired projectiles and can be an AOE attack.
  let defensePenalty = 0;

  if (!isAOE) {
    defensePenalty = DefensePenalty("spell", type, false, false);
  } else {
    defensePenalty = DefensePenalty("aoe", type, false, false);
  }

  if (type === "block") {
    defenseValue = blockFinal + modifier + defensePenalty;
  } else if (type === "dodge") {
    defenseValue = dodgeFinal + modifier + defensePenalty;
  } else if (type === "projection") {
    defenseValue = projectionFinal + modifier + defensePenalty;
  }

  return defenseValue;
}

async function handleSingleTargetAttack(
  sheet,
  w,
  attackData,
  region,
  directed,
  attackType,
  target,
  isSpellAttack
) {
  if (!target) {
    return await manualDefend(sheet, attackData);
  }

  const targetActor = target.actor;
  const defenderUser = getPreferredDefenderUser(targetActor);

  let defense = await getDefense(defenderUser, targetActor, attackData);
  const { type, modifier } = defense;

  if (!isSpellAttack) {
    const blockMastery = targetActor.system.abilities.primary.Combat.Block.mastery;
    const dodgeMastery = targetActor.system.abilities.primary.Combat.Dodge.mastery;
    const equippedshield = targetActor.items.find(
      (i) => i.type === "weapon" && i.system.weaponType === "shield" && i.system.equipped
    );

    let defensePenalty = DefensePenalty(
      w.weaponType,
      type,
      blockMastery,
      equippedshield,
      dodgeMastery
    );

    let defenseValue = 0;
    const blockFinal = toNum(targetActor.system.abilities.primary.Combat.Block.final);
    const dodgeFinal = toNum(targetActor.system.abilities.primary.Combat.Dodge.final);
    const projectionFinal = toNum(
      targetActor.system.abilities.primary.Supernatural.MagicProjection.defensiveFinal
    );

    if (type === "block") defenseValue = blockFinal + modifier + defensePenalty;
    if (type === "dodge") defenseValue = dodgeFinal + modifier + defensePenalty;
    if (type === "projection") defenseValue = projectionFinal + modifier + defensePenalty;

    let baseAT =
      directed !== "None"
        ? getEffectiveAT(targetActor, region, attackType)
        : targetActor.system.armor.total[attackType];

    let defATValue = Math.max(0, baseAT - attackData.armorPen);

    // DEFENDER ROLL (token included)
    const defenderRoll = await animaOpenRollCapture({
      value: defenseValue,
      label: capitalizeFirst(type),
      actor: targetActor,
      token: target
    });

    // ATTACKER ROLL (token included)
    const attackerRoll = await animaOpenRollCapture({
      value: attackData.attackValue,
      label: "Attack",
      actor: sheet.actor,
      token: sheet.token
    });

    setTimeout(
      () =>
        postCombinedCombatCard(
          attackerRoll,
          defenderRoll,
          defATValue,
          attackData.armorPen,
          attackData.directed,
          attackData.attackType
        ),
      2000
    );
  } else {
    const armorPen = 0;
    let defenseValue = getFinalDefenseValueSpell(targetActor, defense, attackData.isAOE);

    let baseAT =
      directed !== "None"
        ? getEffectiveAT(targetActor, region, attackType)
        : targetActor.system.armor.total[attackType];

    let defATValue = Math.max(0, baseAT - armorPen);

    const defenderRoll = await animaOpenRollCapture({
      value: defenseValue,
      label: capitalizeFirst(type),
      actor: targetActor,
      token: target
    });

    const attackerRoll = await animaOpenRollCapture({
      value: attackData.attackValue,
      label: "Spell Attack",
      actor: sheet.actor,
      token: sheet.token
    });

    setTimeout(
      () =>
        postCombinedCombatCard(
          attackerRoll,
          defenderRoll,
          defATValue,
          attackData.armorPen,
          attackData.directed,
          attackData.attackType
        ),
      2000
    );
  }
}

async function handleMultiTargetAttack(
  sheet,
  w,
  attackData,
  region,
  directed,
  attackType,
  targets,
  isSpellAttack
) {
  const attacker = sheet.actor;

  // ATTACKER ROLL (token included)
  const attackerRoll = await animaOpenRollCapture({
    value: attackData.attackValue,
    label: isSpellAttack ? "Spell Attack" : "Attack",
    actor: attacker,
    token: sheet.token,
    hideDice: true
  });

  const defensePromises = [];

  for (const target of targets) {
    const targetActor = target.actor;
    const defenderUser = getPreferredDefenderUser(targetActor);
    const requestId = foundry.utils.randomID();

    if (defenderUser.id === game.user.id) {
      defensePromises.push(
        promptDefenseChoice({
          targetActor,
          attackData,
          block: toNum(targetActor.system.abilities.primary.Combat.Block.final),
          dodge: toNum(targetActor.system.abilities.primary.Combat.Dodge.final),
          projection: toNum(
            targetActor.system.abilities.primary.Supernatural.MagicProjection.defensiveFinal
          )
        }).then((defense) => ({
          target,
          targetActor,
          defense
        }))
      );
    } else {
      game.socket.emit("system.abf-system", {
        type: "defense:prompt-multi",
        requestId,
        userId: defenderUser.id,
        attackerId: game.user.id,
        targetId: targetActor.id,
        attackData
      });

      defensePromises.push(
        waitForDefenseResponseMulti(requestId).then((defense) => ({
          target,
          targetActor,
          defense
        }))
      );
    }
  }

  const results = await Promise.all(defensePromises);

  for (const { target, targetActor, defense } of results) {
    const { type, modifier } = defense;

    let defenseValue = 0;
    let defensePenalty = 0;

    if (!isSpellAttack) {
      const blockMastery = targetActor.system.abilities.primary.Combat.Block.mastery;
      const dodgeMastery = targetActor.system.abilities.primary.Combat.Dodge.mastery;
      const equippedshield = targetActor.items.find(
        (i) => i.type === "weapon" && i.system.weaponType === "shield" && i.system.equipped
      );

      defensePenalty = DefensePenalty(
        w.weaponType,
        type,
        blockMastery,
        equippedshield,
        dodgeMastery
      );

      const blockFinal = toNum(targetActor.system.abilities.primary.Combat.Block.final);
      const dodgeFinal = toNum(targetActor.system.abilities.primary.Combat.Dodge.final);
      const projectionFinal = toNum(
        targetActor.system.abilities.primary.Supernatural.MagicProjection.defensiveFinal
      );

      if (type === "block") defenseValue = blockFinal + modifier + defensePenalty;
      if (type === "dodge") defenseValue = dodgeFinal + modifier + defensePenalty;
      if (type === "projection") defenseValue = projectionFinal + modifier + defensePenalty;
    } else {
      defenseValue = getFinalDefenseValueSpell(targetActor, defense, attackData.isAOE);
    }

    let baseAT =
      directed !== "None"
        ? getEffectiveAT(targetActor, region, attackType)
        : targetActor.system.armor.total[attackType];

    let defATValue = Math.max(0, baseAT - attackData.armorPen);

    // DEFENDER ROLL (token included)
    const defenderRoll = await animaOpenRollCapture({
      value: defenseValue,
      label: capitalizeFirst(type),
      actor: targetActor,
      token: target,
      hideDice: true
    });

    postCombinedCombatCard(
      attackerRoll,
      defenderRoll,
      defATValue,
      attackData.armorPen,
      attackData.directed,
      attackData.attackType
    );
  }
}
