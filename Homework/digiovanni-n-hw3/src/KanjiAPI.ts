// ===== | Imports | =====
import { fetchJson } from "./WebHandler.js"

// ===== | Interfaces | =====

/** Object that is given by the kanji api */
interface KanjiObject {
    grade:number,
    jlpt:number,
    kanji:string,
    kun_readings:string[],
    meanings:string[],
    name_readings:string[],
    on_readings:string[],
    stroke_count:number
}

interface kanjiLibrary{
    [key:string]: KanjiObject
}

// ===== | Variables | =====

const KanjiAPI_URL:string = 'https://kanjiapi.dev/v1/';
const libraryKey:string = "kanji-library";

let kanjiList:string[];
let currentKanji:KanjiObject;
let kanjiLibrary:kanjiLibrary

// ===== | Methods | =====
export const fetch = () => {
    fetchJson("https://kanjiapi.dev/v1/kanji/金").then((response) => {
        currentKanji = response;
        console.log(currentKanji.kun_readings);
    });
}

/** initalizes the KanjiAPI, getting the kanji from local storage */
const initKanjiAPI = () => 
{
    // Parse the local storage of the page into a variable
    let storage: string | null = localStorage.getItem(libraryKey);

    // If storage is not null
    if (storage)
    {
        // Parse this information into the kanji library
        kanjiLibrary = JSON.parse(storage)
    }
}

/** Takes a kanji string, and sets that as the current kanji */
const getKanjiFromLibrary = (kanji:string) => {
    if (kanjiLibrary[kanji] != null)
    {
        currentKanji = kanjiLibrary[kanji]
    }
}