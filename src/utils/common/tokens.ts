import jwt from "jsonwebtoken"
import {ENV} from "../../config/ENV.config.js"

export const generateAccessToken = (userId : string) => {
    return jwt.sign(
        {userId},
         ENV.JWT_SECRET as string, 
         {expiresIn : "15m"})
}


export const generateRefreshToken = (userId : string) => {
    return jwt.sign(
        {userId},
         ENV.JWT_SECRET as string, 
         {expiresIn : "7d"})
}