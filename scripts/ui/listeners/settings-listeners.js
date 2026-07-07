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

  html.find(".setting-ignoreDPLimit").off("click");
  html.find(".setting-ignoreDPLimit").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.ignoreDPLimit === true;
    await actor.update({ "system.settings.ignoreDPLimit": !isActive });
  });

  html.find(".setting-isInhuman").off("click");
  html.find(".setting-isInhuman").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.isInhuman === true;
    await actor.update({ "system.settings.isInhuman": !isActive });
  });

  html.find(".setting-isZen").off("click");
  html.find(".setting-isZen").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.isZen === true;
    await actor.update({ "system.settings.isZen": !isActive });
  });

  html.find(".setting-hasDamageResistance").off("click");
  html.find(".setting-hasDamageResistance").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;

    const isActive = actor.system.settings.hasDamageResistance === true;
    await actor.update({ "system.settings.hasDamageResistance": !isActive });
  });
}
