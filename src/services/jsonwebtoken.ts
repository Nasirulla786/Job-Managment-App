//@ts-nocheck
import jwt from "jsonwebtoken"
export  function GenerateToken(data) {
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token

}


export function VerifyToken(token) {
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
    return verifytoken
}