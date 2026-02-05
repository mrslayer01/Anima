import { ABF_LORDS } from "../config/elans.js";

export class AddElanWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.selectedElan = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-elan-window",
      title: "Add Elan",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/add-elan.hbs",
      width: 1150,
      height: "auto",
    });
  }

  getData() {
    const elanOptions = Object.keys(ABF_LORDS).sort();

    if (!this.selectedElan) {
      this.selectedElan = elanOptions[0];
    }

    return {
      elanOptions,
      selectedElan: this.selectedElan,
      elanData: ABF_LORDS[this.selectedElan]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".elan-selector").on("change", (event) => {
      this.selectedElan = event.target.value;
      this.render(true);
    });

    html.find(".confirm-add").click(async (ev) => {
      ev.preventDefault();

      if (!this.selectedElan)
        return ui.notifications.warn("Select a elan first.");

      const elanData = ABF_LORDS[this.selectedElan];
      const actor = game.actors.get(this.options.actorId);

      const elans = foundry.utils.duplicate(actor.system.elans ?? []);
      elans.push(elanData);

      await actor.update({ "system.elans": elans });

      this.close();
    });
  }
}