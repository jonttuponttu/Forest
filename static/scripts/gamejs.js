document.addEventListener('DOMContentLoaded', async (event) => {
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryModal = document.getElementById('inventory-modal');
    const closeBtn = document.querySelector('.close');
    const moveButton = document.getElementById('move-button');
    const forwardButton = document.getElementById('forward-button');
    const turnLeftButton = document.getElementById('turn-left-button');
    const turnRightButton = document.getElementById('turn-right-button');
    const movementOptions = document.getElementById('movement-options');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingMessage = document.getElementById('loading-message');
    const gameContainer = document.getElementById('game-container');
    const actionMessageBox = document.getElementById('action-message-box');

    // Load item and entity data from JSON files
    const items = await fetch('static/assets/items/stone_sword.json').then(response => response.json());
    const entities = await fetch('static/assets/entities/skeleton.json').then(response => response.json());

    // Simulate loading progress and random messages
    let startTime = Date.now();
    let currentMessageIndex = 0;
    let progress = 0;
    const messages = [
        'Building Terrain',
        'Generating Rocks',
        'Loading Assets'
    ];
    
    // Define durations for each message
    const durations = [3000, 7000, 5000]; // durations in milliseconds
    
    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    const loadingInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
    
        // Calculate progress based on time elapsed
        progress = Math.min(100, (elapsed / durations[currentMessageIndex]) * 100);
    
        loadingProgress.style.width = progress + '%';
    
        // Display the current message with the calculated progress
        loadingMessage.textContent = `${messages[currentMessageIndex]} ${Math.floor(progress)}%`;
    
        if (progress >= 100) {
            // If progress reaches 100%, move to the next message
            currentMessageIndex++;
    
            // If all messages have been displayed, reset the currentMessageIndex to 0
            if (currentMessageIndex >= messages.length) {
                currentMessageIndex = 0;
            }
    
            // Reset start time for the next message
            startTime = Date.now();
            progress = 0;
        }
    }, 100);

    // Show inventory modal
    inventoryButton.addEventListener('click', () => {
        inventoryModal.style.display = 'block';
    });

    // Close inventory modal
    closeBtn.addEventListener('click', () => {
        inventoryModal.style.display = 'none';
    });

    // Show movement options
    moveButton.addEventListener('click', () => {
        movementOptions.style.display = 'flex';
    });

    // Hide movement options when one is selected and show loading animation
    document.querySelectorAll('#movement-options button').forEach(button => {
        button.addEventListener('click', () => {
            movementOptions.style.display = 'none';
            showLoadingAnimation(button.id);
        });
    });

    function showLoadingAnimation(action) {
        let actionMessage;
        if (action === 'forward-button') {
            actionMessage = 'Moving forward';
        } else if (action === 'turn-left-button') {
            actionMessage = 'Turning Left';
        } else if (action === 'turn-right-button') {
            actionMessage = 'Turning Right';
        }

        const wasInventoryOpen = inventoryModal.style.display === 'block';
        if (wasInventoryOpen) {
            inventoryModal.style.display = 'none';
        }

        actionMessageBox.style.display = 'flex';
        let dots = 0;
        const dotInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            actionMessageBox.textContent = `${actionMessage}${'.'.repeat(dots)}`;
        }, 500);

        setTimeout(() => {
            clearInterval(dotInterval);
            actionMessageBox.style.display = 'none';
            if (wasInventoryOpen) {
                inventoryModal.style.display = 'block';
            }
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
        }, 5000);
    }
});
