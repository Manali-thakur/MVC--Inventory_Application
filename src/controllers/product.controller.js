import path from "path";
import productmodel from "../models/products.model.js";
import { products } from "../assests/products.js";

export default class ProductController {
  // returns html file
  getProducts(req, res) {
    // return array of products model
    let products = productmodel.get();
    console.log(products);
    res.render("products", {
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

  // receiving the data when form is submitted
  postAddProduct(req, res) {
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
    if (!description || description.trim() == "") {
      errors.push("Description is Required");
    }
    if (description.length > 0 && description.length < 10) {
      errors.push("Description should be more than 10 characters");
    }
    if (!rating || parseFloat(rating) < 1) {
      errors.push("Rating is Invalid");
    }
    if (!count || parseFloat(count) < 1) {
      errors.push("Count is Invalid");
    }
    try {
      const validUrl = new URL(image);
    } catch (err) {
      errors.push("URL is Invalid");
    }

    if (errors.length > 0) {
      return res.render("new-product", {
        errorMessage: errors,
        success: false,
      });
    }

    // access data from form
    // console.log(req.body);
    productmodel.add(req.body);
    let products = productmodel.get();
    res.status(201).render("products", {
      products,
      success: true,
      errors: null,
      errorMessage: null,
    });
  }
}
