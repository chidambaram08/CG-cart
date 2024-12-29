const express = require("express");
const app = express(); //app is a object access all method in express
const errorHandler = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require('path')
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") }); //merge dotenv and config.env for use inside the environmental vaibale  in nodejs

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");


app.use("/api/v1/", products); // is there any error go to next line
app.use("/api/v1/", auth);
app.use("/api/v1/",order);
app.use("/api/v1/",payment)

app.use(errorHandler);

module.exports = app; //use in another file
