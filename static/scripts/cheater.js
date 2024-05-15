// cheater.js
window.addEventListener('DOMContentLoaded', () => {
    const cheated = localStorage.getItem('cheated');

    if (cheated) {
        setTimeout(() => {
            alert('Loadingbar Skipped!\nCheater!');
            localStorage.removeItem('cheated'); // Remove the cheat status from the local storage
        }, 1000); // Delay of 1 second
    }
});
