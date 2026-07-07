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
  ) {
    this.id = __id;
    this.title = __title;
    this.price = __price;
    this.description = __description;
    this.category = __category;
    this.image = __image;
    this.rating = __rating;
  }

  //   return the products array
  static get() {
    return products;
  }
}
