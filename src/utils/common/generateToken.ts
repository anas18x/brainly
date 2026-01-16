import jwt from "jsonwebtoken"

export const generateAccessToken =  (
    userId: string ,
    email: string, 
    secretKey: string) : string => {
        return jwt.sign({userId,email}, secretKey,
            {expiresIn: "15m"}
        )
}


export const generateRefreshToken =  (
    userId: string,
    secretKey: string) : string => {
        return jwt.sign({userId}, secretKey,
            {expiresIn: "7d"}
        )
}