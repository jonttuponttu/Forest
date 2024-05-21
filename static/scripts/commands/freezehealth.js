function freezeHealth() {
    Object.defineProperty(player, 'health', {
        value: player.health,
        writable: false,
        configurable: true
    });
}

//This freezes the players health.
