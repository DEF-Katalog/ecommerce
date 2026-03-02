import ProductService from "./ProductService.js";

const productService = new ProductService();

let variantTemp = {};

document
  .getElementById("addVariantBtn")
  .addEventListener("click", addVariant);

document
  .getElementById("saveProductBtn")
  .addEventListener("click", saveProduct);

function addVariant() {

  const size = document.getElementById("size").value;
  const price = document.getElementById("price").value;

  if (!size || !price) return alert("Isi ukuran & harga");

  const id = Date.now();
  variantTemp[id] = {
    size,
    price: Number(price)
  };

  document.getElementById("variantPreview").innerHTML +=
    `<div class="variant-box">
      ${size} - Rp ${Number(price).toLocaleString()}
     </div>`;

  document.getElementById("size").value = "";
  document.getElementById("price").value = "";
}

function saveProduct() {

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;

  if (!name || Object.keys(variantTemp).length === 0)
    return alert("Isi nama & minimal 1 ukuran");

  const productData = {
    name,
    description,
    images: [image],
    variants: variantTemp
  };

  productService.addProduct(productData);

  alert("Produk disimpan!");

  variantTemp = {};
  document.getElementById("variantPreview").innerHTML = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
}

// =================
// REALTIME RENDER
// =================
productService.listenProducts((data) => {

  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!data) {
    productList.innerHTML = "Belum ada produk";
    return;
  }

  for (let id in data) {

    const product = data[id];
    let variantHTML = "";

    for (let v in product.variants) {
      const variant = product.variants[v];
      variantHTML += `
        <p>${variant.size} - 
        Rp ${variant.price.toLocaleString()}</p>`;
    }

    productList.innerHTML += `
      <div class="card">
        <img src="${product.images[0]}" width="200"><br><br>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        ${variantHTML}
      </div>
    `;
  }
});
