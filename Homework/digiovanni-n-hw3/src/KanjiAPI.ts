// ===== | Imports | =====
import { createElement } from "react";
import { fetchJson } from "./WebHandler.js"

// ===== | Interfaces | =====

/** Object that is given by the kanji api */
interface KanjiObject {
    grade: number,
    jlpt: number,
    kanji: string,
    kun_readings: string[],
    meanings: string[],
    name_readings: string[],
    on_readings: string[],
    stroke_count: number
}

interface kanjiLibrary {
    [key: string]: KanjiObject
}

// ===== | Variables | =====

const KanjiAPI_URL: string = 'https://kanjiapi.dev/v1/';
const libraryKey: string = "kanji-library";

let kanjiList: string[];
let currentKanji: KanjiObject;
let kanjiLibrary: kanjiLibrary

// ===== | Methods | =====

/** initalizes the KanjiAPI, getting the kanji from local storage */
const initKanjiAPI = () => {
    // Parse the local storage of the page into a variable
    let storage: string | null = localStorage.getItem(libraryKey);

    // If storage is not null
    if (storage) {
        // Parse this information into the kanji library
        kanjiLibrary = JSON.parse(storage)
    }
}

/** Takes a kanji and the div container, 
 * load the file and adds it content in a list */
export const loadNewKanji = (kanji: string, divContainer: string) => {
    // Create the url used for the fetch
    let url:string = KanjiAPI_URL + `kanji/${kanji}`

    // fetch the json, and continue if it succeeds
    fetchJson(url).then((response) => {
        // Get the container for the kanji
        let container = document.querySelector(divContainer) as HTMLDivElement;

        // Set the current kanji to the newly aquired one
        currentKanji = response;

        // Create a new unordered list and fill it with the contents
        let newElement: string = `<ul>`;
        newElement += `<li>${currentKanji.kanji}</li>`;
        newElement += `<li>${currentKanji.grade}</li>`;
        newElement += `<li>${currentKanji.jlpt}</li>`;
        newElement += `<li>${currentKanji.kun_readings}</li>`;
        newElement += `<li>${currentKanji.on_readings}</li>`;
        newElement += `<li>${currentKanji.name_readings}</li>`;
        newElement += `<li>${currentKanji.meanings}</li>`;
        newElement += `<li>${currentKanji.stroke_count}</li>`;
        newElement += `</ul>`;

        // Set the containers contents equal to the new elements
        container.innerHTML = newElement;
    });
}

/** Takes a kanji string, and sets that as the current kanji */
const getKanjiFromLibrary = (kanji: string) => {
    if (kanjiLibrary[kanji] != null) {
        currentKanji = kanjiLibrary[kanji]
    }
}