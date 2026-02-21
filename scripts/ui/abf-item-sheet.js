import { registerItemSheetListeners } from "./listeners.js";

export class AbfItemSheet extends foundry.appv1.sheets.ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-system", "sheet", "item"],
      template: "systems/abf-system/templates/items/item-sheet.hbs",
      width: 650,
      height: 695,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main"
        }
      ],
      dragDrop: [{ dragSelector: null, dropSelector: ".item-table" }]
    });
  }

  async _onDrop(event) {
    event.preventDefault();
    const data = TextEditor.getDragEventData(event);
    return this._onDropItem(event, data);
  }

  async _onDropItem(event, data) {
    const dropped = await Item.fromDropData(data);
    if (!dropped) return;

    // Only ammo can be dropped
    if (dropped.type !== "ammo") {
      return ui.notifications.warn("Only ammo can be added here.");
    }

    // Item sheets do NOT have this.actor — use this.item.actor
    const parentActor = this.item.actor;
    if (!parentActor) {
      return ui.notifications.error("This item is not owned by an actor.");
    }

    // Find the parent item row (the weapon)
    const parentItemId = event.target.closest("[data-item-id]")?.dataset.itemId;
    if (!parentItemId) {
      return ui.notifications.error("No parent item found for this table.");
    }

    const parentItem = parentActor.items.get(parentItemId);
    if (!parentItem) {
      return ui.notifications.error("Parent item not found on actor.");
    }

    // Parent must be a weapon
    if (parentItem.type !== "weapon") {
      return ui.notifications.warn("Ammo can only be added to weapons.");
    }

    // 1. Embed the ammo item into the actor
    const [embeddedAmmo] = await parentActor.createEmbeddedDocuments("Item", [dropped.toObject()]);

    // 2. Store ONLY the embedded ammo ID
    const ammoEntry = { id: embeddedAmmo.id };

    // 3. Append to weapon.system.ammo[]
    const updatedAmmo = [...(parentItem.system.ammo ?? []), ammoEntry];

    // 4. Update the weapon
    return parentItem.update({
      "system.ammo": updatedAmmo
    });
  }

  getData(options) {
    const data = super.getData(options);

    // Duplicate system data for safe editing
    data.system = foundry.utils.duplicate(this.item.system);

    // ADD THIS: expose the actor to the template
    data.actor = this.item.actor;

    return data;
  }

  async _onChangeInput(event) {
    const input = event.target;
    const name = input.name;

    if (input.type === "text") {
      const value = input.value;
      await this.item.update({ [name]: value });
      return;
    }

    if (input.tagName === "SELECT") return;

    let value = Number(input.value);

    const isCurrency = name.startsWith("system.cost.value");

    if (name.startsWith("system.cost.value") && value < 0) {
      //currency can't go negative
      value = 0;
      input.value = 0;
    }

    await this.item.update({ [name]: value });
  }

  activateListeners(html) {
    super.activateListeners(html);

    registerItemSheetListeners(this, html);
  }
}
