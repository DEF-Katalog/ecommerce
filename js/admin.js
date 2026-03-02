import Product from "./models/Product.js";
import ProductService from "./services/ProductService.js";
import { ref, remove }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { db } from "./firebase.js";

const productService = new ProductService();

let dataCache = {};
let editingId = null;
let currentProduct = null;

document
  .getElementById("addVariantBtn")
  .addEventListener("click", addVariant);

document
  .getElementById("saveProductBtn")
  .addEventListener("click", saveProduct);

function showToast(message, type) {

  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.className = "";
  toast.classList.add("show");

  if (type === "success")
    toast.classList.add("toast-success");

  if (type === "warning")
    toast.classList.add("toast-warning");

  if (type === "danger")
    toast.classList.add("toast-danger");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function addVariant() {

  if (!currentProduct) {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;

    if (!name) return alert("Isi nama dulu!");

    currentProduct = new Product(name, description, image);
  }

  const size = document.getElementById("size").value;
  const price = document.getElementById("price").value;

  if (!size || !price)
    return alert("Isi ukuran & harga");

  currentProduct.addVariant(size, price);

  document.getElementById("variantPreview").innerHTML +=
    `<div>${size} - Rp ${Number(price).toLocaleString()}</div>`;

  document.getElementById("size").value = "";
  document.getElementById("price").value = "";
}

function saveProduct() {

  if (!currentProduct ||
      Object.keys(currentProduct.variants).length === 0)
    return showToast("Minimal 1 ukuran!", "danger");

  if (editingId) {

    // UPDATE DATA
    productService.update(editingId, currentProduct);

    showToast("Produk berhasil diperbarui!", "warning");

    editingId = null;

  } else {

    // TAMBAH BARU
    productService.save(currentProduct);

    showToast("Produk berhasil ditambahkan!", "success");
  }

  // Reset form
  currentProduct = null;
  document.getElementById("variantPreview").innerHTML = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
}

function resetForm() {
  currentProduct = null;
  document.getElementById("variantPreview").innerHTML = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
}

productService.listen((data) => {

  dataCache = data;
  const list = document.getElementById("adminProductList");
  list.innerHTML = "";

  if (!data) return;

  for (let id in data) {
    const product = data[id];

    list.innerHTML += `
      <div class="card">
        <h3>${product.name}</h3>
        <button onclick="editProduct('${id}')">Edit</button>
        <button onclick="deleteProduct('${id}')">Hapus</button>
      </div>
    `;
  }

});

window.deleteProduct = function(id) {

  if (!confirm("Yakin hapus?")) return;

  remove(ref(db, "products/" + id));

  showToast("Produk berhasil dihapus!", "danger");
};

window.editProduct = function(id) {

  const product = dataCache[id];

  if (!product) return;

  editingId = id;

  document.getElementById("name").value = product.name;
  document.getElementById("description").value = product.description;
  document.getElementById("image").value = product.image || "";

  // Reset preview
  document.getElementById("variantPreview").innerHTML = "";

  // Buat ulang currentProduct
  currentProduct = new Product(
    product.name,
    product.description,
    product.image
  );

  // Masukkan ulang variants
  for (let size in product.variants) {
    currentProduct.addVariant(size, product.variants[size]);

    document.getElementById("variantPreview").innerHTML +=
      `<div class="variant-box">
        ${size} - Rp ${Number(product.variants[size]).toLocaleString()}
      </div>`;
  }

  showToast("Mode edit aktif", "warning");
};
