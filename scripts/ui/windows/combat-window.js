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
      const part = html.find("#directedAttack").val();
      const directedPenalty = DIRECTED_ATTACK_TABLE[part] ?? 0;

      const final = atkMod + directedPenalty;

      this._resolve({
        atkMod,
        directedPenalty,
        part,
        final
      });

      this.close();
    });
  }
}

const DIRECTED_ATTACK_TABLE = {
  None: 0,
  Eye: -100,
  Neck: -80,
  Head: -60,
  Elbow: -60,
  Heart: -60,
  Groin: -60,
  Foot: -50,
  Hand: -40,
  Wrist: -40,
  Knee: -40,
  Shoulder: -30,
  Abdomen: -20,
  Arm: -20,
  Thigh: -20,
  Torso: -10,
  Calf: -10
};
