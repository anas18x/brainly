import type { Request, Response, NextFunction } from "express"
import { ErrorResponse } from "../utils/common/responseHandler.js"
import { StatusCodes } from "http-status-codes"
import {  AuthSchema } from "../schemas/auth.schema.js"


export const AuthInputvalidator = ( req:Request, res:Response, next:NextFunction) => {

        const parsedData = AuthSchema.safeParse(req.body)
        if(!parsedData.success){
           return ErrorResponse(res, "Invalid email or password format", StatusCodes.NOT_ACCEPTABLE)
        }

        req.validatedData = parsedData.data
        next()
}