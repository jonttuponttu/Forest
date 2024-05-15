document.addEventListener('DOMContentLoaded', (event) => {
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    const resumeButton = document.getElementById('resume-button');

    // Save game state
    saveButton.addEventListener('click', () => {
        const gameState = {};

        // Loop over all items in local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            // Add the item to the game state
            gameState[key] = value;
        }

        // Convert the game state to a JSON string
        const gameStateStr = JSON.stringify(gameState);

        // Create a Blob object representing the game state
        const blob = new Blob([gameStateStr], {type: 'application/json'});

        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'forest-savegame.json';

        // Append the link to the body
        document.body.appendChild(link);

        // Simulate a click on the link
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
    });

    // Load game state
    loadButton.addEventListener('click', () => {
        // Create an input element
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (event) => {
                // Parse the JSON string
                const gameState = JSON.parse(event.target.result);

                // Loop over all items in the game state
                for (const key in gameState) {
                    if (gameState.hasOwnProperty(key)) {
                        const value = gameState[key];

                        // Add the item to local storage
                        localStorage.setItem(key, value);
                    }
                }
            };

            reader.readAsText(file);
        });

        // Simulate a click on the input
        input.click();
    });

    // Resume game
    resumeButton.addEventListener('click', () => {
        window.location.href = "game.html"; // Assuming your game file is named game.html
    });
});
