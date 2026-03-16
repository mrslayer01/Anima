import { toNum } from "./numbers.js";

export function AddModifier(mod, entry) {
  if (!Array.isArray(mod.currentMods)) mod.currentMods = [];

  const idx = mod.currentMods.findIndex((m) => m.id === entry.id);

  // If value is 0 → remove the record
  if (toNum(entry.value) === 0) {
    if (idx !== -1) mod.currentMods.splice(idx, 1);
    return;
  }

  // If exists → update
  if (idx !== -1) {
    mod.currentMods[idx].value = entry.value;
    mod.currentMods[idx].type = entry.type;
    mod.currentMods[idx].source = entry.source;
  }
  // If not → push new
  else {
    mod.currentMods.push({
      id: entry.id,
      source: entry.source,
      value: entry.value,
      type: entry.type
    });
  }
}
export async function openJournalFromName(pageName, anchor = null) {
  const result = await getJournalPageFromCompendium(pageName);
  if (!result) return;

  const { entry, page } = result;

  entry.sheet.render(true, {
    editable: false,
    pageId: page.id
  });

  if (!anchor) return;

  Hooks.once("renderJournalPageSheet", (sheet, html) => {
    setTimeout(() => {
      const el = html[0].querySelector(`#${anchor}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  });
}

async function getJournalPageFromCompendium(rawName) {
  const pack = game.packs.get("abf-system.abf-journals");
  if (!pack) {
    ui.notifications.error("Journal compendium not found.");
    return null;
  }

  const index = await pack.getIndex();
  const entries = Array.from(index.values());

  const target = normalizeNameJournal(rawName);

  for (const entryMeta of entries) {
    const entry = await pack.getDocument(entryMeta._id);

    for (const page of entry.pages) {
      const pageKey = normalizeNameJournal(page.name);

      // CONTAINS MATCH (both directions)
      if (pageKey.includes(target) || target.includes(pageKey)) {
        return { entry, page };
      }
    }
  }

  ui.notifications.warn(`Journal page matching "${rawName}" not found.`);
  return null;
}

function normalizeNameJournal(str) {
  return str
    .toLowerCase()
    .replace(/[\s\(\)\-_'’\/]/g, "") // remove spaces & punctuation
    .replace(/[^a-z0-9]/g, ""); // remove anything else weird
}

export function normalizeName(name) {
  return name
    .trim()
    .replace(/([A-Z])/g, " $1") // split CamelCase
    .replace(/\s+/g, " ") // collapse spaces
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Apply relative/absolute numeric logic to an input element.
 * - Supports +50, -20, 120
 * - Clamps to data-min and data-max
 * - Stores new value in data-current
 * - Returns the final numeric value
 */
export function applyRelativeInput(input) {
  const minValue = Number(input.dataset.min ?? 0);
  const maxValue = input.dataset.max !== undefined ? Number(input.dataset.max) : null;

  const raw = input.value.trim();

  // Previous committed value
  const previous = Number(input.dataset.current ?? input.value) || 0;
  let newValue = previous;

  // COMPLETE relative: +50 / -10
  if (/^[+-]\d+$/.test(raw)) {
    newValue = previous + Number(raw);
  }
  // COMPLETE absolute: 50 / 120
  else if (/^\d+$/.test(raw)) {
    newValue = Number(raw);
  }
  // Invalid → revert
  else {
    input.value = previous;
    return previous;
  }

  // Clamp
  newValue = Math.max(minValue, newValue);
  if (maxValue !== null) newValue = Math.min(maxValue, newValue);

  // Update UI + dataset
  input.value = newValue;
  input.dataset.current = newValue;

  return newValue;
}

export function capitalizeFirst(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.substring(1);
}

export function getActorOwner(actor) {
  // Find all users with OWNER or higher
  const owners = game.users.filter((u) => actor.testUserPermission(u, "OWNER"));
  return owners[0] ?? null;
}

export function waitForDiceAnimation(count) {
  return new Promise((resolve) => {
    if (!game.dice3d || count === 0) return resolve();

    let finished = 0;

    const handler = () => {
      finished++;
      if (finished >= count) {
        Hooks.off("diceSoNiceRollComplete", handler);
        resolve();
      }
    };

    Hooks.on("diceSoNiceRollComplete", handler);
  });
}
