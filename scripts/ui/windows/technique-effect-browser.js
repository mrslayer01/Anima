import { ABF_KI_EFFECTS } from "../../config/ki-dominion.js";

export class TechniqueEffectBrowser extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
    this.itemId = options.itemId; // Technique item being edited

    this.search = "";
    this.filterType = "All";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "technique-effect-browser",
      title: "Technique Effect Browser",
      classes: ["abf-character-sheet", "technique-effect-browser"],
      template: "systems/abf-system/templates/items/apps/technique-effect-browser.hbs",
      width: 800,
      height: 700,
      resizable: true,
      scrollY: [".effects-grid"]
    });
  }

  getData() {
    // Convert registry into array
    let effects = Object.entries(ABF_KI_EFFECTS).map(([key, data]) => ({
      key,
      ...data
    }));

    // Filter by type
    if (this.filterType !== "All") {
      effects = effects.filter((e) => e.type === this.filterType);
    }

    // Search filter
    if (this.search.trim().length > 0) {
      const s = this.search.toLowerCase();
      effects = effects.filter((e) => e.name.toLowerCase().includes(s));
    }

    return {
      effects,
      search: this.search,
      filterType: this.filterType,
      types: ["All", "Offensive", "Defensive", "Special", "Action", "Destructive"]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Search
    html.find(".technique-effect-search").on("change", (ev) => {
      this.search = ev.currentTarget.value;
      this.render(true);
    });

    // Type filter
    html.find(".technique-effect-filter").on("change", (ev) => {
      this.filterType = ev.currentTarget.value;
      this.render(true);
    });

    // Add effect to Technique
    html.find(".add-effect").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;
      const source = ABF_KI_EFFECTS[key];

      const actor = game.actors.get(this.actorId);
      const item = actor.items.get(this.itemId);

      const effects = foundry.utils.duplicate(item.system.effects || []);

      const newEffect = {
        name: source.name,
        type: source.type,
        maintained: source.maintained,
        description: source.description,
        effects: foundry.utils.duplicate(source.effects),
        purchasedEffects: [],
        totalMk: 0,
        totalKi: 0,
        primaryChar: source.primaryChar,
        secondaryChars: foundry.utils.duplicate(source.secondaryChars),
        relatedElements: foundry.utils.duplicate(source.relatedElements),

        optionalAdvantages: foundry.utils.duplicate(source.optionalAdvantages || []),
        purchasedAdvantages: [],

        optionalDisadvantages: foundry.utils.duplicate(source.optionalDisadvantages || []),
        purchasedDisadvantages: []
      };

      effects.push(newEffect);

      await item.update({ "system.effects": effects });

      ui.notifications.info(`Added ${source.name} to Technique.`);

      this.close();
    });

    // Open effect details
    html.find(".open-effect").on("click", (ev) => {
      const key = ev.currentTarget.dataset.key;
      const effect = ABF_KI_EFFECTS[key];

      // Build rows
      const levelRows = effect.effects
        .map((lvl) => {
          const mainKey = Object.keys(lvl).find(
            (k) => !["primaryKiCost", "secondaryKiCost", "mkCost", "kiMaint", "level"].includes(k)
          );

          const mainValue = lvl[mainKey];

          return `
      <div class="effect-row">
        <strong>${formatMainKey(mainKey)}: ${mainValue}</strong>,
        Primary Ki: ${lvl.primaryKiCost},
        Secondary Ki: ${lvl.secondaryKiCost},
        MK: ${lvl.mkCost},
        Maint: ${lvl.kiMaint},
        Level Req: ${lvl.level}
      </div>
    `;
        })
        .join("");

      new Dialog(
        {
          title: `${effect.name} – Details`,
          classes: ["abf-character-sheet", "technique-effect-preview"],
          content: `
      <h2>${effect.name}</h2>
      <p><strong>Type:</strong> ${effect.type}</p>
      <p>${effect.description}</p>

      <h3>Effect Values</h3>
      ${levelRows}
    `,
          buttons: { ok: { label: "OK" } }
        },
        {
          width: 800,
          height: "auto",
          resizable: true
        }
      ).render(true);
    });
  }
}

function formatMainKey(key) {
  if (!key) return key;

  // Find the first capital letter after the first character
  const match = key.slice(1).match(/[A-Z]/);

  if (match) {
    const index = match.index + 1; // +1 because we sliced
    return key.slice(index); // return the capitalized word
  }

  // No internal capital → capitalize whole key
  return key.charAt(0).toUpperCase() + key.slice(1);
}
