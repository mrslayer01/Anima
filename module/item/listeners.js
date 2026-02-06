import { PRICE_MODIFIERS, costToCopper, copperToCost } from "./helpers/lookup.js";

export function registerSheetListeners(sheet, html) {
    // const selector = html.find(".quality-select");
    
    html.find(".quality-select").on("change", async ev => {
        const item = sheet.item;
        const quality = ev.currentTarget.value;
        const modifier = PRICE_MODIFIERS[quality] ?? 1;

        const baseCost = item.system.baseCost ?? item.system.cost;
        const baseCopper = costToCopper(baseCost);

        const modifiedCopper = Math.floor(baseCopper * modifier);
        const newCost = copperToCost(modifiedCopper);

        await sheet.item.update({
        "system.quality.value": quality,
        "system.cost": newCost
        });

        console.log(item.system.quality, quality, modifier);
        sheet.render(false);
    });

}