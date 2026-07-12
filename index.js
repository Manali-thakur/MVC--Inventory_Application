import ProductController from "./src/controllers/product.controller.js";
import express from "express";
import path from "path";
import ejsLayout from "express-ejs-layouts";
import AddProductValidationMiddleware from "./src/middlewares/validation.middleware.js";

const server = express();

// parse form data
server.use(express.urlencoded({ extended: true }));

// view engine setup
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayout);

// instance of productcontroller
const productcontroller = new ProductController();

// middleware that goes to get product function in the src/controllers/product.controller.js file
server.get("/", productcontroller.getProducts);

// calling the getAddForm function from the productcontroller to render the new-product.ejs file
server.get("/new", productcontroller.getAddProduct);
// validation middleware added
server.post("/", AddProductValidationMiddleware, productcontroller.postAddProduct);

server.use(express.static("src/views"));

export default server;
