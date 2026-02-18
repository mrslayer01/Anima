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

export async function openJournalFromUUID(rawUuid) {
  const [uuid, anchor] = rawUuid.split("#");

  // Load the page document
  const page = await fromUuid(uuid);
  if (!page) return ui.notifications.warn("Journal entry not found.");

  const entry = page.parent;

  // Render the JournalEntry in VIEW mode
  entry.sheet.render(true, {
    editable: false,
    pageId: page.id
  });

  if (!anchor) return;

  // Auto-scroll after the page sheet renders
  Hooks.once("renderJournalPageSheet", (sheet, html) => {
    setTimeout(() => {
      const el = html[0].querySelector(`#${anchor}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  });
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
