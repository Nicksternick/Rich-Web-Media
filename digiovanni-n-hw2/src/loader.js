import * as main from "./main.js";

// 1 - do preload here - load fonts, images, additional sounds, etc...

let appName;
let songs;
let visualizers;

let defaultFill;
let defaultStroke;

const url = "data/av-data.json";
const xhr = new XMLHttpRequest();
xhr.onload = (e) => {
    console.log(`In onload - HTTPS Status Code = ${e.target.status}`);
    const text = e.target.responseText;
    const json = JSON.parse(text);

    const appName = json.name;
    const songs = json.songs;
    const colors = json.colors;

    defaultFill = json.defaultFill;
    defaultStroke = json.defaultStroke;

    document.querySelector("title").innerHTML = appName;
    document.querySelector("header h1").innerHTML = appName;

    let options = songs.map(songData => (
        `<option value="${songData.link}">${songData.name}</option>`));

    options[0] = `<option value="${songs[0].link}" selected">${songs[0].name}</option>`;

    options.forEach(song => {
        document.querySelector("#select-song").innerHTML += song;
    });

    let colorOptions = "";

    for (let color of colors)
    {
        if (color.color != defaultStroke)
        {
            colorOptions += `<option value="${color.color}">${color.name}</option>`;
        }
        else
        {
            colorOptions += `<option value="${color.color}" selected>${color.name}</option>`;
        }
    }

    const colorSelectors = document.querySelectorAll(".colors");

    for (let selectors of colorSelectors)
    {
        selectors.innerHTML = colorOptions;
    }
    
    // 2 - start up app
    main.init(defaultFill, defaultStroke);
};
xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
xhr.open("GET", url);
xhr.send();


