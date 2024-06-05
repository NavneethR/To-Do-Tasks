const Task = require("../models/Task");
const moment = require("moment");

const addTaskController =  async (req,res,next) => {
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

const updateTaskFormController = async (req,res,next) =>{
    try{
        const {id} = req.query;
        const task = await Task.findById(id);
        res.render("update-task.ejs", {title: "Update task", task});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

const updateTaskController = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {title, desc} = req.body;
        console.log(id,title, desc)
        const task = await Task.findById(id);
        console.log(task);
        if(!task){
            res.status(404).json({message: "Object Not Found!"})
        }
        task.title = title;
        task.desc = desc;
        await task.save();
        res.redirect("/");
    }catch(error){
        res.status(500).send({message: error.message});
    }
}

const homeController = async (req,res,next) => {
    try{
        const tasks = await Task.find({}).sort({createdAt: 1});
        res.locals.moment = moment;
        res.render("index.ejs",{title: "List-task", tasks: tasks});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

const deleteTaskFormController = async (req,res,next) =>{
    try{
        const {id} = req.query;
        const task = await Task.findById(id); 
        res.render("delete-task.ejs", {title: "Delete task", id});
    }catch(error){
        res.status(500).send({message: error.message});
    }
};

const deleteTaskController = async (req, res, next) => {
    try{
        const {id, confirm} = req.query;
        if(confirm==="yes"){
            await Task.findByIdAndDelete(id);
        }
        res.redirect("/");
    }catch(error){}
}

module.exports = {homeController,updateTaskController ,addTaskFormController,addTaskController,updateTaskFormController,deleteTaskController ,deleteTaskFormController};