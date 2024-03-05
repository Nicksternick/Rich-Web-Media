import * as main from "./main.js";

// 1 - do preload here - load fonts, images, additional sounds, etc...

let appName;
let songs;
let visualizers;

const url = "data/av-data.json";
const xhr = new XMLHttpRequest();
xhr.onload = (e) => {
    console.log(`In onload - HTTPS Status Code = ${e.target.status}`);
    const text = e.target.responseText;
    const json = JSON.parse(text);

    const appName = json.name;
    const songs = json.songs;
    const visualizers = json.visualizers;

    document.querySelector("title").innerHTML = appName;
    document.querySelector("header h1").innerHTML = appName;

    let options = songs.map(songData => (
        `<option value="${songData.link}">${songData.name}</option>`));

    options[0] = `<option value="${songs[0].link}" selected">${songs[0].name}</option>`;

    options.forEach(song => {
        document.querySelector("#select-song").innerHTML += song;
    });
};
xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
xhr.open("GET", url);
xhr.send();

// 2 - start up app
main.init();