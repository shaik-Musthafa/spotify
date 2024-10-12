const url = 'https://spotify-scraper.p.rapidapi.com/v1/chapter/details?episodeId=4VIm6jghrV0MfwwLyp1E7y';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '1d67de2a8cmsh059374442dd9ad5p108fe3jsnb7d85e439204',
		'x-rapidapi-host': 'spotify-scraper.p.rapidapi.com'
	}
};
async function fetchdata(   ) {
 
    try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    let container=document.getElementById("container")
    container.innerHTML=`<p>${result.name}</p>
    `
} catch (error) {
	console.error(error);
}
}
fetchdata()