import { randomEncounter } from './encounters.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryModal = document.getElementById('inventory-modal');
    const closeBtn = document.querySelector('.close');
    const moveButton = document.getElementById('move-button');
    const forwardButton = document.getElementById('forward-button');
    const turnLeftButton = document.getElementById('turn-left-button');
    const turnRightButton = document.getElementById('turn-right-button');
    
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
            randomEncounter();
        }, 5000);
    }
});
