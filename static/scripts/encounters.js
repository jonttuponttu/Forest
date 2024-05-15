export async function randomEncounter() {
    // Load entity data from JSON files
    const entities = await fetch('static/assets/entities/skeleton.json').then(response => response.json());

    // Random chance to encounter NPC or monster (20% chance)
    const encounterChance = Math.random();
    if (encounterChance <= 0.2) {
        // Select a random character
        const character = entities[Math.floor(Math.random() * entities.length)];
        // Prompt the player with a confirmation box
        const approachConfirmation = confirm(`You encountered a ${character.entity}. Do you want to approach?`);
        if (approachConfirmation) {
            // If player chooses to approach, redirect to character's page
            window.location.href = character.page;
        }
    }
}
