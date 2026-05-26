import type{ NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"
import AppError from "../utils/error/AppError.js"
import {ENV} from "../config/ENV.config.js"

export const authMiddleware = (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    
    try{
        const accessToken = req.cookies.accessToken
        if (!accessToken) {
        return next(new AppError("Unauthorized", StatusCodes.UNAUTHORIZED))
       }
       
       // "I cannot guarantee decoded.userId exists."
       // type assertion -> telling TypeScript that we are sure about the structure of the decoded token
       const decoded = jwt.verify(accessToken, ENV.JWT_SECRET) as {userId : string}

       req.user = {userId: decoded.userId}
       next()

    } catch(error){
        return next(new AppError("Invalid token", StatusCodes.UNAUTHORIZED))
    }
}