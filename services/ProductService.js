import { db } from "../firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

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
}
