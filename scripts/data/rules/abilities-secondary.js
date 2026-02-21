import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";
import { ABILITIES_SECONDARIES_SCHEMA } from "./schema.js";

export class AbilitiesSecondaryRule extends BaseRule {
  Initialize(system) {
    if (system.abilities.secondary.totalDPSpent === undefined)
      system.abilities.secondary.totalDPSpent = 0;
    // Add all the missing fields for cost, class, final, special, characteristic, knowledge, passive, undeveloped, mastery and armorPenalty.
    for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
      for (const [abilityName, abil] of Object.entries(category)) {
        if (abil.cost === undefined) abil.cost = 0;
        if (abil.class === undefined) abil.class = 0;
        if (abil.final === undefined) abil.final = 0;
        if (abil.special === undefined) abil.special = 0;
        if (abil.characteristic === undefined) {
          abil.characteristic = ABILITIES_SECONDARIES_SCHEMA[abilityName].characteristic;
        }
        if (abil.knowledge === undefined) {
          abil.knowledge = ABILITIES_SECONDARIES_SCHEMA[abilityName].knowledge;
        }
        if (abil.passive === undefined) {
          abil.passive = ABILITIES_SECONDARIES_SCHEMA[abilityName].passive;
        }
        if (abil.undeveloped === undefined) abil.undeveloped = true;
        if (abil.mastery === undefined) abil.mastery = false;
        if (abil.armorPenalty === undefined) {
          abil.armorPenalty = ABILITIES_SECONDARIES_SCHEMA[abilityName].armorPenalty;
        }
        if (abil.journal === undefined) abil.journal = ABILITY_JOURNALS[categoryName][abilityName];
        if (abil.naturalBonuses === undefined) abil.naturalBonuses = 0;
      }
    }
  }

  Derived(system) {
    this.Initialize(system);
    //Check if jack of All Trades exists
    const hasJackOfAllTrades = system.advantages.some((adv) => adv.name === "Jack of All Trades");

    // calculate secondary abilities
    for (const [categoryName, category] of Object.entries(system.abilities.secondary)) {
      for (const [abilityName, abil] of Object.entries(category)) {
        const linkedChar = abil.characteristic;
        const charFinal = toNum(system.characteristics[linkedChar]?.final);
        const base = toNum(abil.base);
        const bonus = toNum(abil.bonus);
        const cls = toNum(abil.class);
        const special = toNum(abil.special);
        let naturalTotal = charFinal * toNum(abil.naturalBonuses);
        const total = base + bonus + cls + special + naturalTotal;

        if (hasJackOfAllTrades) {
          abil.final = total + charFinal + 10;
          abil.undeveloped = 0;
        } else {
          abil.final = total + charFinal;
          abil.undeveloped = total === 0;
        }
        abil.mastery = total >= 200;
      }
    }
  }

  DetectChanged(updateData, oldSystem) {
    //watches characteristics, base, bonus, class and special
    const changed = [];
    //check for any changed characterstics.
    //check for any changed characterstics. Check base and bonus.
    for (const [categoryName, category] of Object.entries(oldSystem.abilities.secondary)) {
      for (const [abilityName, abil] of Object.entries(category)) {
        const linkedChar = abil.characteristic;
        const charPath = `system.characteristics.${linkedChar}.base`;
        const charPathBonus = `system.characteristics.${linkedChar}.bonus`;
        const newChar = foundry.utils.getProperty(updateData, charPath);
        const newCharBonus = foundry.utils.getProperty(updateData, charPathBonus);
        const oldChar = oldSystem.characteristics[linkedChar]?.base;
        const oldCharBonus = oldSystem.characteristics[linkedChar]?.bonus;

        if (newChar !== undefined && newChar !== oldChar) {
          changed.push(abilityName);
        }

        if (newCharBonus !== undefined && newCharBonus !== oldCharBonus) {
          changed.push(abilityName);
        }
      }
    }

    //check if any base/bonus/class or special has changed
    for (const [categoryName, category] of Object.entries(oldSystem.abilities.secondary)) {
      for (const [abilityName, abil] of Object.entries(category)) {
        const oldAbil = oldSystem.abilities.secondary[categoryName][abilityName];
        const bonusPath = `system.abilities.secondary.${categoryName}.${abilityName}.bonus`;
        const basePath = `system.abilities.secondary.${categoryName}.${abilityName}.base`;
        const classPath = `system.abilities.secondary.${categoryName}.${abilityName}.class`;
        const specialPath = `system.abilities.secondary.${categoryName}.${abilityName}.special`;

        const newBonus = foundry.utils.getProperty(updateData, bonusPath);
        const newBase = foundry.utils.getProperty(updateData, basePath);
        const newClass = foundry.utils.getProperty(updateData, classPath);
        const newSpecial = foundry.utils.getProperty(updateData, specialPath);

        if (newBonus !== undefined && newBonus !== oldAbil.bonus) {
          changed.push(abilityName);
        }

        if (newBase !== undefined && newBase !== oldAbil.base) {
          changed.push(abilityName);
        }

        if (newClass !== undefined && newClass !== oldAbil.class) {
          changed.push(abilityName);
        }

        if (newSpecial !== undefined && newSpecial !== oldAbil.special) {
          changed.push(abilityName);
        }
      }
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return [...new Set(changed)];
  }

  RecalcUpdated(system, abilityName) {
    const hasJackOfAllTrades = system.advantages.some((adv) => adv.name === "Jack of All Trades");
    // Find the ability inside the nested categories
    for (const category of Object.values(system.abilities.secondary)) {
      if (category[abilityName]) {
        const abil = category[abilityName];

        const linkedChar = abil.characteristic;
        const charFinal = toNum(system.characteristics[linkedChar]?.final);

        const base = toNum(abil.base);
        const bonus = toNum(abil.bonus);
        const cls = toNum(abil.class);
        const special = toNum(abil.special);
        let naturalTotal = charFinal * toNum(abil.naturalBonuses);

        const total = base + bonus + cls + special + naturalTotal;
        if (hasJackOfAllTrades) {
          abil.final = total + charFinal + 10;
          abil.undeveloped = 0;
        } else {
          abil.final = total + charFinal;
          abil.undeveloped = total === 0;
        }
        abil.mastery = total >= 200;

        return; // done
      }
    }
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

const ABILITY_JOURNALS = {
  Athletics: {
    Acrobatics:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.MY510372A22d3JZR",
    Athleticism:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.u0m1pw9SvzHCTQ13",
    Climb:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.tHU1Sy3dECuOm5Yd",
    Jump: "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.tMbowaxg3moap2GN",
    Ride: "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.cmoLvO8bokz1Goo4",
    Swim: "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.nmkXv5Da3A4qSz1E"
  },

  Social: {
    Intimidate:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.ASkM6TlV7grJXawg",
    Leadership:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.4zacNUG9hotGyEes",
    Persuasion:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.G188zt90jhHGYIXm",
    Style:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.GWbdUwcsWDANxcIS"
  },

  Perception: {
    Notice:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.jhbUo9VzXLg3wmZB",
    Search:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.RZGhWAWp9QRfL4Nv",
    Track:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.xA81TuSVMIFnzmLS"
  },

  Intellectual: {
    Animals:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.F40O0dGUWe8SS75i",
    Appraisal:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.c9e4HqVapp9Yvepz",
    HerbalLore:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.IgFKAYfgdFO8i6Zb",
    History:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.RMKzEzr3TzIDgkSb",
    MagicAppraisal:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.cpT8KkSTlw7KLZe5",
    Medicine:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.TUixTdLd0PXDeTsg",
    Memorize:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.nMp4mH73NQSqnT8S",
    Navigation:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.PgsG7Zie0GHyzt8u",
    Occult:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.x0teoetgOIrvahjU",
    Science:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.ilEuj8At6aFrX4jD"
  },

  Vigor: {
    Composure:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.8SzAsQABkNro17Hx",
    WithstandPain:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.JnvWJUfo9LtpA33B",
    FeatsOfStrength:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.oAf0IWrOdMJfJoR6"
  },

  Subterfuge: {
    Theft:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.X634pdRrQyW7BU08",
    Disguise:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.7gktntO25nCqiaAu",
    Hide: "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.cbtLvz61ZjDNJExH",
    Stealth:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.Hj9WBVRnNedMJOvj",
    TrapLore:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.f6m1iAowOBdJJ8X8",
    LockPicking:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.vxXroK8tCzrCq5mL",
    Poisons:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.7rjn4Tklskks6cqC"
  },

  Creative: {
    Art: "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.vsEq6zU8NAP9vpz4",
    Dance:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.EUKGrUcllOmRWea0",
    Music:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.awGkjAuCA0YrX91P",
    SleightOfHand:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.B8itelptEhHOHvLl",
    Forging:
      "Compendium.abf-system.abf-journals.JournalEntry.ozittc759e8nqTuT.JournalEntryPage.CZq6d9vixluxesck"
  }
};
