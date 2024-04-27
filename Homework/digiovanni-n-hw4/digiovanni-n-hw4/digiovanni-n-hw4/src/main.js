import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js"
import * as firebase from "./firebase.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];

const key = "nsd3407-330-hw4";

let favoriteIds = ["p20", "p79", "p180", "p43"];

let geojson;

// II. Functions
const setupUI = () => {
    // NYS Zoom 5.2
    document.querySelector("#btn1").onclick = () => {
        map.setZoomLevel(5.2);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatNYS);
    }

    // NYS isometric view
    document.querySelector("#btn2").onclick = () => {
        map.setZoomLevel(5.5);
        map.setPitchAndBearing(45, 0);
        map.flyTo(lnglatNYS);
    }

    // World zoom 0
    // NYS isometric view
    document.querySelector("#btn3").onclick = () => {
        map.setZoomLevel(3);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatUSA);
    }
}

const init = () => {
    map.initMap(lnglatNYS);
    ajax.downloadFile("data/parks.geojson", (str) => {
        geojson = JSON.parse(str);
        console.log(geojson);
        map.addMarkersToMap(geojson, showFeatureDetails)
        setupUI();

        // Init Local Storage
        
        favoriteIds = storage.readFromLocalStorage(key);
        if (favoriteIds == null) { favoriteIds = []; }
        refreshFavorites();
    });
};

const getFeatureById = (id) => {
    for (let obj of geojson.features) {
        if (obj.id == id) {
            return obj;
        }
    }
}

const showFeatureDetails = (id) => {
    const feature = getFeatureById(id);

    const details1 = document.querySelector("#details-1");
    const details2 = document.querySelector("#details-2");
    const details3 = document.querySelector("#details-3");

    // Create the buttons
    let btnFavorite = document.createElement('button');
    let btnDelete = document.createElement('button');

    btnFavorite.addEventListener('click', () => { favoritePlace(id) });
    btnDelete.addEventListener('click', () => { deletePlace(id) });

    // Set up the favorites and delete buttons classes
    btnFavorite.classList.add("button");
    btnFavorite.classList.add("has-background-primary");
    btnFavorite.innerHTML = "Favorite";
    btnDelete.classList.add("button");
    btnDelete.classList.add("has-background-warning");
    btnDelete.innerHTML = "Delete";

    // Depending on whether the location is
    // favorited disable one of the buttons
    if (favoriteIds.includes(id)) {
        btnFavorite.disabled = true;
    }
    else {
        btnDelete.disabled = true;
    }

    let container = document.createElement('p');
    container.appendChild(btnFavorite)
    container.appendChild(btnDelete);

    details1.innerHTML = `Info for ${feature.properties.title}`;
    details2.innerHTML =
        `<p><b>Address: </b>${feature.properties.address}</p>
		<p><b>Phone: </b><a href="tel:${feature.properties.phone}">${feature.properties.phone}</a></p>
		<p><b>Website: </b><a href="${feature.properties.url}">${feature.properties.url}</a></p>`;
    details2.appendChild(container);
    details3.innerHTML = feature.properties.description;
};

const refreshFavorites = () => {
    const favoritesContainer = document.querySelector("#favorites-list");
    favoritesContainer.innerHTML = "";
    for (const id of favoriteIds) {
        favoritesContainer.appendChild(createFavoriteElement(id));
    }
}

const createFavoriteElement = (id) => {
    const feature = getFeatureById(id);
    const a = document.createElement("a");
    a.className = "panel-block";
    a.id = feature.id;
    a.onclick = () => {
        showFeatureDetails(a.id);
        map.setZoomLevel(6);
        map.flyTo(feature.geometry.coordinates);
    };
    a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}`;
    return a;
}

// ===== | New Functions | =====

const favoritePlace = (id) => {
    if (!favoriteIds.includes(id)) {
        favoriteIds.push(id);
        refreshFavorites();
        showFeatureDetails(id);
        storage.writeToLocalStorage(key, favoriteIds);
        firebase.editParkLike(id, 1);
    }
}

const deletePlace = (id) => {
    if (favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter(def => def != id);
        refreshFavorites();
        showFeatureDetails(id);
        storage.writeToLocalStorage(key, favoriteIds);
        firebase.editParkLike(id, -1);
    }
}

// ===== | ============= | =====

init();