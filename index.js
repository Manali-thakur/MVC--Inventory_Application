import ProductController from "./src/controllers/product.controller.js";
import express from "express";
import path from "path";
import ejsLayout from "express-ejs-layouts";

const server = express();

// view engine setup
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayout);

// instance of productcontroller
const productcontroller = new ProductController();

// middleware that goes to get product function in the src/controllers/product.controller.js file
server.get("/", productcontroller.getProducts);
server.use(express.static("src/views"));

export default server
