//importing necessary modules
const app = require("./app");
const connectMongoDb = require("./init/mongoDb");

//initialize port numbers and urls
const appPort = process.env.PORT || 8000;

//connect with mongoDB
connectMongoDb();

app.listen(appPort,()=>{
    console.log(`Listening on port ${appPort}`);
});