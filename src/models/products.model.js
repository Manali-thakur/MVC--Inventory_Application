export default class productmodel {
  // represennts the format of data that will be stored in the database
  constructor(__id, __name, __desc, __price, __imageURL) {
    this.id = __id;
    this.name = __name;
    this.desc = __desc;
    this.price = __price;
    this.imageURL = __imageURL;
  }

//   return the products array
  static get() {
    return products;
  }
}

// data
var products = [
  new productmodel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "../views/multimedia/Screenshot 2026-07-04 163614.png",
  ),
  new productmodel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "../views/multimedia/Screenshot 2026-07-04 165115.png",
  ),
  new productmodel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "../views/multimedia/Screenshot 2026-07-04 165150.png",
  ),
];
