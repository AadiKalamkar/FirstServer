import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name: String,
    contact: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
},{timestamps:true})

const registerModel = mongoose.model("userInfo",registerSchema)
export default registerModel