import { toNum } from "../helpers/lookup.js";

export class ElanInfoWindow extends Application {
  constructor(elanName, elanData, options = {}) {
    super(options);
    this.elanName = elanName;
    this.elanData = elanData;
    this.actorId = options.actorId;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "elan-info-window",
      title: "Elan Details",
      classes: ["abf-character-sheet", "elan-info"],
      template: "systems/abf-system/templates/actors/apps/elan-info.hbs",
      width: 1150,
      height: "auto"
    });
  }

  getData() {
    return {
      elanName: this.elanName,
      elanData: this.elanData
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // BUY GIFT
    html.find(".buy-gift").on("click", (event) => {
      const giftIndex = Number(event.currentTarget.dataset.gift);
      const gift = this.elanData.gifts[giftIndex];

      new Dialog({
        title: "Purchase Gift",
        content: `<p>Are you sure you want to purchase <strong>${gift.name}</strong>?</p>`,
        buttons: {
          yes: {
            label: "Yes",
            callback: () => this._purchaseGift(giftIndex)
          },
          no: { label: "No" }
        }
      }).render(true);
    });

    // REMOVE GIFT
    html.find(".remove-gift").on("click", (event) => {
      const giftIndex = Number(event.currentTarget.dataset.index);
      const gift = this.elanData.purchasedGifts[giftIndex];

      new Dialog({
        title: "Remove Gift",
        content: `<p>Are you sure you want to remove <strong>${gift.name}</strong>?</p>`,
        buttons: {
          yes: {
            label: "Yes",
            callback: () => this._removeGift(giftIndex)
          },
          no: { label: "No" }
        }
      }).render(true);
    });
  }

  async _removeGift(giftIndex) {
    const actor = game.actors.get(this.actorId);
    if (!actor) return;

    const elans = foundry.utils.duplicate(actor.system.elans);

    const elan = elans.find((l) => l.name === this.elanName);
    if (!elan) return;

    if (!Array.isArray(elan.purchasedGifts)) elan.purchasedGifts = [];

    const gift = elan.purchasedGifts[giftIndex];

    //refund gif cost.
    elan.elan.spent = toNum(elan.elan.spent) - toNum(gift.elanCost);
    elan.purchasedGifts.splice(giftIndex, 1);

    await actor.update({ "system.elans": elans });

    this.elanData = elan;
    this.render(true);
  }

  async _purchaseGift(giftIndex) {
    const actor = game.actors.get(this.actorId);
    if (!actor) return;

    const elans = foundry.utils.duplicate(actor.system.elans);

    const elan = elans.find((l) => l.name === this.elanName);
    if (!elan) return;

    // Ensure purchasedGifts exists
    if (!Array.isArray(elan.purchasedGifts)) elan.purchasedGifts = [];

    const gift = elan.gifts[giftIndex];

    // Prevent duplicates
    if (elan.purchasedGifts.some((g) => g.name === gift.name)) {
      ui.notifications.warn("You already purchased this gift.");
      return;
    }

    if (elan.elan.final < gift.elanRequirements) {
      ui.notifications.warn("You don't have enough Elan with this Deity to buy this gift.");
      return;
    }

    if (elan.elan.remaining < gift.elanCost) {
      ui.notifications.warn(
        "You don't have enough Elan remaining with this Deity to buy this gift."
      );
      return;
    }

    //subtract cost from remaining from spent as it will also update remaining.
    elan.elan.spent = toNum(elan.elan.spent) + toNum(gift.elanCost);

    elan.purchasedGifts.push(gift);

    await actor.update({ "system.elans": elans });

    this.elanData = elan;
    this.render(true);
  }
}
