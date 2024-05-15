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

export function startLoadingBar(loadingProgress, loadingMessage) {
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

            // If all messages have been displayed, stop the loading animation
            if (currentMessageIndex >= messages.length) {
                clearInterval(loadingInterval);
            } else {
                // Reset start time for the next message
                startTime = Date.now();
                progress = 0;
            }
        }
    }, 100);
}
