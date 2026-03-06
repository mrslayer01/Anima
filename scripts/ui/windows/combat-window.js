import { DIRECTED_ATTACK_TABLE } from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";

export class CombatWindow extends Application {
  constructor(resolve, options = {}) {
    super(options);
    this._resolve = resolve;
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
    return {
      modifier: 0,
      directedOptions: Object.entries(DIRECTED_ATTACK_TABLE).map(([name, value]) => ({
        name,
        value
      }))
    };
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

    html.find(".confirm-add").click((ev) => {
      ev.preventDefault();

      const atkMod = toNum(html.find("#atkMod").val());
      const directed = html.find("#directedAttack").val();
      const directedPenalty = DIRECTED_ATTACK_TABLE[directed] ?? 0;
      const region = DIRECTED_TO_REGION[directed] ?? null;

      const final = atkMod + directedPenalty;

      this._resolve({
        atkMod,
        directedPenalty,
        directed,
        region,
        final
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
