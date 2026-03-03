import { Product } from "../models/Product.js";
import { Variant } from "../models/Variant.js";
import { ProductService } from "../services/ProductService.js";

const variantContainer = document.getElementById("variantContainer");
const addVariantBtn = document.getElementById("addVariantBtn");
const saveProductBtn = document.getElementById("saveProductBtn");

addVariantBtn.addEventListener("click", () => {
  const variantDiv = document.createElement("div");

  variantDiv.innerHTML = `
    <input type="text" placeholder="Nama Varian" class="variantName">
    <input type="number" placeholder="Harga" class="variantPrice">
    <br><br>
  `;

  variantContainer.appendChild(variantDiv);
});

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

  const productId = await ProductService.saveProduct(product);

  alert("Produk berhasil disimpan dengan ID: " + productId);
});
