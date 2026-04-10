import {
  COMBAT_SITUATIONAL_MODIFIERS,
  COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL,
  DIRECTED_ATTACK_TABLE
} from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";

export class CombatWindow extends Application {
  constructor(resolve, options = {}) {
    super(options);
    this._resolve = resolve;
    this.isSpellAttack = options.isSpellAttack ?? false;
    this.isPsychicAttack = options.isPsychicAttack ?? false;
    this.weapon = options.weapon ?? null;
    this.isAOE = options.isAOE ?? false;
    this.atkValue = options.attackValue ?? 0;
    this.actor = options.actor;
    this.ppSpent = 0;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `combat-window-${foundry.utils.randomID()}`,
      title: "Combat",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/combat-window.hbs",
      width: 300,
      height: "auto",
      resizable: false
    });
  }

  getData() {
    if (!this.isSpellAttack && !this.isPsychicAttack) {
      const weaponAttackTypes = [this.weapon.primaryAtkType, this.weapon.secondaryAtkType];
      return {
        modifier: 0,
        atkMod: this.atkMod ?? 0,
        zeonCost: this.zeonCost ?? 0,
        directedOptions: Object.entries(DIRECTED_ATTACK_TABLE).map(([name, value]) => ({
          name,
          value
        })),
        combatModifiers: Object.entries(COMBAT_SITUATIONAL_MODIFIERS).map(([name, data]) => ({
          name,
          attack: data.attack
        })),
        isSpellAttack: this.isSpellAttack,
        attackTypes: weaponAttackTypes,
        atkValue: this.atkValue
      };
    } else if (this.isSpellAttack) {
      return {
        modifier: 0,
        atkMod: this.atkMod ?? 0,
        zeonCost: this.zeonCost ?? 0,
        directedOptions: Object.entries(DIRECTED_ATTACK_TABLE).map(([name, value]) => ({
          name,
          value
        })),
        combatModifiers: Object.entries(COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL).map(
          ([name, data]) => ({
            name,
            attack: data.attack
          })
        ),
        isSpellAttack: this.isSpellAttack,
        attackTypes: SPELL_ATTACK_TYPES,
        isAOE: this.isAOE,
        atkValue: this.atkValue
      };
    } else {
      const freePP = this.actor.system.psychic.pp.remaining ?? 0;
      const maxSpend = Math.min(5, freePP);

      return {
        modifier: 0,
        atkMod: this.atkMod ?? 0,
        directedOptions: Object.entries(DIRECTED_ATTACK_TABLE).map(([name, value]) => ({
          name,
          value
        })),
        combatModifiers: Object.entries(COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL).map(
          ([name, data]) => ({
            name,
            attack: data.attack
          })
        ),
        isPsychicAttack: this.isPsychicAttack,
        attackTypes: SPELL_ATTACK_TYPES,
        isAOE: this.isAOE,
        atkValue: this.atkValue,
        ppProjectionOptions: [...Array(maxSpend + 1).keys()], // 0..maxSpend
        ppSpent: this.ppSpen
      };
    }
  }

  activateListeners(html) {
    super.activateListeners(html);

    const updateTotal = () => {
      const atkMod = toNum(html.find("#atkMod").val());
      const part = html.find("#directedAttack").val();
      const combatModPart = html.find("#combatModifier").val();
      const directedPenalty = DIRECTED_ATTACK_TABLE[part] ?? 0;

      const combatMod = COMBAT_SITUATIONAL_MODIFIERS[combatModPart].attack ?? 0;
      const total = this.atkValue + atkMod + directedPenalty + combatMod;

      html.find("#totalMod").text(total);
    };

    html.find("#atkMod").on("change", updateTotal);
    html.find("#directedAttack").on("change", updateTotal);
    html.find("#combatModifier").on("change", updateTotal);

    html.find("#ppProjectionSpend").on("change", (ev) => {
      this.ppSpent = toNum(ev.currentTarget.value) || 0;
    });

    updateTotal(); // initialize

    html.find(".aoe-toggle").on("click", async (ev) => {
      this.isAOE = !this.isAOE; // toggle the value
      this.render(); // re-render to update the icon
    });

    html.find(".confirm-add").click((ev) => {
      ev.preventDefault();

      const atkMod = toNum(html.find("#atkMod").val());
      const directed = html.find("#directedAttack").val();
      const combatModPart = html.find("#combatModifier").val();
      const directedPenalty = DIRECTED_ATTACK_TABLE[directed] ?? 0;
      const combatMod = COMBAT_SITUATIONAL_MODIFIERS[combatModPart].attack ?? 0;
      const region = DIRECTED_TO_REGION[directed] ?? null;
      const zeonCost = toNum(html.find("#zeonCost").val());
      const attackType = html.find("#attackType").val();

      let ppSpent = 0;
      let ppBonus = 0;

      if (this.isPsychicAttack) {
        ppSpent = this.ppSpent || 0;
        ppBonus = ppSpent * 10;
      }

      const final = atkMod + directedPenalty + combatMod + ppBonus;

      this._resolve({
        atkMod,
        directedPenalty,
        directed,
        region,
        attackType,
        final,
        zeonCost,
        isAOE: this.isAOE,
        ppSpent,
        ppBonus
      });

      this.close();
    });
  }
}

const DIRECTED_TO_REGION = {
  Eye: "Head",
  Head: "Head",
  Neck: "Head",

  Shoulder: "Arms",
  Arm: "Arms",
  Elbow: "Arms",
  Wrist: "Arms",
  Hand: "Arms",

  Heart: "Torso",
  Abdomen: "Torso",
  Torso: "Torso",

  Groin: "Legs",
  Thigh: "Legs",
  Knee: "Legs",
  Calf: "Legs",
  Foot: "Legs"
};

const SPELL_ATTACK_TYPES = ["ene", "hea", "col", "ele", "imp"];

export function getSituationalModifier(situationKey, stat) {
  const entry = COMBAT_SITUATIONAL_MODIFIERS[situationKey];
  if (!entry) return 0;

  const value = entry[stat];
  return typeof value === "number" ? value : 0;
}
