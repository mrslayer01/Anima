import { toNum } from "./numbers.js";

// ============================================================
//  ABF Roll Engine
// ============================================================

/**
 * Roll a die expression and show Dice So Nice if available.
 */
export async function rollDice(formula) {
  const roll = new Roll(formula);
  await roll.evaluate();
  game.dice3d?.showForRoll(roll);
  return roll;
}

/**
 * Send a chat message with optional GM whisper.
 */
export function sendChat(content, actor) {
  const messageData = {
    content,
    speaker: ChatMessage.getSpeaker({ actor })
  };

  ChatMessage.create(messageData);
}

// ============================================================
//  CHARACTERISTIC CHECK
// ============================================================

export async function characteristicCheck({ value, label, actor }) {
  const target = toNum(value) || 0;
  const name = label ?? "Characteristic Check";

  const roll = await rollDice("1d10");
  const result = roll.total;

  let effectiveRoll = result; // start with the raw roll
  let ruleText = "";

  if (result === 1) {
    effectiveRoll -= 3; // roll becomes better
    ruleText = " (-3 Rule of 1)";
  } else if (result === 10) {
    effectiveRoll += 3; // roll becomes worse
    ruleText = " (+3 Rule of 10)";
  }

  const success = effectiveRoll <= target;
  const margin = Math.abs(effectiveRoll - target);

  const content = `
    <b>${name}</b><br>
    <hr>
    <b>Your Roll:</b> ${result}${ruleText}<br>
    <b>Target:</b> ${target}<br>
    <hr>
    ${
      success
        ? `<span style="color:green"><b>Success</b></span> (Margin: ${margin})`
        : `<span style="color:red"><b>Failure</b></span> (Margin: ${margin})`
    }
  `;

  setTimeout(() => sendChat(content, actor), 2000);
}

// ============================================================
//  FUMBLE ROLL
// ============================================================

export async function fumbleRoll({ fumbleValue, label, mastery, actor, capture = false }) {
  const f = toNum(fumbleValue);
  const name = label ?? "Fumble";
  const isMastery = mastery === true;

  let fumbleMod = 0;

  if (!isMastery) {
    if (f === 1) fumbleMod = 15;
    if (f === 3) fumbleMod = -15;
  } else {
    if (f === 1) fumbleMod = 0;
    if (f === 2) fumbleMod = -15;
  }

  const roll = await rollDice("1d100");
  const raw = roll.total;
  const finalFumble = raw + fumbleMod;

  const content = `
    <b>${name} — Fumble!</b><br>
    <hr>
    <b>Initial Roll:</b> ${f}<br>
    <b>Fumble Level Roll:</b> ${raw} (${fumbleMod >= 0 ? "+" : ""}${fumbleMod})<br>
    <b>Final Fumble Level:</b> <span style="color:red"><b>${finalFumble}</b></span>
  `;

  if (!capture) {
    setTimeout(() => sendChat(content, actor), 2000);
  }

  return {
    fumble: true,
    fumbleValue: f,
    fumbleRoll: raw,
    fumbleMod,
    finalFumble,
    label: name,
    actor
  };
}

// ============================================================
//  OPEN ROLL (ANIMA STYLE)
// ============================================================

export async function animaOpenRoll({
  value,
  label,
  mastery,
  undeveloped,
  actor,
  capture = false,
  hideDice = false,
  timeout = 2000
}) {
  const actionPenalty = toNum(actor.system.globalModifiers.Action.final);
  const hasBadLuck = actor.system.advantages.some((adv) => adv.name === "Bad Luck");
  const hasGoodLuck = actor.system.advantages.some((adv) => adv.name === "Good Luck");
  const bonus = toNum(value) + actionPenalty || 0 + actionPenalty;
  const name = label ?? "Open Roll";
  const isMastery = mastery === true;
  const isUndeveloped = undeveloped === true;

  let threshold = 90;
  let rawRolls = [];
  let total = 0;
  let keepRolling = true;

  let fumbleRange = isMastery ? [1, 2] : [1, 2, 3];
  let fumbleNegative = 0;

  if (hasBadLuck) fumbleRange = isMastery ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
  if (hasGoodLuck) fumbleRange = isMastery ? [1] : [1, 2];

  while (keepRolling) {
    const roll = new Roll("1d100");
    await roll.evaluate();

    // GLOBAL dice animation without chat card
    if (!hideDice) {
      if (game.dice3d) game.dice3d.showForRoll(roll, game.user, true);
    }

    const raw = roll.total;

    if (fumbleRange.includes(raw)) {
      const fumble = fumbleRoll({
        fumbleValue: raw,
        label: name,
        mastery: isMastery,
        actor
      });

      rawRolls.push(raw);
      total = raw + toNum(fumble.fumbleValue);
      keepRolling = false;
      continue;
    }

    rawRolls.push(raw);
    total += raw;

    if (raw >= threshold) {
      threshold++;
    } else {
      keepRolling = false;
    }
  }

  const breakdown = rawRolls.map((r) => `${r}`).join("<br>");
  const final = isUndeveloped ? total + bonus - 30 : total + bonus;

  const content = `
    <b>${name}${isUndeveloped ? " — Undeveloped" : ""}</b><br>
    <hr>
    <b>Roll Breakdown:</b><br>
    ${breakdown}<br>
    <b>Roll Total:</b> ${total}<br>
    <b>Roll Bonus:</b> ${bonus}<br>
    ${isUndeveloped ? "<b>Undeveloped Penalty:</b> -30<br>" : ""}
    <hr>
    <b>Final Total:</b> ${final}
  `;

  const resultData = {
    total,
    bonus,
    final,
    rawRolls,
    breakdown,
    label: name,
    actor
  };

  if (capture) {
    return resultData;
  }

  setTimeout(() => sendChat(content, actor), timeout);
  return resultData;
}

// ============================================================
//  BASIC RESISTANCE CHECK
// ============================================================

export async function resistanceCheck({ value, difficulty, label, actor }) {
  const bonus = toNum(value) || 0;
  const diff = toNum(difficulty);
  const name = label ?? "Resistance Check";

  const roll = await rollDice("1d100");
  const raw = roll.total;

  const total = raw + bonus;
  let success = total >= diff;

  const content = `
    <b>${name}</b><br>
    <hr>
    <b>Roll:</b> ${raw}<br>
    <b>Bonus:</b> ${bonus}<br>
    <b>Total:</b> ${total}<br>
    ${difficulty > 0 ? `<b>Difficulty:</b> ${diff}<br>` : ""}
    <hr>
    ${
      difficulty > 0
        ? `${
            success
              ? `<span style="color:green"><b>Success</b></span>`
              : `<span style="color:red"><b>Failure</b></span>`
          }`
        : ""
    }
  `;

  setTimeout(() => sendChat(content, actor), 2000);
}

export async function castCheck({ value, difficulty, label, actor, capture = false }) {
  const bonus = toNum(value) || 0;
  const diff = toNum(difficulty);
  const name = label ?? "Projection Check";

  const roll = await rollDice("1d100");
  const raw = roll.total;

  const total = raw + bonus;
  const margin = total - diff;
  let success = total >= diff;

  const content = `
    <b>${name}</b><br>
    <hr>
    <b>Roll:</b> ${raw}<br>
    <b>Bonus:</b> ${bonus}<br>
    <b>Total:</b> ${total}<br>
    ${difficulty > 0 ? `<b>Difficulty:</b> ${diff}<br>` : ""}
    <hr>
    ${
      difficulty > 0
        ? `${
            success
              ? `<span style="color:green"><b>Success</b></span>`
              : `<span style="color:red"><b>Failure - Margin ${margin}</b></span>`
          }`
        : ""
    }
  `;

  if (capture) {
    setTimeout(() => sendChat(content, actor), 2000);
    return success;
  }

  setTimeout(() => sendChat(content, actor), 2000);
}

//#region Psychic

export async function castPsychicPower(actor, index) {
  const powers = actor.system.psychic.mentalPowers;
  const power = powers[index];
  if (!power) return false;

  // 0. Ask user for custom modifier + PP spend
  const { mod, spentPP, roll } = await promptPsychicModifierAndPP(actor);

  if (!roll) return false;

  // PP bonus = 20 per PP spent
  const ppBonus = spentPP * 20;

  // 1. Roll Psychic Potential
  const rollTotal = await psychicPotentialRoll(actor);

  // Apply modifiers
  const finalPotential = rollTotal.total + mod + ppBonus;

  // 2. Determine effect tier
  const effect = getTriggeredEffect(power, finalPotential);

  if (!effect) {
    sendChat(`<b>${power.name}</b>: No effect triggered.`, actor);
    return false;
  }

  // 3. Deduct PP spent
  if (spentPP > 0) {
    await actor.update({
      "system.abilities.primary.Psychic.PsychicPoints.temp":
        actor.system.abilities.primary.Psychic.PsychicPoints.temp + spentPP
    });
  }

  // 4. Send result to chat
  sendPowerEffectToChat(actor, power, effect, rollTotal, mod, spentPP, ppBonus, finalPotential);

  return true;
}

async function psychicPotentialRoll(actor, { capture = true, hideDice = false } = {}) {
  const potential = actor.system.abilities.primary.Psychic.PsychicPotential;
  const bonus = toNum(potential.final) || 0;

  // Use your existing open roll system
  const result = await animaOpenRoll({
    value: bonus,
    label: "Psychic Potential",
    mastery: false,
    undeveloped: false,
    actor,
    capture,
    hideDice,
    timeout: 2000
  });

  return {
    total: result.final,
    bonus: result.bonus,
    rawTotal: result.total,
    rolls: result.rawRolls
  };
}

function getTriggeredEffect(power, rollTotal) {
  if (!power.effects || !power.effects.length) return null;

  // Sort by difficulty ascending
  const sorted = [...power.effects].sort((a, b) => a.difficulty - b.difficulty);

  // Find highest difficulty <= rollTotal
  let triggered = null;
  for (const e of sorted) {
    if (rollTotal >= e.difficulty) triggered = e;
  }

  return triggered;
}

function sendPowerEffectToChat(
  actor,
  power,
  effect,
  rollTotal,
  mod,
  spentPP,
  ppBonus,
  finalPotential
) {
  const breakdown = rollTotal.rolls.join("<br>");

  const content = `
    <b>${power.name}</b> — <i>${power.discipline}</i><br>
    <hr>

    <b>Psychic Potential Roll</b><br>
    <b>Breakdown:</b><br>${breakdown}<br>
    <b>Raw Total:</b> ${rollTotal.rawTotal}<br>
    <b>Base Potential Bonus:</b> ${rollTotal.bonus}<br>
    <b>Custom Modifier:</b> ${mod}<br>
    <b>PP Spent:</b> ${spentPP} ( +${ppBonus} )<br>
    <b>Final Total:</b> ${finalPotential}<br>

    <hr>
    <b>Triggered Effect:</b><br>
    <span>${effect.effect}</span><br>
    <b>Difficulty:</b> ${effect.difficulty}
  `;

  setTimeout(() => sendChat(content, actor), 2000);
}

export function promptPsychicModifierAndPP(actor) {
  const freePP =
    toNum(actor.system.psychic.pp.remaining) -
    toNum(actor.system.abilities.primary.Psychic.PsychicPoints.temp);
  const maxSpend = Math.min(5, freePP);

  return new Promise((resolve) => {
    const dlg = new Dialog({
      title: "Psychic Potential Roll",
      content: `
        <div style="margin-bottom: 0.75em;">
          <label><b>Custom Modifier:</b></label>
          <input type="number" id="psychicModifierInput" data-edit="false" data-dtype="none"
                 value="0" style="width: 100%; margin-top: 0.25em;" />
        </div>

        <div style="margin-bottom: 0.75em;">
          <label><b>Spend Free PP (max ${maxSpend}):</b></label>
          <select id="psychicPPSpend" data-edit="false" data-dtype="none"
                  style="width: 100%; margin-top: 0.25em;">
            ${[...Array(maxSpend + 1).keys()]
              .map((i) => `<option value="${i}">${i} PP (+${i * 20})</option>`)
              .join("")}
          </select>
        </div>
      `,
      buttons: {
        ok: {
          label: "Confirm",
          callback: (html) => {
            const mod = Number(html.find("#psychicModifierInput").val()) || 0;
            const spentPP = Number(html.find("#psychicPPSpend").val()) || 0;
            resolve({ mod, spentPP, roll: true });
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => resolve({ mod: 0, spentPP: 0, roll: false })
        }
      },
      default: "ok",
      render: (html) => {
        html.find("#psychicPPSpend").on("change", (ev) => ev.stopPropagation());
        html.find("#psychicModifierInput").on("change", (ev) => ev.stopPropagation());
      }
    });

    dlg.render(true);

    setTimeout(() => {
      const input = document.getElementById("psychicModifierInput");
      if (input) {
        input.focus();
        input.select();
      }
    }, 10);
  });
}

//#endregion
