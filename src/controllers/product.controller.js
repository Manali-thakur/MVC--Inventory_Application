import path from "path";
import productmodel from "../models/products.model.js";

export default class ProductController {
  // returns html file
  getProducts(req, res) {
    // return array of products model
    let products = productmodel.get();
    console.log(products);

    // res.render("products", { products: products });

    return res.json(products);

    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.ejs"),
    // );
  }
}
