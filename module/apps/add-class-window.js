import { ABF_CLASSES } from "../config/classes.js";
import { ClassInfoWindow } from "../apps/class-info.js";

export class AddClassWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.selectedClass = null;
    this.classData = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-class-window",
      title: "Add Class",
      template: "systems/abf-system/templates/apps/add-class.hbs",
      width: 300,
      height: "auto",
      resizable: false,
    });
  }

  getData() {
    const classOptions = Object.keys(ABF_CLASSES).sort();

    // If no selection yet, default to the first class
    if (!this.selectedClass) {
      this.selectedClass = classOptions[0];
      this.classData = ABF_CLASSES[this.selectedClass];
    }

    return {
      classOptions,
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".class-selector").on("change", async (event) => {
      this.selectedClass = event.target.value;
      this.classData = ABF_CLASSES[this.selectedClass];
      console.log("Selected class:", this.selectedClass);

      // Refresh popup if it is open
      for (let app of Object.values(ui.windows)) {
        if (app instanceof ClassInfoWindow) {
          app.className = this.selectedClass; // update the class
          app.classData = ABF_CLASSES[this.selectedClass]; // update the data
          app.render(true); // re-render the popup
        }
      }
    });

    html.find(".class-info-icon").click((ev) => {
      ev.preventDefault();

      const className = this.selectedClass;

      new ClassInfoWindow(className, { classData: this.classData }).render(true);
    });

    html.find(".confirm-add").click(async () => {
      if (!this.selectedClass)
        return ui.notifications.warn("Select a class first.");
    if (!this.classData) {
      this.classData = ABF_CLASSES[this.selectedClass];
    }
      const actor = game.actors.get(this.options.actorId);
      const classes = duplicate(actor.system.classes ?? []);
      classes.push(this.classData);
      await actor.update({ "system.classes": classes });
      console.log(actor.system.classes);
      //Close any open class info windows and the popup itself.
      for (let app of Object.values(ui.windows)) {
        if (app instanceof ClassInfoWindow) {
          app.close();
        }
      }
      this.close();
    });
  }
}
