import { ABF_MENTAL_POWERS, ABF_PSYCHIC_DISCIPLINES } from "../../config/psychic-diciplines.js";

export class MentalPowerPurchaseWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
    this.disciplineKey = options.disciplineKey;
    this.activeTab = "available-tab";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "mental-power-purchase-window",
      title: "Mental Powers",
      classes: ["abf-character-sheet", "mental-power-window"],
      template: "systems/abf-system/templates/actors/apps/mental-power-window.hbs",
      width: 1200,
      height: 900,
      resizable: true
    });
  }

  getData() {
    const actor = game.actors.get(this.actorId);
    const discipline = actor.system.psychic.disciplines[this.disciplineKey];

    const owned = discipline?.mentalPowers || [];

    const available = Object.entries(ABF_MENTAL_POWERS)
      .map(([key, data]) => ({ key, ...data }))
      .filter((p) => p.discipline === discipline.name)
      .filter((p) => !owned.some((o) => o.name === p.name));

    return {
      discipline,
      available,
      owned
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // -----------------------------------------
    // TAB SWITCHING (single handler)
    // -----------------------------------------
    html.find(".sheet-tabs .item").on("click", (ev) => {
      const tab = ev.currentTarget.dataset.tab;

      // Save active tab
      this.activeTab = tab;

      // Switch active button
      html.find(".sheet-tabs .item").removeClass("active");
      ev.currentTarget.classList.add("active");

      // Switch active content
      html.find(".tab-content").removeClass("active");
      html.find(`#${tab}`).addClass("active");
    });

    // -----------------------------------------
    // RESTORE ACTIVE TAB AFTER RENDER
    // -----------------------------------------
    if (this.activeTab) {
      html.find(".sheet-tabs .item").removeClass("active");
      html.find(`.sheet-tabs .item[data-tab="${this.activeTab}"]`).addClass("active");

      html.find(".tab-content").removeClass("active");
      html.find(`#${this.activeTab}`).addClass("active");
    }

    // -----------------------------------------
    // BUY POWER
    // -----------------------------------------
    html.find(".buy-power").on("click", async (ev) => {
      // Save active tab BEFORE render
      this.activeTab = html.find(".sheet-tabs .item.active").data("tab");

      const key = ev.currentTarget.dataset.key;
      const source = ABF_MENTAL_POWERS[key];

      const actor = game.actors.get(this.actorId);
      const disciplines = foundry.utils.duplicate(actor.system.psychic.disciplines);
      const discipline = disciplines[this.disciplineKey];

      const newPower = foundry.utils.duplicate(source);
      newPower.mastered = false;
      newPower.innate = false;
      newPower.strengthen = 0;

      discipline.mentalPowers.push(newPower);

      await actor.update({ "system.psychic.disciplines": disciplines });

      ui.notifications.info(`Learned Mental Power: ${source.name}`);

      this.render(true);
    });

    // -----------------------------------------
    // REMOVE POWER
    // -----------------------------------------
    html.find(".remove-power").on("click", async (ev) => {
      // Save active tab BEFORE render
      this.activeTab = html.find(".sheet-tabs .item.active").data("tab");

      const index = Number(ev.currentTarget.dataset.index);

      const actor = game.actors.get(this.actorId);
      const disciplines = foundry.utils.duplicate(actor.system.psychic.disciplines);
      const discipline = disciplines[this.disciplineKey];

      if (!discipline) {
        ui.notifications.error("Discipline not found.");
        return;
      }

      const removed = discipline.mentalPowers.splice(index, 1)[0];

      await actor.update({ "system.psychic.disciplines": disciplines });

      ui.notifications.info(`Removed Mental Power: ${removed.name}`);

      this.render(true);
    });
  }
}
