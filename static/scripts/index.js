document.getElementById("play-button").addEventListener("click", function() {
    // Set cheats to 0
    
    if(localStorage.getItem('cheats') === '1') {
        localStorage.setItem('cheats', '0');
    };
    localStorage.setItem('cheats', '0');

    window.location.href = "loadingbar.html";
});
