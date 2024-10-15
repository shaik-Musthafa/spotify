function createPlaylist() {
  const name = document.getElementById("playlistName").value;
  const desc = document.getElementById("playlistDesc").value;

  if (name) {
    alert(`Playlist "${name}" created!`);
    document.getElementById("playlistForm").reset();
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("playlistModal")
    );
    modal.hide();
  } else {
    alert("Please enter a playlist name.");
  }
}
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const currentTheme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";
  localStorage.setItem("theme", currentTheme);
}
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
};

async function fetchdata() {
  const url =
    "https://spotify-scraper.p.rapidapi.com/v1/chapter/details?episodeId=4VIm6jghrV0MfwwLyp1E7y";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1d67de2a8cmsh059374442dd9ad5p108fe3jsnb7d85e439204",
      "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const container = document.getElementById("container3");
    container.innerHTML = `
          <h3 style="color: white;">${result.name}</h3>
          <p style="color: white;">Duration: ${result.duration} minutes</p>
          <p style="color: white;">Description: ${result.description}</p>
        `;
  } catch (error) {
    console.error(error);
  }
}

function loadLibraryContent() {
  const iframe = document.querySelector("iframe[name='browse1']");
  iframe.src = "./library.html";
}
