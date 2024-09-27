import express from "express";
import {PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";


const app = express();



// connnect to the database using mongoose library
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("Connected to database");
// this is for our port at localhost 5555 (PORT)
    app.listen(PORT,()=>{
        console.log(`APP IS ON AT PORT ${PORT}`)
    })


})
.catch((error)=>{
    console.log(error)
})