const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectionUrl = process.env.CONNECTION_URL

const connectMongoDb = async (req, res, next) =>{
    console.log("Connecting to MongoDB");
    try{
        await mongoose.connect(connectionUrl);
        console.log(`Database connection successful at port 27017`);
    }catch(error){
        console.log("Connection failed");
        console.log(error.message);
    }
};

module.exports = connectMongoDb;
