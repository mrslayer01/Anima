import { computeCounterattack, computeDamagePercent, difficultyMap } from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";
import { animaOpenRoll, characteristicCheck, resistanceCheck } from "../../utils/rolls.js";

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
  html.find(".init-roll").on("click", (ev) => {
    const initValue = toNum(ev.currentTarget.dataset.ability);

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

            const final = toNum(initValue + modifier);

            animaOpenRoll({
              value: final,
              label: `Initiative Open Roll`,
              actor: sheet.actor,
              undeveloped: false,
              mastery: false
            });
          }
        }
      },
      default: "roll"
    }).render(true);
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
                            ${value === "80" ? "selected" : ""}
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
    let attackValue = toNum(toNum(sheet.actor.system.abilities.primary.Combat.Attack.final));
    const attackType = ev.currentTarget.dataset.type;

    attackValue += await promptAttackModifier();

    let atValue = 0;

    const targets = Array.from(game.user.targets);
    const target = targets[0] ?? null;

    // ---------------------------------------------------------
    // CASE 1: NO TARGET → MANUAL DEFENSE ENTRY
    // ---------------------------------------------------------
    if (!target) {
      return new Dialog({
        title: "Manual Defense Entry",
        content: `
        <div style="margin-bottom: 1em;">
          <label><b>Enter Defender's defence modifier:</b></label>
          <input type="number" id="defense" value="0" style="width: 100%;" />
        </div>
        <div style="margin-bottom: 1em;">
          <label><b>Attack Modifier:</b></label>
          <input type="number" id="mod" value="0" style="width: 100%;" />
          <label><b>AT Value:</b></label>
          <input type="number" id="at" value="0" style="width: 100%;" />
        </div>
      `,
        buttons: {
          roll: {
            label: "Roll",
            callback: async (html) => {
              const defenseFinal = toNum(html.find("#defense").val());
              const modifier = toNum(html.find("#mod").val());
              atValue = toNum(html.find("#at").val());
              const finalAttack = attackValue + modifier;

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

              setTimeout(() => postCombinedCombatCard(attacker, defender, atValue), 2500);
            }
          }
        }
      }).render(true);
    }

    // ---------------------------------------------------------
    // CASE 2: TARGET SELECTED → BLOCK OR DODGE
    // ---------------------------------------------------------
    const targetActor = target.actor;
    const { type, modifier } = await promptDefenseChoice(targetActor);

    let defenseValue = 0;

    if (type === "block") {
      defenseValue = toNum(targetActor.system.abilities.primary.Combat.Block.final);
    } else {
      defenseValue = toNum(targetActor.system.abilities.primary.Combat.Dodge.final);
    }

    defenseValue += modifier;

    atValue = targetActor.system.armor.total[attackType];

    const defender = await animaOpenRollCapture({
      value: defenseValue,
      label: type === "block" ? "Block" : "Dodge",
      actor: targetActor
    });

    const attacker = await animaOpenRollCapture({
      value: attackValue,
      label: "Attack",
      actor: sheet.actor
    });

    setTimeout(() => postCombinedCombatCard(attacker, defender, atValue), 2500);
  });

  html.find(".damage-roll").off("click");
  html.find(".damage-roll").on("click", async (ev) => {
    const baseDamage = toNum(ev.currentTarget.dataset.damage) || 0;

    const { dmg, pct } = await promptDamageCalculation(baseDamage);

    postDamageCard({ dmg, pct });
  });
}

async function animaOpenRollCapture(opts) {
  return await animaOpenRoll({ ...opts, capture: true });
}

async function promptAttackModifier() {
  return new Promise((resolve) => {
    new Dialog({
      title: "Attack Modifier",
      content: `
        <div style="margin-bottom: 1em;">
          <label><b>Attack Modifier:</b></label>
          <input type="number" id="atkMod" value="0" style="width: 100%;" />
        </div>
      `,
      buttons: {
        ok: {
          label: "Apply",
          callback: (html) => {
            const mod = Number(html.find("#atkMod").val()) || 0;
            resolve(mod);
          }
        }
      },
      default: "ok"
    }).render(true);
  });
}

async function promptDefenseChoice(targetActor) {
  return new Promise((resolve) => {
    new Dialog({
      title: `Defense Roll for ${targetActor.name}`,
      content: `
        <div style="margin-bottom: 1em;">
          <p><b>Select a defense method:</b></p>
        </div>

        <div style="margin-bottom: 1em;">
          <label><b>Situational Modifier:</b></label>
          <input type="number" id="defMod" value="0" style="width: 100%;" />
        </div>
      `,
      buttons: {
        block: {
          label: "Block",
          callback: (html) => {
            const mod = Number(html.find("#defMod").val()) || 0;
            resolve({ type: "block", modifier: mod });
          }
        },
        dodge: {
          label: "Dodge",
          callback: (html) => {
            const mod = Number(html.find("#defMod").val()) || 0;
            resolve({ type: "dodge", modifier: mod });
          }
        }
      },
      default: "block"
    }).render(true);
  });
}

function postCombinedCombatCard(attacker, defender, defenderAT) {
  const margin = attacker.final - defender.final;

  const counterBonus = computeCounterattack(margin);

  // If counterattack triggers
  if (counterBonus > 0 || margin < 0) {
    return postCounterattackCard(attacker, defender, counterBonus);
  }

  // Otherwise normal damage %
  const { pct } = computeDamagePercent(margin, defenderAT);

  const content = `
    <h3>Combat Exchange</h3>

    <h4>Attacker: ${attacker.actor.name}</h4>
    <b>Bonus:</b> ${attacker.bonus}<br>
    <b>Breakdown:</b><br>${attacker.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${attacker.final}<br>
    <hr>
    <h4>Defender: ${defender.actor.name}</h4>
    <b>AT:</b> ${defenderAT}<br>
    <b>Bonus:</b> ${defender.bonus}<br>
    <b>Breakdown:</b><br>${defender.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${defender.final}<br>
    <hr>
    <h4>Result</h4>
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
            const dmg = Number(html.find("#baseDmg").val()) || 0;
            const pct = Number(html.find("#dmgPct").val()) || 0;
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
  const content = `
    <h4 style="color:#b30000;">Counterattack!</h4>

    <h4>Attacker: ${attacker.actor.name}</h4>
    <b>Bonus:</b> ${attacker.bonus}<br>
    <b>Breakdown:</b><br>${attacker.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${attacker.final}<br>

    <hr>

    <h4>Defender: ${defender.actor.name}</h4>
    <b>Bonus:</b> ${defender.bonus}<br>
    <b>Breakdown:</b><br>${defender.rawRolls.join("<br>")}
    <br>
    <b>Final:</b> ${defender.final}<br>
    
    <hr>

    <h4>Result</h4>
    <b>Margin:</b> ${margin}<br>
    <b>${defender.actor.name}</b> counters.<br>
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
