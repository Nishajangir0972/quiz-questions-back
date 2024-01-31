import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import FormRouter from "./FormRouter.js";


const app = express()

const connection = mongoose.connect("mongodb+srv://hanshajangir061:hansha6861@cluster0.iq3gwti.mongodb.net/?retryWrites=true&w=majority")
app.use(cors())
app.use(express.json())

app.use("/form" , FormRouter)




connection.then(()=>{
    app.listen( 8000 , ()=> console.log("Server has been started"))
    })
    .catch((err)=> console.log(err))