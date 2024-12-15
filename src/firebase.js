import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs2oW14BkKaRa8tOIkJsWXEvNFl2D6j4w",
  authDomain: "power-monotoring.firebaseapp.com",
  databaseURL: "https://power-monotoring-default-rtdb.firebaseio.com",
  projectId: "power-monotoring",
  storageBucket: "power-monotoring.appspot.com",
  messagingSenderId: "479109727274",
  appId: "1:479109727274:web:c9120dabcf332652a7ef53",
  measurementId: "G-6NCFNK3QW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// a reference to the Realtime Database
const database = getDatabase(app);

export default database;
