import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";




const firebaseConfig = {
    apiKey: "AIzaSyB_a-IBjec2YO1YOPXzK5rvpIcrSCoirQM",
    authDomain: "sharjeel-askhubblog.firebaseapp.com",
    databaseURL: "https://sharjeel-askhubblog-default-rtdb.firebaseio.com",
    projectId: "sharjeel-askhubblog",
    storageBucket: "sharjeel-askhubblog.appspot.com",
    messagingSenderId: "560312151937",
    appId: "1:560312151937:web:9eca5cdcf0ac0a8dd1c280",
    measurementId: "G-78RKJ44Z1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, db, setDoc, doc, collection, addDoc
}

