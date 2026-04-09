import { toNum } from "../../utils/numbers.js";

export class TechniqueEffectWindow extends Application {
  constructor(effectData, item, options = {}) {
    super(options);
    this.effectData = effectData;
    this.item = item;
    this.effectIndex = options.effectIndex;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "technique-effect-window",
      title: "Technique Effect Details",
      classes: ["abf-character-sheet", "technique-effect-window"],
      template: "systems/abf-system/templates/items/apps/technique-effect-window.hbs",
      width: 1500,
      height: 1200,
      resizable: true
    });
  }

  getData() {
    const purchased = this.effectData.purchasedEffects ?? [];

    // Attach original index + detect main effect key/value
    const allLevels = this.effectData.effects.map((lvl, idx) => {
      const mainKey = Object.keys(lvl).find(
        (k) => !["primaryKiCost", "secondaryKiCost", "mkCost", "kiMaint", "level"].includes(k)
      );

      return {
        ...lvl,
        _originalIndex: idx,
        _mainKey: mainKey,
        _mainValue: lvl[mainKey]
      };
    });

    const available = allLevels.filter(
      (lvl) => !purchased.some((p) => p._originalIndex === lvl._originalIndex)
    );

    return {
      effect: this.effectData,
      availableLevels: available,
      purchasedLevels: purchased
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".effect-totalki, .effect-totalmk").on("change", async (ev) => {
      const field = ev.currentTarget.dataset.field;
      const value = toNum(ev.currentTarget.value) || 0;

      // Update local data
      this.effectData[field] = value;

      // Update item data
      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex][field] = value;

      await this.item.update({ "system.effects": effects });

      this.render(true);
    });

    // BUY LEVEL
    html.find(".buy-level").on("click", async (ev) => {
      const idx = toNum(ev.currentTarget.dataset.index);

      const purchased = foundry.utils.duplicate(this.effectData.purchasedEffects || []);
      const lvlData = foundry.utils.duplicate(this.effectData.effects[idx]);

      lvlData._originalIndex = idx;
      lvlData._mainKey = Object.keys(lvlData).find(
        (k) => !["primaryKiCost", "secondaryKiCost", "mkCost", "kiMaint", "level"].includes(k)
      );
      lvlData._mainValue = lvlData[lvlData._mainKey];

      purchased.push(lvlData);

      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex].purchasedEffects = purchased;

      await this.item.update({ "system.effects": effects });

      this.effectData.purchasedEffects = purchased;
      this.render(true);
    });

    // REMOVE LEVEL
    html.find(".remove-level").on("click", async (ev) => {
      const index = toNum(ev.currentTarget.dataset.index);

      const purchased = foundry.utils.duplicate(this.effectData.purchasedEffects || []);
      purchased.splice(index, 1);

      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex].purchasedEffects = purchased;

      await this.item.update({ "system.effects": effects });

      this.effectData.purchasedEffects = purchased;
      this.render(true);
    });

    // BUY ADVANTAGE
    html.find(".buy-advantage-option").on("click", async (ev) => {
      const advIndex = toNum(ev.currentTarget.dataset.advIndex);
      const optIndex = toNum(ev.currentTarget.dataset.optIndex);

      const optional = foundry.utils.duplicate(this.effectData.optionalAdvantages || []);
      const purchased = foundry.utils.duplicate(this.effectData.purchasedAdvantages || []);

      const advantage = optional[advIndex];
      const chosenOption = advantage.options[optIndex];

      // Store full advantage + chosen option
      const purchasedEntry = {
        ...advantage,
        chosenOption
      };

      // Remove from optional
      optional.splice(advIndex, 1);

      purchased.push(purchasedEntry);

      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex].optionalAdvantages = optional;
      effects[this.effectIndex].purchasedAdvantages = purchased;

      await this.item.update({ "system.effects": effects });

      this.effectData.optionalAdvantages = optional;
      this.effectData.purchasedAdvantages = purchased;

      this.render(true);
    });

    // REMOVE ADVANTAGE
    html.find(".remove-advantage").on("click", async (ev) => {
      const idx = toNum(ev.currentTarget.dataset.index);

      const optional = foundry.utils.duplicate(this.effectData.optionalAdvantages || []);
      const purchased = foundry.utils.duplicate(this.effectData.purchasedAdvantages || []);

      const removed = purchased.splice(idx, 1)[0];

      // Restore full original advantage
      const restored = {
        name: removed.name,
        description: removed.description,
        options: removed.options
      };

      optional.push(restored);

      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex].optionalAdvantages = optional;
      effects[this.effectIndex].purchasedAdvantages = purchased;

      await this.item.update({ "system.effects": effects });

      this.effectData.optionalAdvantages = optional;
      this.effectData.purchasedAdvantages = purchased;

      this.render(true);
    });

    // BUY DISADVANTAGE OPTION
    html.find(".buy-disadvantage-option").on("click", async (ev) => {
      const disIndex = toNum(ev.currentTarget.dataset.disIndex);
      const optIndex = toNum(ev.currentTarget.dataset.optIndex);

      const optional = foundry.utils.duplicate(this.effectData.optionalDisadvantages || []);
      const purchased = foundry.utils.duplicate(this.effectData.purchasedDisadvantages || []);

      const disadvantage = optional[disIndex];
      const chosenOption = disadvantage.options[optIndex];

      const purchasedEntry = {
        ...disadvantage,
        chosenOption
      };

      optional.splice(disIndex, 1);
      purchased.push(purchasedEntry);

      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex].optionalDisadvantages = optional;
      effects[this.effectIndex].purchasedDisadvantages = purchased;

      await this.item.update({ "system.effects": effects });

      this.effectData.optionalDisadvantages = optional;
      this.effectData.purchasedDisadvantages = purchased;

      this.render(true);
    });

    // REMOVE DISADVANTAGE
    html.find(".remove-disadvantage").on("click", async (ev) => {
      const idx = toNum(ev.currentTarget.dataset.index);

      const optional = foundry.utils.duplicate(this.effectData.optionalDisadvantages || []);
      const purchased = foundry.utils.duplicate(this.effectData.purchasedDisadvantages || []);

      const removed = purchased.splice(idx, 1)[0];

      const restored = {
        name: removed.name,
        description: removed.description,
        options: removed.options
      };

      optional.push(restored);

      const effects = foundry.utils.duplicate(this.item.system.effects);
      effects[this.effectIndex].optionalDisadvantages = optional;
      effects[this.effectIndex].purchasedDisadvantages = purchased;

      await this.item.update({ "system.effects": effects });

      this.effectData.optionalDisadvantages = optional;
      this.effectData.purchasedDisadvantages = purchased;

      this.render(true);
    });
  }
}
