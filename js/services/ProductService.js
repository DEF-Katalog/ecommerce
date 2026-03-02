import { db } from "../firebase.js";
import { ref, push, set, onValue }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export default class ProductService {

  constructor() {
    this.productsRef = ref(db, "products");
  }

  save(product) {
    const newProductRef = push(this.productsRef);
    return set(newProductRef, product);
  }

  listen(callback) {
    onValue(this.productsRef, (snapshot) => {
      callback(snapshot.val());
    });
  }

}
