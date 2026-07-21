import path from "path";
import productmodel from "../models/products.model.js";
import { products } from "../assests/products.js";

export default class ProductController {
  // returns html file
  getProducts(req, res) {
    // return array of products model
    let products = productmodel.get();
    console.log(products);
    res.render("index", {
      products: products,
      success: false,
      errorMessage: null,
      errors: null,
    });
  }

  getAddProduct(req, res) {
    return res.render("new-product", {
      errorMessage: null,
      success: false,
      errors: null,
    });
  }

  // receiving the request and sending back
  postAddProduct(req, res, next) {
    // access data from form
    productmodel.add(req.body);
    let products = productmodel.get();
    res.status(201).render("index", {
      products,
      success: true,
      errors: null,
      errorMessage: null,
    });
  }

  getUpdateProductView(req, res, next) {
    // 1, if product exist then return view else return error
    const { id } = req.body;
    const productFound = productmodel.getbyID(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      // else return error
      res.status(404).send("Product not found!");
    }
  }
}
