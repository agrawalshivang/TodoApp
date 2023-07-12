import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const mongodb=async ()=>{
   await mongoose.connect(process.env.mongo).then(()=>{
        console.log("Connected to db")
    })
}

export default mongodb