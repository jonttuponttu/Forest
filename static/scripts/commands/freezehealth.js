function freezeHealth() {
    const player = {
        health: 100,
        maxHealth: 100
    };

    Object.defineProperty(player, 'health', {
        value: player.maxHealth,
        writable: false,
        configurable: true
    });

    console.log('Player health is now frozen at', player.maxHealth);
}

freezeHealth();

export { freezeHealth };
