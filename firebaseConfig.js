import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJARo7qOHp9b-oK9_x0O42pTY5z4VHyO0",
  authDomain: "shpanac-restoran.firebaseapp.com",
  databaseURL: "https://shpanac-restoran-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shpanac-restoran",
  storageBucket: "shpanac-restoran.firebasestorage.app",
  messagingSenderId: "108949227190",
  appId: "1:108949227190:web:be0c71b2a9ccd7f66e8817",
  measurementId: "G-9JQMKNF0C4"
};

// Inicijalizacija
const app = initializeApp(firebaseConfig);

// Export servisa
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);