import { ABF_CLASSES } from "../config/classes.js";

export class AddClassWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.selectedClass = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-class-window",
      title: "Add Class",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/add-class.hbs",
      width: 1000,
      height: 1160,
      resizable: true
    });
  }

  getData() {
    const classOptions = Object.keys(ABF_CLASSES).sort();

    if (!this.selectedClass && classOptions.length > 0) {
      this.selectedClass = classOptions[0];
    }

    return {
      classOptions,
      selectedClass: this.selectedClass,
      classData: ABF_CLASSES[this.selectedClass] || null
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const selector = html.find(".class-selector");

    selector.on("change", ev => {
      this.selectedClass = ev.target.value;
      this.render(true); // re-render template with updated classData
    });

    html.find(".confirm-add").click(async ev => {
      ev.preventDefault();

      if (!this.selectedClass) {
        return ui.notifications.warn("Select a class first.");
      }

      const actor = game.actors.get(this.options.actorId);
      const classes = foundry.utils.duplicate(actor.system.classes ?? []);

      const classData = ABF_CLASSES[this.selectedClass];
      if (!classData) {
        return ui.notifications.error("Class data missing.");
      }

      classes.push(classData);

      await actor.update({ "system.classes": classes });

      this.close();
    });
  }
}