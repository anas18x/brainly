import type { Request, Response, NextFunction } from "express"
import {z} from 'zod'
import { ErrorResponse } from "../utils/common/responseHandler.js"
import { StatusCodes } from "http-status-codes"

export const AuthInputvalidator = ( req:Request, res:Response, next:NextFunction) => {
        const requiredBody = z.object({
            email : z.string().email("invalid email format").min(3).max(100),
            password : z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password must not exceed 20 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        })
    
        const parsedData = requiredBody.safeParse(req.body)
        if(!parsedData.success){
           return ErrorResponse(res, parsedData.error.format(), StatusCodes.NOT_ACCEPTABLE)
        }

        req.validatedData = parsedData.data
        next()
}