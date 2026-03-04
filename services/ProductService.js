import { db } from "../firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { remove } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { update } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { deleteObject, ref as storageRef } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

import { storage } from "../firebase.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

export class ProductService {

  static async saveProduct(product) {
    const productRef = push(ref(db, "products"));
    await set(productRef, product);
    return productRef.key;
  }

// untuk mengambil data dari firebase
  static async getAllProducts() {
  const snapshot = await get(ref(db, "products"));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.keys(data).map(key => ({
    id: key,
    ...data[key]
  }));
}

// untuk menghapus data dari firebase
  static async deleteProduct(id) {
  await remove(ref(db, "products/" + id));
}

// untuk mengambil data dari firebase
  static async getProductById(id) {
  const snapshot = await get(ref(db, "products/" + id));
  if (!snapshot.exists()) return null;

  return {
    id,
    ...snapshot.val()
  };
}

  // untuk mengubah data dari firebase
  static async updateProduct(id, product) {
  await update(ref(db, "products/" + id), product);
}

  // untuk menyipan gambar dari firebase
  static async uploadImage(file) {
  const imageRef = storageRef(storage, "products/" + Date.now() + "_" + file.name);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

  // untuk Delete Image dari firebase Storage
  static async deleteImageByUrl(imageUrl) {
  if (!imageUrl) return;

    try {
      const baseUrl = imageUrl.split("/o/")[1].split("?")[0];
      const imagePath = decodeURIComponent(baseUrl);

      const imageRef = storageRef(storage, imagePath);
      await deleteObject(imageRef);

      console.log("Gambar lama berhasil dihapus");
    } catch (error) {
      console.log("Gagal hapus gambar lama:", error);
    }
  }
  
}
