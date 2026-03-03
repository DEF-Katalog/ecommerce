export const AdminValidator = {

  validate(formData) {
    const errors = {};

    // Validasi Nama Produk
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Nama produk wajib diisi";
    }

    // Validasi Deskripsi
    if (!formData.desc || formData.desc.trim() === "") {
      errors.desc = "Deskripsi wajib diisi";
    }

    // Validasi Varian
    if (!formData.variants || formData.variants.length === 0) {
      errors.variants = "Minimal 1 varian harus ditambahkan";
    } else {
      formData.variants.forEach((v, index) => {
        if (!v.name || v.name.trim() === "") {
          errors[`variantName_${index}`] = "Nama varian wajib diisi";
        }

        if (!v.price || isNaN(v.price) || Number(v.price) <= 0) {
          errors[`variantPrice_${index}`] = "Harga harus angka dan lebih dari 0";
        }
      });
    }

    return errors;
  }

};
