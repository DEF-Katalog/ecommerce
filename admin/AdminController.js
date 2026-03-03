import { Product } from "../models/Product.js";
import { Variant } from "../models/Variant.js";
import { ProductService } from "../services/ProductService.js";
import { AdminUI } from "./AdminUI.js";
import { AdminState } from "./AdminState.js";

const addVariantBtn = document.getElementById("addVariantBtn");
const saveProductBtn = document.getElementById("saveProductBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

/* ===============================
   LOAD PRODUK
=================================*/
async function loadProducts() {
  const products = await ProductService.getAllProducts();

  AdminUI.renderProducts(
    products,
    handleEdit,
    handleDelete
  );
}

/* ===============================
   HANDLE SAVE
=================================*/
saveProductBtn.addEventListener("click", async () => {

  const formData = AdminUI.getFormData();
  const product = new Product(formData.name, formData.desc);

  formData.variants.forEach(v => {
    product.addVariant(new Variant(v.name, v.price));
  });

  if (AdminState.editMode) {
    await ProductService.updateProduct(AdminState.currentEditId, product);
  } else {
    await ProductService.saveProduct(product);
  }

  AdminState.reset();
  AdminUI.resetForm();
  loadProducts();
});

/* ===============================
   HANDLE EDIT
=================================*/
async function handleEdit(id) {
  const product = await ProductService.getProductById(id);

  AdminState.setEditMode(id);
  AdminUI.fillForm(product);
}

/* ===============================
   HANDLE DELETE
=================================*/
async function handleDelete(id) {
  await ProductService.deleteProduct(id);
  loadProducts();
}

/* ===============================
   HANDLE CANCEL
=================================*/
cancelEditBtn.addEventListener("click", () => {
  AdminState.reset();
  AdminUI.resetForm();
});

/* ===============================
   ADD VARIANT BUTTON
=================================*/
addVariantBtn.addEventListener("click", () => {
  const container = document.getElementById("variantContainer");

  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Nama Varian" class="variantName">
    <input type="number" placeholder="Harga" class="variantPrice">
    <br><br>
  `;

  container.appendChild(div);
});

/* INIT */
loadProducts();
