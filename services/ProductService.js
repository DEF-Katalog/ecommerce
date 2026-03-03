import { db } from "../firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export default class ProductService {
  static async create(product) {
    const productRef = push(ref(db, "products"));
    await set(productRef, product);
  }
}
