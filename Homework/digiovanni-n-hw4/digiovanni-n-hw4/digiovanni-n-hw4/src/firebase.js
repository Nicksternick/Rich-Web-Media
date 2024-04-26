import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

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

const pushLikedParkToCloud = park => {
    park.likes = increment(1);
    const favRef = ref(db, `${likedParksPath}${park.hash}`);
    set(favRef, park); // `dog` is an object with `.title`, `.url`, `.likes` properties etc
};

// You might get awway with exporting fewer functions than this
export { db, likedParksPath, pushLikedParkToCloud, ref, set, push, onValue };