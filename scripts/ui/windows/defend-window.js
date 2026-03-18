import { toNum } from "../../utils/numbers.js";

export class DefendWindow extends Application {
  constructor(resolve, options = {}) {
    super(options);
    this._resolve = resolve;

    this.manual = options.manual ?? false;
    this.attackData = options.attackData ?? null;

    this.modifier = 0;
    this.defenseValue = 0;
    this.manualAT = 0;

    this.hasShield = false;

    console.log(this.attackData);
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "defend-window",
      title: "Defense Roll",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/defend-window.hbs",
      width: 300,
      height: "auto",
      resizable: false
    });
  }

  getData() {
    return {
      modifier: this.modifier,
      manual: this.manual,
      defenseValue: this.defenseValue,
      manualAT: this.manualAT,
      attack: this.attackData,
      hasShield: this.hasShield
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Update modifier live
    html.find("#defMod").on("input", (ev) => {
      this.modifier = toNum(ev.target.value);
    });

    // Handle defense button clicks
    html.find(".def-btn").on("click", async (ev) => {
      const type = ev.currentTarget.dataset.type;

      if (this.manual) {
        this._resolve({
          manual: true,
          type,
          defenseValue: this.defenseValue,
          modifier: this.modifier,
          manualAT: this.manualAT,
          hasShield: this.hasShield
        });
      } else {
        this._resolve({
          type,
          modifier: this.modifier
        });
      }

      this.close();
    });

    // Manual Defend Fields
    if (this.manual) {
      html.find("#manualDefense").on("input", (ev) => {
        this.defenseValue = toNum(ev.target.value);
      });

      html.find("#manualMod").on("input", (ev) => {
        this.modifier = toNum(ev.target.value);
      });

      html.find("#manualAT").on("input", (ev) => {
        this.manualAT = toNum(ev.target.value);
      });

      html.find(".shield-toggle").on("click", async (ev) => {
        this.hasShield = !this.hasShield;
        this.render();
      });
    }
  }
}
