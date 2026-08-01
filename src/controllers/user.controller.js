import path from "path";
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
}
