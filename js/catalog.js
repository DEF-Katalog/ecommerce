import ProductService from "./services/ProductService.js";

const productService = new ProductService();

productService.listen((data) => {

  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!data) {
    productList.innerHTML = "<p>Belum ada produk.</p>";
    return;
  }
function renderProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach(product => {
    const sizesHTML = product.sizes.map(size => `
      <div class="size-item">
        ${size.size} - Rp ${size.price.toLocaleString()}
      </div>
    `).join("");

    const card = `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}">
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

});
