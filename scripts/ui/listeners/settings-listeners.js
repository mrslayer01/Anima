export function SettingsListeners(sheet, html) {
  html.find(".passive-icon.clickable.setting-isNPC").off("click");
  html.find(".passive-icon.clickable.setting-isNPC").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.isNPC === true;
    await actor.update({ "system.settings.isNPC": !isActive });
  });

  html.find(".passive-icon.clickable.setting-usesMystic").off("click");
  html.find(".passive-icon.clickable.setting-usesMystic").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesMystic === true;
    await actor.update({ "system.settings.usesMystic": !isActive });
  });

  html.find(".passive-icon.clickable.setting-usesDomine").off("click");
  html.find(".passive-icon.clickable.setting-usesDomine").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesDomine === true;
    await actor.update({ "system.settings.usesDomine": !isActive });
  });

  html.find(".passive-icon.clickable.setting-usesPsychic").off("click");
  html.find(".passive-icon.clickable.setting-usesPsychic").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesPsychic === true;
    await actor.update({ "system.settings.usesPsychic": !isActive });
  });

  html.find(".passive-icon.clickable.setting-usesSummoning").off("click");
  html.find(".passive-icon.clickable.setting-usesSummoning").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesSummoning === true;
    await actor.update({ "system.settings.usesSummoning": !isActive });
  });
}
