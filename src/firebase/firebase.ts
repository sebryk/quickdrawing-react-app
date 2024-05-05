import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// See: https://quickdrawing-82835-default-rtdb.europe-west1.firebasedatabase.app/

const firebaseConfig = {
  apiKey: "AIzaSyA2zxZ5c90OGNyjUUhfhPvtAJ5hO3PlMXQ",
  authDomain: "quickdrawing-82835.firebaseapp.com",
  projectId: "quickdrawing-82835",
  storageBucket: "quickdrawing-82835.appspot.com",
  messagingSenderId: "1046617522763",
  appId: "1:1046617522763:web:59047e966b4876294283ce", 
  databaseURL: 'https://quickdrawing-82835-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)

