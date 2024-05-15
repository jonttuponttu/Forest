// cheater.js
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cheated = urlParams.get('cheated');

    if (cheated) {
        alert('Loadingbar Skipped!\nCheater!');
    }
});
