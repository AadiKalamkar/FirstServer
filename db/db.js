import mongoose from "mongoose";
const mongourl = process.env.MONGOURL
const db = mongoose.connect(mongourl).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err)
})

export default db
