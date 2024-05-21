function keepHealthAtMax() {
    playerHealth = maxHealth;
}

function unlimitedHealth() {
    setInterval(keepHealthAtMax, 100);
}

//This keeps player health at the max.
