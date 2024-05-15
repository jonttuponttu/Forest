import { randomEncounter } from './encounters.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryModal = document.getElementById('inventory-modal');
    const closeBtn = document.querySelector('.close');
    const moveButton = document.getElementById('move-button');
    const forwardButton = document.getElementById('forward-button');
    const turnLeftButton = document.getElementById('turn-left-button');
    const turnRightButton = document.getElementById('turn-right-button');
    const movementOptions = document.getElementById('movement-options');
    const actionMessageBox = document.getElementById('action-message-box');

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

    // Add event listeners to movement buttons
    forwardButton.addEventListener('click', () => {
        showLoadingAnimation('forward-button');
    });

    turnLeftButton.addEventListener('click', () => {
        showLoadingAnimation('turn-left-button');
    });

    turnRightButton.addEventListener('click', () => {
        showLoadingAnimation('turn-right-button');
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
            randomEncounter();
        }, 5000);
    }

    // Save and load buttons
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    
    // Save game state
    saveButton.addEventListener('click', () => {
        const gameState = {
            cheats: localStorage.getItem('cheats') ? 1 : 0,
            // other player statistics and progress and inventory and level and xp and location and everything.
        };
    
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameState));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "forest-savegame.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
    
    // Load game state
    loadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
    
        input.onchange = (event) => {
            const file = event.target.files[0];
    
            const reader = new FileReader();
            reader.onload = (event) => {
                const gameState = JSON.parse(event.target.result);
                // Load the game state
                // ...
            };
            reader.readAsText(file);
        };
    
        input.click();
    });
});
