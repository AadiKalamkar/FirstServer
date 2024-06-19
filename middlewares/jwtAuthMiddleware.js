import jwt from "jsonwebtoken"

const jwtAuthMiddleware = (req, res, next) => {
   try {
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ msg: "token not found" })
    const token = authorization.split(" ")[1]
    if (!token) return res.status(401).json({ msg: "unauthorized user" })
    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY)
        req.user = decoded
        
        next()
    } catch (err) {
        res.status(401).json({ msg: "unauthorized user" })
    }
   } catch (error) {
    res.status(401).json({ msg: "Invalid token" })
    
   }
}
export default jwtAuthMiddleware