import ProductController from "./src/controllers/product.controller.js";
import express from "express";
import path from "path";

const server = express();

// view engine setup
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// instance of productcontroller
const productcontroller = new ProductController();

// middleware that goes to get product function in the src/controllers/product.controller.js file
server.get("/", productcontroller.getProducts);

server.use(express.static("src/views"));

// server listening on port 3000
server.listen(3400, () => {
  console.log("Server is listening on port 3400");
});
