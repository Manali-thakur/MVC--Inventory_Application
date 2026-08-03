import path from "path";
import productmodel from "../models/products.model.js";
import { products } from "../assests/products.js";
import usermodel from "../models/user.model.js";
import { body } from "express-validator";

export default class userController {
  getRegister(req, res) {
    res.render("register", {
      errorMessage: null,
      success: false,
      errors: null,
    });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    console.log("Received body:", req.body);
    usermodel.add(name, email, password);
    res.render("login");
  }

  //   login logic

  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
      success: false,
      errors: null,
    });
  }

  async postLogin(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await usermodel.login(email, password);
    // const userFound = usermodel.getbyEmail(email);
    if (!user) {
      res.render("login", {
        errorMessage: "Invalid email or password",
        success: false,
        errors: null,
      });
    } else {
      req.session.userEmail = user.email;
      let products = productmodel.get();
      console.log("User found:", user);
      res.render("index", {
        products: products,
        errorMessage: null,
        success: true,
        errors: null,
      });
    }
  }

  userLogout(req, res) {
    req.session.destroy((err) =>{
      if(err){
        res.status(401).send(err);
      } else {
        res.redirect('/login');
      }
    })
  }
}
