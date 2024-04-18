import * as storage from "./storage.js"
let items = ["???!!!"];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
    // loop though items and stick each array element into an <li>
    // use array.map()!
    const liItems = items.map(item => { return `<li>${item}</li>` });

    const list = document.querySelector("ol")
    // update the innerHTML of the <ol> already on the page
    list.innerHTML = "";
    list.innerHTML = liItems.join('');
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {
    if (str.length > 0)
    {
        items.push(str);
    }
};

const buttonAdd = document.querySelector("#btn-add");
const buttonClear = document.querySelector("#btn-clear");

// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`
buttonAdd.addEventListener('click', () => {
    const input = document.querySelector("#thing-text");
    addItem(input.value);
    showItems();
    input.value = "";
    storage.writeToLocalStorage("items",items)
});

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array
items = storage.readFromLocalStorage("items");

if (Array.isArray(items))
{
    showItems();
}
else
{
    items = [];
    showItems();
}

// Got it working? 
// - Add a "Clear List" button that empties the items array
buttonClear.addEventListener('click', () => {
    items = [];
    showItems();
    storage.writeToLocalStorage("items",items)
});
