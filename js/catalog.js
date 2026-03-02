import ProductService from "./services/ProductService.js";

const productService = new ProductService();

productService.listen((data) => {

  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!data) {
    productList.innerHTML = "<p>Belum ada produk.</p>";
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
