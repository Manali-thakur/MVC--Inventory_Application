import { products } from "../assests/products.js";

export default class productmodel {
  // represennts the format of data that will be stored in the database
  constructor(
    __id,
    __title,
    __price,
    __description,
    __category,
    __image,
    __rating,
    __count,
  ) {
    this.id = __id;
    this.title = __title;
    this.price = __price;
    this.description = __description;
    this.category = __category;
    this.image = __image;
    this.rating = __rating;
    this.count = __count;
  }

  // for search
  static searchPro(title) {
    const data = products.filter((product) =>
      product.title.trim().toLowerCase().includes(title.trim().toLowerCase()),
    );
    return data;
  }

  // to check that the product exist or not
  static getbyID(id) {
    return products.find((p) => p.id == id);
  }

  //   return the products array
  static get() {
    return products;
  }

  // update
  static update(productObj) {
    const Index = products.findIndex((p) => p.id == productObj.id);
    products[Index] = productObj;
  }

  // delete
  static delete(id) {
    const Index = products.findIndex((p) => p.id == id);
    products.splice(Index, 1);
  }

  static add(productObj) {
    const newProduct = new productmodel(
      products.length + 1,
      productObj.title,
      productObj.price,
      productObj.description,
      productObj.category,
      productObj.image,
      productObj.rating,
      productObj.count,
    );
    products.push(newProduct);
  }
}
