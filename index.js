//importing necessary modules
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const moment = require("moment");

//initialize port numbers and urls
const appPort = 8080;
const mongoPort = 27017;
const connectionUrl = `mongodb://localhost:${mongoPort}/newTasksDb`;

//initial a custom error middleware
const errorMiddleware = (error, req, res, next) => {
    next(error);
};

//set up the web app
const app = express();
app.use(express.json());
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: true}));;
app.use(bodyParser.json());
app.set("view engine","ejs");

//Database initialize and setup
mongoose.connect(connectionUrl);
const taskSchema = mongoose.Schema({title: {type: String,required: true},desc: String},{timestamps: true});
const TaskModel = mongoose.model("tasks",taskSchema);

app.post("/add-new-task", async (req,res,next) => {
    const {title, desc} = req.body;
    let task = new TaskModel({title: title, desc: desc});
    await task.save();
    res.redirect("/");
});

app.get("/add-new-task",(req,res,next) =>{
    try{
        res.render("add-task.ejs", {title: "Add Task"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

app.get("/",async (req,res,next) => {
    try{
        const todos = await TaskModel.find({}).sort({createdAt: 1});
        res.locals.moment = moment;
        res.render("index.ejs",{title: "List-Todo", todos: todos});
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

app.get("/update-task",(req,res,next) =>{
    try{
        res.render("update-task.ejs", {title: "Update task"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
})

app.get("/delete-task",(req,res,next) =>{
    try{
        res.render("delete-task.ejs", {title: "Delete task"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
})

app.listen(8080);