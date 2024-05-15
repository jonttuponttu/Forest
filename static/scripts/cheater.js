// cheater.js
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cheated = urlParams.get('cheated');

    if (cheated) {
        setTimeout(() => {
            alert('Loadingbar Skipped!\nCheater!');
        }, 1000); // Delay of 1 second
    }
});
