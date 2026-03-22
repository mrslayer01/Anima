import {
  COMBAT_SITUATIONAL_MODIFIERS,
  COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL
} from "../../utils/lookup.js";
import { toNum } from "../../utils/numbers.js";

export class DefendWindow extends Application {
  constructor(resolve, options = {}) {
    super({
      ...options,
      id: `defend-window-${foundry.utils.randomID()}`
    });

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
      hasShield: this.hasShield,
      combatModifiers: Object.entries(COMBAT_SITUATIONAL_MODIFIERS).map(([name, data]) => ({
        name,
        block: data.block,
        dodge: data.dodge
      }))
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const updateTotal = () => {
      const defMod = toNum(html.find("#defMod").val());
      const combatModPart = html.find("#combatModifier").val();
      const combatModDodge = COMBAT_SITUATIONAL_MODIFIERS[combatModPart].dodge ?? 0;
      const combatModBlock = COMBAT_SITUATIONAL_MODIFIERS[combatModPart].block ?? 0;
      const combatModProjection =
        COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL[combatModPart]?.block ?? 0;

      const dodgeTotal = this.dodge + defMod + combatModDodge + this.defenseValue;
      const blockTotal = this.block + defMod + combatModBlock + this.defenseValue;
      const projTotal = this.projection + defMod + combatModProjection + this.defenseValue;
      //const total = this.atkValue + defMod + directedPenalty + combatMod;

      //console.log(this.atkValue);
      html.find("#block").text("Block: " + blockTotal);
      html.find("#dodge").text("Dodge: " + dodgeTotal);
      html.find("#projection").text("Projection: " + projTotal);
    };

    updateTotal(); // initialize

    // Update modifier live
    html.find("#defMod").on("change", updateTotal);
    html.find("#combatModifier").on("change", updateTotal);

    // Handle defense button clicks
    html.find(".def-btn").on("click", async (ev) => {
      const type = ev.currentTarget.dataset.type;
      const combatModPart = html.find("#combatModifier").val();
      const combatModDodge = COMBAT_SITUATIONAL_MODIFIERS[combatModPart].dodge ?? 0;
      const combatModBlock = COMBAT_SITUATIONAL_MODIFIERS[combatModPart].block ?? 0;
      const combatModProjection =
        COMBAT_SITUATIONAL_MODIFIERS_SUPERNATURAL[combatModPart]?.block ?? 0;

      let finalMod = 0;

      if (type === "dodge") {
        finalMod = this.modifier + combatModDodge;
      } else if (type === "block") {
        finalMod = this.modifier + combatModBlock;
      } else if (type === "projection") {
        finalMod = this.modifier + combatModProjection;
      }

      if (this.manual) {
        this._resolve({
          manual: true,
          type,
          defenseValue: this.defenseValue,
          modifier: finalMod,
          manualAT: this.manualAT,
          block: this.block,
          dodge: this.dodge,
          projection: this.projection,
          hasShield: this.hasShield
        });
      } else {
        this._resolve({
          type,
          modifier: finalMod,
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
      updateTotal();
    });

    html.find("#manualAT").on("change", (ev) => {
      this.manualAT = toNum(ev.target.value);
    });

    html.find(".shield-toggle").on("click", async (ev) => {
      this.hasShield = !this.hasShield;
      this.render();
    });
  }
}
