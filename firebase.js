import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9kmOi6YEbpzZoh0QQFbYlLa9-dwahJcc",
  authDomain: "produk-31441.firebaseapp.com",
  databaseURL: "https://produk-31441-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "produk-31441",
  storageBucket: "produk-31441.firebasestorage.app",
  messagingSenderId: "340683244141",
  appId: "1:340683244141:web:51e139fa38be881cd7f564"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

console.log("Firebase Connected");
