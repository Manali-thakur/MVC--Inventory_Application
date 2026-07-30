import path from "path";
import productmodel from "../models/products.model.js";
import { products } from "../assests/products.js";
import { body } from "express-validator";

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
    const { title, price, description, category, rating, count } = req.body;
    const image = "image/" + req.file.filename;
    productmodel.add(title, price, description, category, image, rating, count);
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
    const id = req.params.id;
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

  postUpdateProduct(req, res) {
    console.log("Received body:", req.body);
    productmodel.update(req.body);
    var products = productmodel.get();
    res.render("index", {
      products,
      success: true,
      errors: null,
      errorMessage: null,
    });
  }

  // for deleting the product
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = productmodel.getbyID(id);
    var products = productmodel.get();
    if (productFound) {
      productmodel.delete(id);
      console.log(`Product id- ${id} has been deleted`);
      res.render("index", {
        products,
        success: true,
        errors: null,
        errorMessage: null,
      });
    } else {
      // else return error
      res.status(404).send("Product not found!");
    }
  }

  // search Products
  searchProduct(req, res) {
    console.log("BODY RECEIVED:", req.body);
    const { title } = req.body;
    const data = productmodel.searchPro(title);
    res.render("search-product", {
      products: data,
      success: true,
      errors: null,
      errorMessage: null,
    });
  }
}
