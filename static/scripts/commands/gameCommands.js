var Game = {
    AddToInventory: function(item, amount) {
        // Split the item string into item type and item name
        var itemParts = item.split(".");
        var itemType = itemParts[0];
        var itemName = itemParts[1];

        function addToLocalStorage(itemType, itemName, amount) {
            // Get the current player data from local storage
            var player = JSON.parse(localStorage.getItem("player"));

            // Check if player data exists in local storage
            if (player) {
                // Update the inventory for the specified item
                if (player[itemType][itemName]) {
                    player[itemType][itemName] = (parseInt(player[itemType][itemName]) + amount).toString();
                } else {
                    player[itemType][itemName] = amount.toString();
                }

                // Save the updated player data back to local storage
                localStorage.setItem("player", JSON.stringify(player));
            }
        }

        // Call the function to add the item to the inventory
        addToLocalStorage(itemType, itemName, amount);
    }
};
