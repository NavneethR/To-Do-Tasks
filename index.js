//importing necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectMongoDb = require("./init/mongoDb")
const router = require("./routes/task")

//initialize port numbers and urls
const appPort = 8080;

//initial a custom error middleware
const errorMiddleware = (error, req, res, next) => {
    next(error);
};

//connect with mongoDB
connectMongoDb();

//set up the web app
const app = express();
app.use(express.json());
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: true}));;
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use("/",router)

app.listen(8080);