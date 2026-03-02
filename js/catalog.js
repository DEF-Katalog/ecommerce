// ===== IMPORT FIREBASE =====
import { db } from "./firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// ===== REFERENSI COLLECTION =====
const productRef = collection(db, "products");

// ===== AMBIL DATA REALTIME =====
onSnapshot(productRef, (snapshot) => {
  const products = [];

  snapshot.forEach(doc => {
    products.push({
      id: doc.id,
      ...doc.data()
    });
  });

  renderProducts(products);
});

// ===== RENDER PRODUK =====
function renderProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>Belum ada produk.</p>";
    return;
  }

  products.forEach(product => {

    // 🔹 Handle jika sizes kosong / tidak ada
    const sizes = product.sizes || [];

    const sizesHTML = sizes.map(size => `
      <div class="size-item">
        ${size.size} - Rp ${Number(size.price).toLocaleString("id-ID")}
      </div>
    `).join("");

    const card = `
      <div class="product-card">
        <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="size-list">
            ${sizesHTML}
          </div>
        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}
