import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment, get, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNftlNc9gv4xoU94BpjopMQ8IWEsoZKQc",
    authDomain: "park-favorites-91185.firebaseapp.com",
    projectId: "park-favorites-91185",
    storageBucket: "park-favorites-91185.appspot.com",
    messagingSenderId: "255344641400",
    appId: "1:255344641400:web:59c0fb8913c4c1fd73348d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

const likedParksPath = "df-liked-parks/";

const editParkLike = (park, amount) => {
    let favRef = ref(db, likedParksPath + park);

    get(favRef).then(snapshot => {
        let favorite;
        if (snapshot.exists()) {
            // if it's already in "favorites/" - update the number of likes
            favorite = snapshot.val();
            console.log("found - current values=", favorite);
            const likes = favorite.likes + amount;

            console.log(favorite.likes);
            console.log(amount);

            const newData = {
                park,
                likes
            };
            const updates = {};
            updates[likedParksPath + park] = newData;
            update(ref(db), updates);
        } else {
            // if it does not exist, add to "mostFavorited/"
            console.log(`No favorite of key='${park}' found`);
            console.log("favorite=", favorite);
            set(favRef, {
                park,
                likes: Math.max(1, amount)
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}

const incrementParkLike = park => {
    console.log(park);
    park.likes = increment(1);
    const favRef = ref(db, `${likedParksPath}${park.hash}`);
    set(favRef, park); // `dog` is an object with `.title`, `.url`, `.likes` properties etc
};

const decrementParkLike = park => {
    console.log(park);
    park.likes = increment(-1);
    const favRef = ref(db, `${likedParksPath}${park.hash}`);
    set(favRef, park); // `dog` is an object with `.title`, `.url`, `.likes` properties etc
};

// You might get awway with exporting fewer functions than this
export { db, likedParksPath, incrementParkLike, decrementParkLike, editParkLike, ref, set, push, onValue };