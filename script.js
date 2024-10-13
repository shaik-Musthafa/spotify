async function fetchData(episodeId) {
  const url = `https://spotify-scraper.p.rapidapi.com/v1/chapter/details?episodeId=${episodeId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1d67de2a8cmsh059374442dd9ad5p108fe3jsnb7d85e439204",
      "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
    },
  };

  const resultDiv = document.getElementById("songinfo");
  resultDiv.innerHTML = '<p class="loading">Loading...</p>';
  try {
    const response = await fetch(url, options);
    const result = await response.json(); 
    console.log(result);
    resultDiv.innerHTML = `
                    <h3>${result.title || "Unknown Title"}</h3>
                    <p>Duration: ${result.duration || "Unknown"} minutes</p>
                    <p>Description: ${
                      result.description || "No description available."
                    }</p>
                    <p>Release Date: ${result.releaseDate || "Unknown"}</p>
                `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML =
      '<p class="error">Error fetching data. Please try again later.</p>'; 
  }
}
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault(); 
  const input = document.getElementById("searchInput").value; 
  console.log("Searching for Episode ID:", input); 
  fetchData(input);
});
