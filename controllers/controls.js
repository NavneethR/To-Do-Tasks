const Task = require("../models/Task");
const moment = require("moment");

const homeController =  async (req,res,next) => {
    const {title, desc} = req.body;
    let task = new Task({title: title, desc: desc});
    await task.save();
    res.redirect("/");
};

const addTaskFormController = (req,res,next) =>{
    try{
        res.render("add-task.ejs", {title: "Add Task"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

const updateTaskFormController = (req,res,next) =>{
    try{
        res.render("update-task.ejs", {title: "Update task"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

const addTaskController = async (req,res,next) => {
    try{
        const todos = await Task.find({}).sort({createdAt: 1});
        res.locals.moment = moment;
        res.render("index.ejs",{title: "List-Todo", todos: todos});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

const deleteTaskFormController = (req,res,next) =>{
    try{
        res.render("delete-task.ejs", {title: "Delete task"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

module.exports = {homeController,addTaskFormController,addTaskController,updateTaskFormController,deleteTaskFormController};