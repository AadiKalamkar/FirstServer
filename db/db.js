import mongoose from "mongoose";
const mongourl = process.env.MONGOURL
const db = mongoose.connect("mongodb+srv://adityaklmkr:RuY3ZAIlMqVfj9aY@cluster0.kkdvuft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test").then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err)
})

export default db
