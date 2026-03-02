export default class Product {

  constructor(name, description, image) {
    this.name = name;
    this.description = description;
    this.images = [image];
    this.variants = {};
  }

  addVariant(size, price) {
    const id = Date.now();
    this.variants[id] = {
      size,
      price: Number(price)
    };
  }

}
