import jwt from "jsonwebtoken"

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRETE_KEY, {expiresIn:process.env.JWT_EXPIRE})
}

export default generateToken