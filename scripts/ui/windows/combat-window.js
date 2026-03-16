import { DIRECTED_ATTACK_TABLE } from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";

export class CombatWindow extends Application {
  constructor(resolve, options = {}) {
    super(options);
    this._resolve = resolve;
    this.isSpellAttack = options.isSpellAttack ?? false;
    this.weapon = options.weapon ?? null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "combat-window",
      title: "Combat",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/combat-window.hbs",
      width: 300,
      height: "auto",
      resizable: false
    });
  }

  getData() {
    if (!this.isSpellAttack) {
      const weaponAttackTypes = [this.weapon.primaryAtkType, this.weapon.secondaryAtkType];
      return {
        modifier: 0,
        atkMod: this.atkMod ?? 0,
        zeonCost: this.zeonCost ?? 0,
        directedOptions: Object.entries(DIRECTED_ATTACK_TABLE).map(([name, value]) => ({
          name,
          value
        })),
        isSpellAttack: this.isSpellAttack,
        attackTypes: weaponAttackTypes,
        isAOE: this.isAOE
      };
    } else {
      return {
        modifier: 0,
        atkMod: this.atkMod ?? 0,
        zeonCost: this.zeonCost ?? 0,
        directedOptions: Object.entries(DIRECTED_ATTACK_TABLE).map(([name, value]) => ({
          name,
          value
        })),
        isSpellAttack: this.isSpellAttack,
        attackTypes: SPELL_ATTACK_TYPES
      };
    }
  }

  activateListeners(html) {
    super.activateListeners(html);

    const updateTotal = () => {
      const atkMod = toNum(html.find("#atkMod").val());
      const part = html.find("#directedAttack").val();
      const directedPenalty = DIRECTED_ATTACK_TABLE[part] ?? 0;
      const total = atkMod + directedPenalty;

      html.find("#totalMod").text(total);
    };

    html.find("#atkMod").on("input", updateTotal);
    html.find("#directedAttack").on("change", updateTotal);

    updateTotal(); // initialize

    html.find(".is-aoe-toggle").on("click", async (ev) => {
      const actor = sheet.actor;
      const itemId = ev.currentTarget.dataset.itemId;
      const item = sheet.actor.items.get(itemId);

      const current = item.system.equipped ?? false;

      // Unequip any other weapon aside from a shield.
      const otherEquipped = actor.items.find(
        (i) =>
          i.type === "weapon" &&
          i.id !== itemId &&
          i.system.equipped &&
          i.system.weaponType !== "shield"
      );

      if (otherEquipped) {
        await otherEquipped.update({ "system.equipped": false });
      }

      await item.update({
        "system.equipped": !current
      });

      await WeaponEquipped(actor, item);

      sheet.render(false);
    });

    html.find(".confirm-add").click((ev) => {
      ev.preventDefault();

      const atkMod = toNum(html.find("#atkMod").val());
      const directed = html.find("#directedAttack").val();
      const directedPenalty = DIRECTED_ATTACK_TABLE[directed] ?? 0;
      const region = DIRECTED_TO_REGION[directed] ?? null;
      const zeonCost = toNum(html.find("#zeonCost").val());

      const attackType = html.find("#attackType").val();
      const isAOE = console.log(attackType);

      const final = atkMod + directedPenalty;

      this._resolve({
        atkMod,
        directedPenalty,
        directed,
        region,
        attackType,
        final,
        zeonCost,
        isAOE
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

const SPELL_ATTACK_TYPES = ["ene", "hea", "col", "imp"];
