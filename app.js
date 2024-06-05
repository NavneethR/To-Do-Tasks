const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes/task")
const dotenv = require("dotenv");

const app = express();

//initialize a custom error middleware
const errorMiddleware = (error, req, res, next) => {
    next(error);
};

dotenv.config();
app.use(express.json());
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: true}));;
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use("/",router)

module.exports = app;