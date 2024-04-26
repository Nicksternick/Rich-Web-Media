import * as firebase from "./firebase.js";

// ===== | Variables | =====
const parks = {
    "p79": "Letchworth State Park",
    "p20": "Hamlin Beach State Park",
    "p180": "Brookhaven State Park",
    "p35": "Allan H. Treman State Marine Park",
    "p118": "Stony Brook State Park",
    "p142": "Watkins Glen State Park",
    "p62": "Taughannock Falls State Park",
    "p84": "Selkirk Shores State Park",
    "p43": "Chimney Bluffs State Park",
    "p200": "Shirley Chisholm State Park",
    "p112": "Saratoga Spa State Park"
};

const init = () => {
    const  db = firebase.db;
    const favoriteRef = firebase.ref(db, firebase.likedParksPath);
    firebase.onValue(favoriteRef, favoritesChanged);
};

const favoritesChanged = (snapshot) => {
    const list = document.querySelector("#favorite-list");
    snapshot.forEach(fav => {
        const childKey = fav.key;
        const childData = fav.val();
        console.log(childKey, childData);
    });
};