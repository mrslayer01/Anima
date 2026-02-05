import { toNum } from "../actor/lookup.js";

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
    speaker: ChatMessage.getSpeaker({ actor }),
    ...(game.user.isGM && { whisper: ChatMessage.getWhisperRecipients("GM") })
  };

  ChatMessage.create(messageData);
}

// ============================================================
//  CHARACTERISTIC CHECK
// ============================================================

export async function characteristicCheck({ value, label, actor }) {
  const target = Number(value) || 0;
  const name = label ?? "Characteristic Check";

  const roll = await rollDice("1d10");
  const result = roll.total;

  let effectiveRoll = result;   // start with the raw roll
  let ruleText = "";

  if (result === 1) {
    effectiveRoll -= 3;         // roll becomes better
    ruleText = " (-3 Rule of 1)";
  } else if (result === 10) {
    effectiveRoll += 3;         // roll becomes worse
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
    ${success
      ? `<span style="color:green"><b>Success</b></span> (Margin: ${margin})`
      : `<span style="color:red"><b>Failure</b></span> (Margin: ${margin})`
    }
  `;

  setTimeout(() => sendChat(content, actor), 2300);
}

// ============================================================
//  FUMBLE ROLL
// ============================================================

export async function fumbleRoll({ fumbleValue, label, mastery, actor }) {
  const f = Number(fumbleValue);
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

  setTimeout(() => sendChat(content, actor), 2300);
}

// ============================================================
//  OPEN ROLL (ANIMA STYLE)
// ============================================================

export async function animaOpenRoll({ value, label, mastery, undeveloped, actor }) {
  const bonus = Number(value) || 0;
  const fatiguePenalty = Number(actor.system.fatigue.actionPenalty) || 0;
  const name = label ?? "Open Roll";
  const isMastery = mastery === true;
  const isUndeveloped = undeveloped === true;

  let threshold = 90;
  let rawRolls = [];
  let total = 0;
  let keepRolling = true;

  const fumbleRange = isMastery ? [1, 2] : [1, 2, 3];

  while (keepRolling) {
    const roll = await rollDice("1d100");
    const raw = roll.total;

    if (fumbleRange.includes(raw)) {
      return fumbleRoll({
        fumbleValue: raw,
        label: name,
        mastery: isMastery,
        actor
      });
    }

    rawRolls.push(raw);
    total += raw;

    if (raw >= threshold) {
      threshold++;
    } else {
      keepRolling = false;
    }
  }

  const breakdown = rawRolls.map(r => `${r}`).join("<br>");
  const final = isUndeveloped ? total + bonus - 30 + fatiguePenalty : total + bonus + fatiguePenalty;

  const content = `
    <b>${name}${isUndeveloped ? " — Undeveloped" : ""}</b><br>
    <hr>
    <b>Roll Breakdown:</b><br>
    ${breakdown}<br>
    <b>Roll Total:</b> ${total}<br>
    <b>Roll Bonus:</b> ${bonus}<br>
    ${fatiguePenalty < 0 ? `<b>Fatigue Penalty:</b> ${fatiguePenalty}<br>` : ""}
    ${isUndeveloped ? "<b>Undeveloped Penalty:</b> -30<br>" : ""}
    <hr>
    <b>Final Total:</b> ${final}
  `;

  setTimeout(() => sendChat(content, actor), 2300 * rawRolls.length);
}

// ============================================================
//  BASIC RESISTANCE CHECK
// ============================================================

export async function resistanceCheck({ value, difficulty, label, actor }) {
  const bonus = Number(value) || 0;
  const fatiguePenalty = Number(actor.system.fatigue.actionPenalty) || 0;
  const diff = Number(difficulty) || 80;
  const name = label ?? "Resistance Check";

  const roll = await rollDice("1d100");
  const raw = roll.total;

  const total = raw + bonus + fatiguePenalty;
  const success = total >= diff;

  const content = `
    <b>${name}</b><br>
    <hr>
    <b>Roll:</b> ${raw}<br>
    <b>Bonus:</b> ${bonus}<br>
    ${fatiguePenalty < 0 ? `<b>Fatigue Penalty:</b> ${fatiguePenalty}<br>` : ""}
    <b>Total:</b> ${total}<br>
    <b>Difficulty:</b> ${diff}<br>
    <hr>
    ${success
      ? `<span style="color:green"><b>Success</b></span>`
      : `<span style="color:red"><b>Failure</b></span>`
    }
  `;

  setTimeout(() => sendChat(content, actor), 2300);
}