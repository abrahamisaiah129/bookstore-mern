import express from "express";
import {PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import cors from  'cors';
import booksRoute from "./routes/booksRoute.js";




 
const app = express();

// below is tehe cors policy for moving allowing data collection from another application on different server
// allow all origins wiuht default of cors(*)
app.use(cors({
    origin: 'http://localhost:5173'  // Replace with your frontend URL
}));


app.use(express.json());
// for all prefix es of books handle them with this middleware
app.use('/books',booksRoute);


// app.use(cors()); 
// app.use(cors({
//     origin: 'http://localhost:5173' // Allow only this origin
// }));

// allow costom origins
// app.use(
//     cors(
//         {
//             origin :'http://localhost:3000',
//             methods:['POST','GET','PUT','DELETE'],
//             allowedHeaders:['Çontent-type']
//         } 
//     )
// );









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