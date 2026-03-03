import { Product } from "../models/Product.js";
import { Variant } from "../models/Variant.js";
import { ProductService } from "../services/ProductService.js";

//untuk menentukan edit atau tambah
let editMode = false;
let currentEditId = null;

const variantContainer = document.getElementById("variantContainer");
const addVariantBtn = document.getElementById("addVariantBtn");
const saveProductBtn = document.getElementById("saveProductBtn");
const productList = document.getElementById("productList");

addVariantBtn.addEventListener("click", () => {
  const variantDiv = document.createElement("div");

  variantDiv.innerHTML = `
    <input type="text" placeholder="Nama Varian" class="variantName">
    <input type="number" placeholder="Harga" class="variantPrice">
    <br><br>
  `;

  variantContainer.appendChild(variantDiv);
});

//event save
saveProductBtn.addEventListener("click", async () => {
  const name = document.getElementById("productName").value;
  const desc = document.getElementById("productDesc").value;

  const product = new Product(name, desc);

  const variantNames = document.querySelectorAll(".variantName");
  const variantPrices = document.querySelectorAll(".variantPrice");

  variantNames.forEach((input, index) => {
    const variant = new Variant(
      input.value,
      variantPrices[index].value
    );
    product.addVariant(variant);
  });

  if (editMode) {
  await ProductService.updateProduct(currentEditId, product);
  alert("Produk berhasil diupdate");
  editMode = false;
  currentEditId = null;
  saveProductBtn.textContent = "Simpan Produk";
} else {
  await ProductService.saveProduct(product);
  alert("Produk berhasil disimpan");
}

  loadProducts();
});

async function loadProducts() {
  const products = await ProductService.getAllProducts();

  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Total Varian: ${product.variants?.length || 0}</p>
        <button class="editBtn" data-id="${product.id}">Edit</button>
        <button class="deleteBtn" data-id="${product.id}">Delete</button>
      <hr>
    `;

    productList.appendChild(div);

    // event delete
    div.querySelector(".deleteBtn").addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await ProductService.deleteProduct(id);
      loadProducts();
});

    // event edit
    div.querySelector(".editBtn").addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  const product = await ProductService.getProductById(id);

  document.getElementById("productName").value = product.name;
  document.getElementById("productDesc").value = product.description;

  variantContainer.innerHTML = "";

  product.variants.forEach(variant => {
    const variantDiv = document.createElement("div");

    variantDiv.innerHTML = `
      <input type="text" class="variantName" value="${variant.name}">
      <input type="number" class="variantPrice" value="${variant.price}">
      <br><br>
    `;

    variantContainer.appendChild(variantDiv);
  });

  editMode = true;
  currentEditId = id;

  saveProductBtn.textContent = "Update Produk";
});
  });
}
  loadProducts();
