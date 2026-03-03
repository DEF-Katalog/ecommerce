export default class Product {
  constructor(nama, deskripsi, gambar, kategori) {
    this.nama = nama;
    this.deskripsi = deskripsi;
    this.gambar = gambar;
    this.kategori = kategori;
    this.aktif = true;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.variants = {};
  }

  addVariant(variant, key) {
    this.variants[key] = variant;
  }
}
