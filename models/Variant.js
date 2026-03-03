// Supaya tidak terjadi NaN atau string harga

export default class Variant {
  constructor(nama, harga) {
    this.nama = nama;
    this.harga = Number(harga); // pastikan number
  }
}
