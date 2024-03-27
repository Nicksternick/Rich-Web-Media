// Imports
import { randomElement } from "./utils.js";

// Variables
let words1;
let words2;
let words3;

// Methods

// loadBabble(): use http requester to get the data
const loadBabble = () =>
{
	// Link to the JSON info
	const url = "data/babble-data.json";
	// Create a new XMLHttpRequest
	const xhr = new XMLHttpRequest();
	// call babbleLoaded is the loading was a success
	xhr.onload = babbleLoaded;
	// Throw an errror if it fails to get the info
	xhr.onerror = (e) => console.log(`Error - Code: ${e.target.responseText}`);

	// Attemp to get the url
	xhr.open("GET", url);
	xhr.send();
}

// babbleLoaded(): setup the babble functions to work with the webpage
const babbleLoaded = (e) =>
{
	// Set the text to the JSON info, and parse it
	const text = e.target.responseText;
	const json = JSON.parse(text);

	// Fill each list with each array of words
	words1 = json.words1;
	words2 = json.words2;
	words3 = json.words3;

	// Generate one line of techno on startup
	generateTechno(1);

	// get each button and assign then the generateTechno() method with a number of techno to generate
	document.querySelector("#babble-btn-1").addEventListener("click", () => generateTechno(1));
	document.querySelector("#babble-btn-2").addEventListener("click", () => generateTechno(5));
}

// generatetechno(num): takes in a number and then generates that much techno babble 
const generateTechno = (num) =>
{
	// Clear the innerHTML of #output so we can put new stuff in it
	document.querySelector("#output").innerHTML = "";

	// For each work that wants to be generated
	for (let i = 0; i < num; i++)
	{
		//Add a new series of new techno babble
		document.querySelector("#output").innerHTML += 
		`<p>${randomElement(words1)}
		${randomElement(words2)}
		${randomElement(words3)}</p>`;
	}
}

// Call loadbabble 
// when the page is loaded
loadBabble();