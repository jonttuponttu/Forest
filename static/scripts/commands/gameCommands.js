var Game = {
    AddToInventory: function(item, amount) {
        function addToLocalStorage(item, amount) {
            // Get the current player data from local storage
            var player = JSON.parse(localStorage.getItem("player"));

            // Check if player data exists in local storage
            if (player) {
                // Update the inventory for the specified item
                if (item === "money") {
                    player.money = (parseInt(player.money) + amount).toString();
                } else {
                    if (player.inventory[item]) {
                        player.inventory[item] = (parseInt(player.inventory[item]) + amount).toString();
                    } else {
                        player.inventory[item] = amount.toString();
                    }
                }

                // Save the updated player data back to local storage
                localStorage.setItem("player", JSON.stringify(player));
            }
        }

        // Call the function to add the item to the inventory
        addToLocalStorage(item, amount);
    }
};
