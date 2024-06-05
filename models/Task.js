const mongoose = require("mongoose");


const taskSchema = mongoose.Schema(
    {
        title: {type: String,required: true},
        desc: String
    },
    {timestamps: true}
);

const Task = mongoose.model("tasks",taskSchema);

module.exports =Task;