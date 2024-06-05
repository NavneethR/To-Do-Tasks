const mongoose = require("mongoose");

const mongoPort = 27017;
const connectionUrl = `mongodb://localhost:${mongoPort}/newTasksDb`;

const connectMongoDb = async (req, res, next) =>{
    console.log("Connecting to MongoDB");
    try{
        await mongoose.connect(connectionUrl);
        console.log(`Database connection successful at port ${mongoPort}`);
    }catch(error){
        console.log("Connection failed");
        console.log(error.message);
    }
};

module.exports = connectMongoDb;
