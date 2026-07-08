import path from "path";
import productmodel from "../models/products.model.js";
import { products } from "../assests/products.js";

export default class ProductController {
  // returns html file
  getProducts(req, res) {
    // return array of products model
    let products = productmodel.get();
    console.log(products);

    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product");
  }

  // receiving the data when form is submitted
  addNewProduct(req, res) {
    let products = productmodel.get();
    res.render("products", { products: products });
    // access data from form
    console.log(req.body);
    productmodel.add(req.body);
  }
}
