document.addEventListener('DOMContentLoaded', (event) => {
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

    // Simulate loading progress and random messages
    let startTime = Date.now();
    let currentMessageIndex = 0;
    const duration = 5000; // Total duration of each message display in milliseconds
    const messages = [
        'Building Terrain',
        'Generating Rocks',
        'Loading Assets'
    ];
    
    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    const loadingInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100); // Calculate progress based on time elapsed
        const message = messages[currentMessageIndex];
    
        loadingProgress.style.width = progress + '%';
    
        if (progress < 100) {
            loadingMessage.textContent = `${message} ${Math.floor(progress)}%`;
        } else {
            // Switch to the next message when the progress reaches 100%
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            startTime = Date.now(); // Reset start time for the next message
        }
    
        if (progress % 3 === 0) {
            loadingMessage.textContent = getRandomMessage();
        }
    
        if (currentMessageIndex === messages.length && progress >= 100) {
            clearInterval(loadingInterval);
            document.getElementById('loading').style.display = 'none';
            gameContainer.style.display = 'block';
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
        }, 5000);
    }
});
