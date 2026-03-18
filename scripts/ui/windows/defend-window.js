import { toNum } from "../../utils/numbers.js";

export class DefendWindow extends Application {
  constructor(resolve, options = {}) {
    super(options);
    this._resolve = resolve;

    this.manual = options.manual ?? false;
    this.attackData = options.attackData ?? null;
    this.block = options.block ?? 0;
    this.dodge = options.dodge ?? 0;
    this.projection = options.projection ?? 0;

    this.modifier = 0;
    this.defenseValue = 0;
    this.manualAT = 0;

    this.hasShield = false;
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
      block: this.block,
      dodge: this.dodge,
      projection: this.projection,
      attack: this.attackData,
      hasShield: this.hasShield
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Update modifier live
    html.find("#defMod").on("change", (ev) => {
      this.modifier = toNum(ev.target.value);
      this.block = this.block += this.modifier;
      this.dodge = this.dodge += this.modifier;
      this.projection = this.projection += this.modifier;
      this.render();
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
          block: this.block,
          dodge: this.dodge,
          projection: this.projection,
          hasShield: this.hasShield
        });
      } else {
        this._resolve({
          type,
          modifier: this.modifier,
          block: this.block,
          dodge: this.dodge,
          projection: this.projection
        });
      }

      this.close();
    });

    // Manual Defend Fields
    html.find("#manualDefense").on("change", (ev) => {
      this.defenseValue = toNum(ev.target.value);
      this.block = toNum(ev.target.value);
      this.dodge = toNum(ev.target.value);
      this.projection = toNum(ev.target.value);
      this.render();
    });

    html.find("#manualAT").on("change", (ev) => {
      this.manualAT = toNum(ev.target.value);
      this.render();
    });

    html.find(".shield-toggle").on("click", async (ev) => {
      this.hasShield = !this.hasShield;
      this.render();
    });
  }
}
