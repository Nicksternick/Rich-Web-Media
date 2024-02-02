// Imports
import { randomElement } from "./utils.js";

// Variables
let words1;
let words2;
let words3;

// Methods
const LoadBabble = () =>
{
	const url = "data/babble-data.json";
	const xhr = new XMLHttpRequest();
	xhr.onload = babbleLoaded;
	xhr.onerror = (e) => console.log(`Error - Code: ${e.target.responseText}`);
	xhr.open("GET", url);
	xhr.send();
}

const babbleLoaded = (e) =>
{
	const text = e.target.responseText;
	const json = JSON.parse(text);

	words1 = json.words1;
	words2 = json.words2;
	words3 = json.words3;

	generateTechno(1);
	document.querySelector("#babble-btn-1").addEventListener("click", () => generateTechno(1));
	document.querySelector("#babble-btn-2").addEventListener("click", () => generateTechno(5));
}

const generateTechno = (num) =>
{
	document.querySelector("#output").innerHTML = "";
	for (let i = 0; i < num; i++)
	{
		document.querySelector("#output").innerHTML += 
		`<p>${randomElement(words1)}
		${randomElement(words2)}
		${randomElement(words3)}</p>`;
	}
}

window.onload = () => 
{
	LoadBabble();
}