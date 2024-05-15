class LoadingBar {
    constructor(loadingProgress, loadingMessage, skipButton) {
        this.startTime = Date.now();
        this.currentMessageIndex = 0;
        this.progress = 0;
        this.messages = [
            'Building Terrain',
            'Generating Rocks',
            'Loading Assets',
            'Generating Mobs',
            'Growing Trees',
            'Enabling GOD'
        ];
        this.durations = [3000, 7000, 5000, 1000, 10000, 500]; // durations in milliseconds
        this.loadingProgress = loadingProgress;
        this.loadingMessage = loadingMessage;
        this.skipButton = skipButton;
        this.skipSequence = ['s', 'k', 'i', 'p'];
        this.skipIndex = 0;
    }
    
    getRandomDuration() {
        return this.durations[Math.floor(Math.random() * this.durations.length)];
    }

    start() {
        let currentDuration = this.getRandomDuration();
        const loadingInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;

            // Calculate progress based on time elapsed
            this.progress = Math.min(100, (elapsed / currentDuration) * 100);

            this.loadingProgress.style.width = this.progress + '%';

            // Display the current message with the calculated progress
            this.loadingMessage.textContent = `${this.messages[this.currentMessageIndex]} ${Math.floor(this.progress)}%`;

            if (this.progress >= 100) {
                // If progress reaches 100%, move to the next message
                this.currentMessageIndex++;

                // If all messages have been displayed, stop the loading animation and redirect to game.html
                if (this.currentMessageIndex >= this.messages.length) {
                    clearInterval(loadingInterval);
                    window.location.href = 'game.html';
                } else {
                    // Reset start time for the next message
                    this.startTime = Date.now();
                    this.progress = 0;
                    currentDuration = this.getRandomDuration();
                }
            }
        }, 100);

        // Listen for keydown event
        window.addEventListener('keydown', (event) => {
            // Check if the correct key in the sequence was pressed
            if (event.key.toLowerCase() === this.skipSequence[this.skipIndex]) {
                this.skipIndex++;

                // If the entire sequence has been typed, skip the loading scene
                if (this.skipIndex === this.skipSequence.length) {
                    clearInterval(loadingInterval);
                    localStorage.setItem('cheated', 'true'); // Store the cheat status in the local storage
                    localStorage.setItem('cheats', '1');
                    window.location.href = 'game.html';
                }
            } else {
                this.skipIndex = 0;
            }
        });
    }
}

// Create an instance of LoadingBar and start it when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    const loadingProgress = document.querySelector('#loading-progress');
    const loadingMessage = document.querySelector('#loading-message');
    const loadingBar = new LoadingBar(loadingProgress, loadingMessage); // Modify this line
    loadingBar.start();
});
