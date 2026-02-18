import { toNum } from "../../utils/numbers.js";

export function LanguageContactTitlesListeners(sheet, html) {
  Titles(sheet, html);
  Languages(sheet, html);
  Contacts(sheet, html);
}

function Titles(sheet, html) {
  html.find(".add-titles").on("click", async (event) => {
    const actor = sheet.actor;
    const titles = foundry.utils.duplicate(actor.system.titles);

    // Add a new blank language entry
    titles.push({ name: "" });

    await actor.update({ "system.titles": titles });
  });

  html.find(".titles-name-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = toNum(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const titles = foundry.utils.duplicate(actor.system.titles);
    titles[index].name = value;

    await actor.update({ "system.titles": titles });
  });

  html.find(".delete-titles").off("click");
  html.find(".delete-titles").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this title?</p>"
    });

    if (!confirmed) return;

    const titles = foundry.utils.duplicate(sheet.actor.system.titles);

    const deletedName = titles[index]?.name;

    titles.splice(index, 1);

    await sheet.actor.update({ "system.titles": titles });
  });
}

function Languages(sheet, html) {
  html.find(".add-language").on("click", async (event) => {
    const actor = sheet.actor;
    const languages = foundry.utils.duplicate(actor.system.languages);

    // Add a new blank language entry
    languages.push({ name: "", level: 0 });

    await actor.update({ "system.languages": languages });
  });

  html.find(".languages-name-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = toNum(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const languages = foundry.utils.duplicate(actor.system.languages);
    languages[index].name = value;

    await actor.update({ "system.languages": languages });
  });

  html.find(".languages-level-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = toNum(event.currentTarget.dataset.index);
    const value = toNum(event.currentTarget.value) || 0;

    const languages = foundry.utils.duplicate(actor.system.languages);
    languages[index].level = value;

    await actor.update({ "system.languages": languages });
  });

  html.find(".delete-languages").off("click");
  html.find(".delete-languages").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this language?</p>"
    });

    if (!confirmed) return;

    const lang = foundry.utils.duplicate(sheet.actor.system.languages);

    lang.splice(index, 1);

    await sheet.actor.update({ "system.languages": lang });
  });
}

function Contacts(sheet, html) {
  html.find(".add-contacts").on("click", async (event) => {
    const actor = sheet.actor;
    const contacts = foundry.utils.duplicate(actor.system.contacts);

    // Add a new blank contacts entry
    contacts.push({ name: "", description: "" });

    await actor.update({ "system.contacts": contacts });
  });

  html.find(".contacts-name-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = toNum(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const contacts = foundry.utils.duplicate(actor.system.contacts);
    contacts[index].name = value;

    await actor.update({ "system.contacts": contacts });
  });

  html.find(".contacts-description-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = toNum(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const contacts = foundry.utils.duplicate(actor.system.contacts);
    contacts[index].description = value;

    await actor.update({ "system.contacts": contacts });
  });

  html.find(".delete-contacts").off("click");
  html.find(".delete-contacts").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this contact?</p>"
    });

    if (!confirmed) return;

    const contacts = foundry.utils.duplicate(sheet.actor.system.contacts);

    contacts.splice(index, 1);

    await sheet.actor.update({ "system.contacts": contacts });
  });
}
