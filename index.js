import ProductController from "./src/controllers/product.controller.js";
import userController from "./src/controllers/user.controller.js";
import express from "express";
import path from "path";
import ejsLayout from "express-ejs-layouts";
import AddProductValidationMiddleware from "./src/middlewares/validation.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const server = express();

// folder is statically used  js file can be directly accessed by views
server.use(express.static("public"));
server.use(cookieParser());
server.use(setLastVisit);

// session middleware configure
// should use the key generator for secret key.
server.use(
  session({
    secret: "Secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //using http protocol
  }),
);
//user logged in we attach info to session and check if user is logged in or not

// parse form data
server.use(express.urlencoded({ extended: true }));
// for JSON/AXIOS requests
server.use(express.json());

// view engine setup
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayout);

// instance for calling the methods
const productcontroller = new ProductController();
const usercontroller = new userController();

// middleware that goes to get product function in the src/controllers/product.controller.js file
server.get("/", auth, productcontroller.getProducts);

// calling the getAddForm function from the productcontroller to render the new-product.ejs file
server.get("/new", auth, productcontroller.getAddProduct);

server.get("/register", usercontroller.getRegister);
server.post("/register", usercontroller.postRegister);

server.get("/login", usercontroller.getLogin);
server.post("/login", usercontroller.postLogin);

// getting the requests
server.post(
  "/",
  auth,
  uploadFile.single("image"),
  AddProductValidationMiddleware,
  productcontroller.postAddProduct,
);

// updating the product
server.get("/update-product/:id", auth, productcontroller.getUpdateProductView);

// Deleting the product
server.post("/delete-product/:id", auth, productcontroller.deleteProduct);

// getting the updated product
server.post("/update-product", auth, productcontroller.postUpdateProduct);

// search product
server.post("/search", auth, productcontroller.searchProduct);

// logout
server.get("/logout", usercontroller.userLogout);

server.use(express.static("src/views"));

export default server;
