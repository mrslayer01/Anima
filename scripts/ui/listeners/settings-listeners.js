export function SettingsListeners(sheet, html) {
  html.find(".setting-isNPC").off("click");
  html.find(".setting-isNPC").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.isNPC === true;
    await actor.update({ "system.settings.isNPC": !isActive });
  });

  html.find(".setting-usesMystic").off("click");
  html.find(".setting-usesMystic").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesMystic === true;
    await actor.update({ "system.settings.usesMystic": !isActive });
  });

  html.find(".setting-usesDomine").off("click");
  html.find(".setting-usesDomine").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesDomine === true;
    await actor.update({ "system.settings.usesDomine": !isActive });
  });

  html.find(".setting-usesPsychic").off("click");
  html.find(".setting-usesPsychic").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesPsychic === true;
    await actor.update({ "system.settings.usesPsychic": !isActive });
  });

  html.find(".setting-usesSummoning").off("click");
  html.find(".setting-usesSummoning").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.usesSummoning === true;
    await actor.update({ "system.settings.usesSummoning": !isActive });
  });

  html.find(".setting-ignoreDPLimit").off("click");
  html.find(".setting-ignoreDPLimit").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.ignoreDPLimit === true;
    await actor.update({ "system.settings.ignoreDPLimit": !isActive });
  });
}
