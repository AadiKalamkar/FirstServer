import express from "express";
import bcrypt from "bcrypt"
import generateToken from "../middlewares/generateToken.js";
import registerModel from "../models/register.js";
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware.js";
const router = express.Router()

router.get("/", (req, res) => {
    res.render("registration")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/home", (req, res) => {
    res.render("home")
})
router.post("/register/home", async (req, res) => {
    try {
        const { name, contact, email, password, cpassword } = await req.body
        if (!(password === cpassword)) return res.status(401).json({ msg: "password not matched" })
        let hashedPass = await bcrypt.hash(password, 11)
        let pradip = new registerModel({
            name,
            contact,
            email,
            password: hashedPass
        })
        await pradip.save()
        let token = generateToken(pradip.id)
        res.cookie("token", token)
        let pid = pradip.id
        let uname = name.split(" ")[0]
        res.status(200).render("home",{name:uname,id:pid})

    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})
router.post("/login/home", async (req, res) => {
    try {
        const { email, password } = await req.body
        let user = await registerModel.findOne({ email })
        if (!user) return res.status(401).json({ msg: "unauthorized user" })
        let passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) return res.status(401).json({ msg: "Incorrect password" })
        let token = generateToken(user.id)
        res.cookie("token", token)
        let pid = user.id
        let uname = user.name.split(" ")[0]
        res.status(200).render("home",{name:uname,id:pid})
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

router.get("/profile/:id", async (req, res) => {
    try {
        let id = req.params.id
        let user = await registerModel.findById(id)
        if (!user) return res.status(401).json({ msg: "user not found" })
        res.status(200).render("profile",{user})
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

router.delete("/delete/user/:uid", jwtAuthMiddleware, async (req, res) => {
    try {
        let { uid } = req.params
        let id = req.user.id
        console.log("index id", id)
        if (!(uid === id)) return res.status(401).json({ msg: "invalid user" })
        let user = await registerModel.findByIdAndDelete(id)
        if (!user) return res.status(401).json({ msg: "user not found" })
        res.status(200).json({ msg: "user deleted", user })
        console.log(user)
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

router.put("/update/profile/:uid", jwtAuthMiddleware, async (req, res) => {
    try {
        let { uid } = req.params
        let id = req.user.id
        let userInfo = req.body
        if (uid !== id) return res.status(401).json({ msg: "invalid user" })
        let user = await registerModel.findByIdAndUpdate(id, userInfo, { new: true })
        res.status(200).json({ msg: "user updated" })
    } catch (error) {
        res.status(500).json({ msg: "internal server error" })
    }
})

export default router
