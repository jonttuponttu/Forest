document.getElementById("play-button").addEventListener("click", function() {
    fetch('assets/data/defaultValues.json')
        .then(response => response.json())
        .then(data => {
            // Loop over all items in the data
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];

                    // Convert the value to a string and add it to local storage
                    localStorage.setItem(key, value.toString());
                }
            }

            // Redirect to loadingbar.html
            window.location.href = "loadingbar.html";
        });
});
