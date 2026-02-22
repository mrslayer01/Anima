export class ActiveEffectsViewer extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "abf-active-effects-viewer",
      title: "Active Effects",
      template: "systems/abf-system/templates/actors/apps/active-effects-viewer.hbs",
      width: 450,
      height: "auto",
      classes: ["abf", "active-effects-viewer"]
    });
  }

  /** @param {Actor} actor */
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
  }

  getData() {
    const effects = this.actor.effects.map((e) => ({
      id: e.id,
      name: e.name,
      icon: e.icon,
      disabled: e.disabled,
      duration: e.duration,
      flags: e.flags,
      changes: e.changes
    }));

    return {
      actor: this.actor,
      effects
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".effect-remove").on("click", async (ev) => {
      const id = ev.currentTarget.dataset.effectId;
      await this.actor.deleteEmbeddedDocuments("ActiveEffect", [id]);
      this.render(true); // force full refresh
    });
  }
}
