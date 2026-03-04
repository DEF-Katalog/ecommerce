export const AdminUI = {

  /* ===============================
     GET FORM DATA
  =================================*/
  getFormData() {
    const name = document.getElementById("productName").value;
    const desc = document.getElementById("productDesc").value;

    const variantNames = document.querySelectorAll(".variantName");
    const variantPrices = document.querySelectorAll(".variantPrice");

    const variants = [];

    variantNames.forEach((input, index) => {
      variants.push({
        name: input.value,
        price: this.cleanNumber(variantPrices[index].value)
      });
    });

    return { name, desc, variants };
  },

  /* ===============================
     RESET FORM
  =================================*/
  resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("variantContainer").innerHTML = "";

    document.getElementById("saveProductBtn").textContent = "Simpan Produk";
    document.getElementById("cancelEditBtn").style.display = "none";

    document.getElementById("productImage").value = "";
    document.getElementById("imagePreview").style.display = "none";

    this.clearErrors();
  },

  /* ===============================
     FILL FORM (EDIT MODE)
  =================================*/
  fillForm(product) {
    document.getElementById("productName").value = product.name;
    document.getElementById("productDesc").value = product.description;

    const container = document.getElementById("variantContainer");
    container.innerHTML = "";

    product.variants?.forEach(v => {
      const div = document.createElement("div");

      div.innerHTML = `
        <input type="text" class="variantName" value="${v.name}">
        <input type="text" class="variantPrice" value="${this.formatRupiah(v.price.toString())}">
        <br><br>
      `;

      container.appendChild(div);
    });

    document.getElementById("saveProductBtn").textContent = "Update Produk";
    document.getElementById("cancelEditBtn").style.display = "inline-block";

    this.attachPriceFormatter();
  },

  /* ===============================
     RENDER PRODUCT LIST
  =================================*/
  renderProducts(products, onEdit, onDelete) {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product-card");

    div.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
            ${product.imageUrl ? `<img src="${product.imageUrl}" style="max-width:120px;">` : ""}
        <p>Total Varian: ${product.variants?.length || 0}</p>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
        <hr>
      `;

      div.querySelector(".editBtn").onclick = () => onEdit(product.id);
      div.querySelector(".deleteBtn").onclick = () => onDelete(product.id);

      list.appendChild(div);
    });
  },

  /* ===============================
     VALIDATION DISPLAY
  =================================*/
  showErrors(errors) {
    this.clearErrors();

    for (let key in errors) {

      if (key === "name") {
        this.showErrorBelow("productName", errors[key]);
      }

      if (key === "desc") {
        this.showErrorBelow("productDesc", errors[key]);
      }

      if (key === "variants") {
        alert(errors[key]);
      }

      if (key.startsWith("variantName_")) {
        const index = key.split("_")[1];
        document.querySelectorAll(".variantName")[index]
          .insertAdjacentHTML("afterend", `<small class="error">${errors[key]}</small>`);
      }

      if (key.startsWith("variantPrice_")) {
        const index = key.split("_")[1];
        document.querySelectorAll(".variantPrice")[index]
          .insertAdjacentHTML("afterend", `<small class="error">${errors[key]}</small>`);
      }
    }
  },

  showErrorBelow(elementId, message) {
    const el = document.getElementById(elementId);
    el.insertAdjacentHTML("afterend", `<small class="error">${message}</small>`);
  },

  clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.remove());
  },

  /* ===============================
     RUPIAH FORMATTER
  =================================*/
  formatRupiah(value) {
    const numberString = value.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah ? "Rp " + rupiah : "";
  },

  cleanNumber(value) {
    return value.replace(/[^0-9]/g, "");
  },

  attachPriceFormatter() {
    document.querySelectorAll(".variantPrice").forEach(input => {

      input.removeEventListener("input", this._priceHandler);

      this._priceHandler = (e) => {
        e.target.value = this.formatRupiah(e.target.value);
      };

      input.addEventListener("input", this._priceHandler);
    });
  }

  /* ===============================
     IMAGE PROSEDUR
  =================================*/
  attachImagePreview() {
  const fileInput = document.getElementById("productImage");
  const preview = document.getElementById("imagePreview");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  });
}
  
};
