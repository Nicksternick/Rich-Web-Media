// ===== | Imports | =====
import { fetchJson } from "./web-handler.ts"
import { randomInt } from "./utils.ts"

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
    [key: string]: string
}

// ===== | Variables | =====

// Important constistent variables
const KanjiAPI_URL: string = 'https://kanjiapi.dev/v1/';
const libraryKey: string = "kanji-library";
const loadingImgTag:string = "<img src='media/loading.gif' alt='downloading'>";

let kanjiList: string[];
let currentKanji: KanjiObject;
let kanjiLibrary: kanjiLibrary;

// Containers
let kanjiContainer: HTMLDivElement;
let libraryContainer: HTMLDivElement;
let chosenKanjiContainer: HTMLSpanElement;

// ===== | Methods | =====

/** initalizes the KanjiAPI, getting the kanji from local storage */
export const initKanjiAPI = () => {
    // Get a reference to the divContainer for the kanji
    kanjiContainer = document.querySelector('#container') as HTMLDivElement;
    libraryContainer = document.querySelector('#library-kanji') as HTMLDivElement;
    chosenKanjiContainer = document.querySelector('#chosen-kanji') as HTMLSpanElement;

    // ----- | Get the local storage of the browser | -----
    kanjiLibrary = {};

    // Parse the local storage of the page into a variable
    let storage: string | null = localStorage.getItem(libraryKey);

    // If storage is not null
    if (storage) {
        // Parse this information into the kanji library
        kanjiLibrary = JSON.parse(storage)

        updateLibrary();
    }

    // ----- | Initialize the kanjiList to be a list of all the kanji | -----
    let url: string = KanjiAPI_URL + `kanji/all`;

    fetchJson(url).then((response) => {
        kanjiList = response;

        loadRandomKanji();
    });
}

export const updateKanjiList = (newlist:string) => {
    let url: string = KanjiAPI_URL + newlist;

    fetchJson(url).then((response) => {
        kanjiList = response;
        
    }).catch(() => {
        console.log("Error Updating List, Make Sure Values Are Correct");
    });
}

export const saveKanji = () => {
    if (kanjiLibrary[currentKanji.kanji] == null)
    {
        kanjiLibrary[currentKanji.kanji] = currentKanji.kanji;
        updateLibrary();
        console.log(`Library Updated Successfully! ${kanjiLibrary[currentKanji.kanji]}`);

        localStorage.setItem(libraryKey, JSON.stringify(kanjiLibrary));
    }
}

export const removeKanji = () => {
    let index: string | undefined = chosenKanjiContainer.dataset.value;
    
    if (index)
    {
        delete kanjiLibrary[index];

        chosenKanjiContainer.dataset.value = "";
        chosenKanjiContainer.innerHTML = "";
        updateLibrary();

        localStorage.setItem(libraryKey, JSON.stringify(kanjiLibrary));
    }
}

export const searchKanji = () => {
    let kanji: string | undefined = chosenKanjiContainer.dataset.value;
    
    if (kanji)
    {
        loadNewKanji(kanji)
    }
}

const updateLibrary = () => {
    let newElement: string = "";

    for (let kanji in kanjiLibrary)
    {
        newElement += `<div class='library-item p-2'>${kanji}</div>`;
    }

    libraryContainer.innerHTML = newElement;

    let libraryItems = document.querySelectorAll('.library-item') as NodeListOf<HTMLDivElement>;

    libraryItems.forEach((kanji) => {
        kanji.addEventListener('click', () => {
            chosenKanjiContainer.dataset.value = kanji.innerHTML;
            chosenKanjiContainer.innerHTML = `${kanji.innerHTML} is selected.`;
        })
    })
}

// ----- | Load Kanji Functions | -----

/** Takes a kanji and the div container, 
 * load the file and adds it content in a list */
export const loadNewKanji = (kanji: string) => {
    // Create the url used for the fetch
    let url: string = KanjiAPI_URL + `kanji/${kanji}`

    kanjiContainer.innerHTML = loadingImgTag;

    // fetch the json, and continue if it succeeds
    fetchJson(url).then((response) => {
        // Set the current kanji to the newly aquired one
        currentKanji = response;

        // Prepare the information variables 
        let kanji:string = `<span>${currentKanji.kanji}</span>`;
        let stroke:string = `Stroke Count: ${currentKanji.stroke_count}`;
        let grade:string = "Grade: ";
        let jlpt:string = "JLPT: ";
        let kunReadings:string = "Kun Readings: ";
        let onReadings:string = "On Readings: ";
        let nameReadings:string = "Name Readings: ";
        let meanings:string = "Meanings: ";
        
        // ----- | Check to make sure properties aren't null or empty | -----
        grade += currentKanji.grade != null? currentKanji.grade.toString() : "None";

        jlpt += currentKanji.jlpt != null? currentKanji.jlpt.toString() : "None";

        if (currentKanji.kun_readings.length != 0)
        {
            kunReadings += currentKanji.kun_readings.join(', ');
        }
        else
        {
            kunReadings += "None"
        }

        if (currentKanji.on_readings.length != 0)
        {
            onReadings += currentKanji.on_readings.join(', ');
        }
        else
        {
            onReadings += "None"
        }

        if (currentKanji.name_readings.length != 0)
        {
            nameReadings += currentKanji.name_readings.join(', ');
        }
        else
        {
            nameReadings += "None"
        }

        if (currentKanji.meanings.length != 0)
        {
            meanings += currentKanji.meanings.join(', ');
        }
        else
        {
            meanings += "None"
        }

        // Create a new unordered list and fill it with the contents
        let newElement: string = `<ul>`;
        newElement += `<li>${stroke}</li>`;
        newElement += `<li>${grade}</li>`;
        newElement += `<li>${jlpt}</li>`;
        newElement += `<li>${kunReadings}</li>`;
        newElement += `<li>${onReadings}</li>`;
        newElement += `<li>${nameReadings}</li>`;
        newElement += `<li>${meanings}</li>`;
        newElement += `</ul>`;

        // Set the containers contents equal to the new elements
        kanjiContainer.innerHTML = kanji + newElement;
    });
}

export const loadRandomKanji = () => {
    // Get a random number
    let index: number = randomInt(0, kanjiList.length - 1);

    // display a random Kanji
    loadNewKanji(kanjiList[index]);
}