// ===== | Imports | =====
import * as kanjiApi from "./kanjiAPI.ts"

// ===== | Functions | =====

const init = () => {
    const kanjiInput = document.querySelector("#input-kanji") as HTMLInputElement;
    const kanjiGetButton = document.querySelector("#btn-get-kanji") as HTMLButtonElement;
    const kanjiRandomButton = document.querySelector("#btn-random-kanji") as HTMLButtonElement;
    const kanjiSaveButton = document.querySelector("#btn-save-kanji") as HTMLButtonElement;
    const kanjiSearchButton = document.querySelector("#btn-search-kanji") as HTMLButtonElement;
    const kanjiRemoveButton = document.querySelector("#btn-remove-kanji") as HTMLButtonElement;
    const kanjiListSelect = document.querySelector("#select-list-kanji") as HTMLSelectElement;
    
    kanjiGetButton.addEventListener('click', () => {
        if (kanjiInput.value != "")
        {
            kanjiApi.loadNewKanji(kanjiInput.value);
        }
    });

    kanjiRandomButton.addEventListener('click', () => {
        kanjiApi.loadRandomKanji();
    });

    kanjiSaveButton.addEventListener('click', () => {
        kanjiApi.saveKanji();
    });

    kanjiSearchButton.addEventListener('click', () => {
        kanjiApi.searchKanji();
    });

    kanjiRemoveButton.addEventListener('click', () => {
        kanjiApi.removeKanji();
    });

    kanjiListSelect.addEventListener('change', () => {
        kanjiApi.updateKanjiList(kanjiListSelect.value);
    });

    // Call init function
    kanjiApi.initKanjiAPI();
}

// ===== | Call Init | =====
init();
