// firebaseCrud.js - ES6 modulni CRUD primjer za Firestore
import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
  
import {
  getDatabase,
  ref as rtdbRef,
  get as rtdbGet,
  set as rtdbSet,
  remove as rtdbRemove,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


console.log("firebaseCrud.js učitan");

// Dodaj novi članak
export async function addArticle(title, content) {
  await addDoc(collection(db, "articles"), {
    title,
    content,
    created: serverTimestamp()
  });
}

// Dohvati sve članke (real-time)
export function getArticles(callback) {
  const q = query(collection(db, "articles"), orderBy("created", "desc"));
  onSnapshot(q, (snapshot) => {
    const articles = [];
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    callback(articles);
  });
}

// Ažuriraj članak
export async function updateArticle(id, newData) {
  await updateDoc(doc(db, "articles", id), newData);
}

// Obriši članak
export async function deleteArticle(id) {
  await deleteDoc(doc(db, "articles", id));
}

// Spremi narudžbu
export async function saveOrderToFirestore(basketItems, paymentDetails) {
  await addDoc(collection(db, "orders"), {
    basket: basketItems,
    payment: paymentDetails,
    created: serverTimestamp()
  });
}

// Primjer korištenja:
// import { addArticle, getArticles, updateArticle, deleteArticle, saveOrderToFirestore } from "./firebaseCrud.js";
// addArticle("Naslov", "Sadržaj");
// getArticles(articles => console.log(articles));
// updateArticle(id, { title: "Novi naslov" });
// deleteArticle(id);
// saveOrderToFirestore(basketItems, paymentDetails);
