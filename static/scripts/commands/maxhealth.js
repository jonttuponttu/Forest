function freezeHealth() {
    Object.defineProperty(player, 'health', {
        value: player.maxHealth,
        writable: false,
        configurable: true
    });
}

//This freezes the players health.
