document.getElementById("play-button").addEventListener("click", function() {
    fetch('assets/data/defaultValues.json')
        .then(response => response.json())
        .then(data => {
            // Loop over all items in the data
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];

                    // Check if the value is an object
                    if (typeof value === 'object' && value !== null) {
                        // Convert the object to a JSON string and add it to local storage
                        localStorage.setItem(key, JSON.stringify(value));
                    } else {
                        // Add the item to local storage
                        localStorage.setItem(key, value);
                    }
                }
            }

            // Redirect to loadingbar.html
            window.location.href = "loadingbar.html";
        });
});
