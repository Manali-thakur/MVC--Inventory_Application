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

  getAddProduct(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  // receiving the data when form is submitted
  postAddProduct(req, res) {
    // res.render("products", { products: products });

    // validate the data
    const { title, price, description, category, image, rating, count } =
      req.body;
    let errors = [];
    if (!title || title.trim() == "") {
      errors.push("Name is Required");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("Price is Invalid");
    }
    try {
      const validUrl = new URL(image);
    } catch (err) {
      errors.push("URL is Invalid");
    }

    if (errors.length > 0) {
      return res.render("new-product", {
        errorMessage: errors[0],
      });
    }

    // access data from form
    // console.log(req.body);
    productmodel.add(req.body);
    let products = productmodel.get();
    res.render("index", { products });
  }
}
