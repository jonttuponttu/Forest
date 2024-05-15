// Define the inventory array to store items
let inventory = [];

// Function to add an item to the inventory
function addItem(name, description, quantity = 1) {
    // Check if the item already exists in the inventory
    let existingItemIndex = inventory.findIndex(item => item.name === name);
    if (existingItemIndex !== -1) {
        // If the item exists, increase its quantity
        inventory[existingItemIndex].quantity += quantity;
    } else {
        // If the item doesn't exist, add it to the inventory
        inventory.push({ name, description, quantity });
    }
    // Update the inventory display
    updateInventory();
}

// Function to update the inventory display
function updateInventory() {
    let itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
    inventory.forEach((item, index) => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = `${item.name} (${item.quantity}) - ${item.description}`;
        // Add click event listener to each item
        itemElement.addEventListener('click', () => {
            // Example: Show an alert with item information
            alert(`You examine the ${item.name}: ${item.description}`);
        });
        itemsContainer.appendChild(itemElement);
    });
}

// Function to perform an action with the inventory
function performInventoryAction() {
    // Placeholder function, replace with actual functionality
    alert('You used an item from your inventory.');
}

// Simulate loading process from 0% to 100%
let loadingProgress = 0;
let loadingInterval = setInterval(() => {
    loadingProgress++;
    if (loadingProgress > 100) {
        // Stop the loading animation when it reaches 100%
        clearInterval(loadingInterval);
        // Hide the loading screen and show the game content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        // Display the inventory
        document.getElementById('inventory-modal').style.display = 'block'; // Corrected ID
    } else {
        // Update the loading progress bar
        document.getElementById('loading-progress').style.width = loadingProgress + '%';
        // Update the loading text with the current progress
        document.getElementById('loading-text').textContent = `Loading... ${loadingProgress}%`;
        // Add descriptive loading messages
        if (loadingProgress === 25) {
            document.getElementById('loading-text').textContent += ' - Loading shaders...';
        } else if (loadingProgress === 50) {
            document.getElementById('loading-text').textContent += ' - Loading terrain...';
        } else if (loadingProgress === 75) {
            document.getElementById('loading-text').textContent += ' - Loading items functions...';
        } else if (loadingProgress === 100) {
            document.getElementById('loading-text').textContent += ' - Loading monster...';
        }
    }
}, 100); // Adjust the interval duration (in milliseconds) for smoother or faster animation

// Movement button event listener
document.getElementById('movement-button').addEventListener('click', () => {
    // Toggle  the active state of the movement button
    document.getElementById('movement-button').classList.toggle('active');
    // Display movement options when the button is clicked
    document.getElementById('movement-options').style.display = 'block';
});

// Movement option event listeners
document.getElementById('forward-button').addEventListener('click', () => {
    // Implement movement logic for moving forward
    console.log('Move forward');
    // Hide movement options after selecting an option
    document.getElementById('movement-options').style.display = 'none';
    // Remove the active state from the movement button
    document.getElementById('movement-button').classList.remove('active');
});

document.getElementById('turn-left-button').addEventListener('click', () => {
    // Implement movement logic for turning left
    console.log('Turn left');
    // Hide movement options after selecting an option
    document.getElementById('movement-options').style.display = 'none';
    // Remove the active state from the movement button
    document.getElementById('movement-button').classList.remove('active');
});

document.getElementById('turn-right-button').addEventListener('click', () => {
    // Implement movement logic for turning right
    console.log('Turn right');
    // Hide movement options after selecting an option
    document.getElementById('movement-options').style.display = 'none';
    // Remove the active state from the movement button
    document.getElementById('movement-button').classList.remove('active');
});

// Inventory button event listener
document.getElementById('inventory-button').addEventListener('click', () => {
    // Show the inventory modal when the button is clicked
    document.getElementById('inventory-modal').style.display = 'block';
});

// Close modal when the close button or outside the modal is clicked
let modal = document.getElementById('inventory-modal');
let closeButton = document.getElementsByClassName('close')[0];
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
closeButton.onclick = function() {
    modal.style.display = 'none';
};
