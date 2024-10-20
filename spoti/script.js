document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = document.getElementById("searchInput").value; // Get the search input value
    if (searchTerm) {
        fetchTracks(searchTerm); // Pass the search term to the API request
    }
});

// Function to fetch data from the API
async function fetchTracks(query) {
    const url = 'https://spotify-scraper2.p.rapidapi.com/search_all';
    const data = new FormData();
    data.append('query', query); // Use the search term entered by the user
    data.append('type', 'track');
    data.append('limit', '5');

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '3820a6b453msh24329ce78bc43fep124d5djsn20ae28943bd1',
            'x-rapidapi-host': 'spotify-scraper2.p.rapidapi.com'
        },
        body: data
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("API response:", result); // Log the result for debugging

        // Display result in the songinfo div
        const resultDiv = document.getElementById("songinfo");
        resultDiv.style.display = 'block'; // Show the div

        // Ensure we access the correct path to items: result.tracks.items
        if (result && result.tracks && result.tracks.items && result.tracks.items.length > 0) {
            resultDiv.innerHTML = result.tracks.items.map(track => `
                <h3 style="color:white">${track.track_name || "No Name Available"}</h3>
                <p style="color:white"><strong>Artist:</strong> ${track.artists[0]?.name || "No Artist Info"}</p>
                <p style="color:white"><strong>Duration:</strong> ${(track.duration_ms / 1000).toFixed(2) + " seconds" || "No Duration"}</p>
                <p style="color:white"><strong>Album:</strong> ${track.album.name || "No Album Info"}</p>
                <audio controls style="width: 250px;">
                    <source src="${track.preview_url || ''}" type="audio/mpeg">
                </audio>
                <hr>
            `).join(''); // Loop through all tracks and display their details
        } else {
            resultDiv.innerHTML = '<p style="color:white">No tracks found for the given search term.</p>';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById("songinfo").innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
        document.getElementById("songinfo").style.display = "block";
    }
}
