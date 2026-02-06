export function loadAllItemPartials() {
    const itemPartials = [
        "common"
    ];


    for (const p of itemPartials) {
        foundry.applications.handlebars.loadTemplates([
        `systems/abf-system/templates/items/partials/${p}.hbs`,
        ]);
    }
    
}