const mongoose = require("mongoose");


const taskSchema = mongoose.Schema(
    {
        title: String,
        desc: String
    },
    {timestamps: true}
);

const Task = mongoose.model("tasks",taskSchema);

module.exports =Task;