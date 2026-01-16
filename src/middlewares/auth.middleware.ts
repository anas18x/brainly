import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import { ENV } from "../config/ENV.config.js";
import type { JwtPayload } from "../types/jwt.js";

type UserInfo={
    userInfo ?:JwtPayload ,
    cookies : Record <string, string>
}
export type AuthRequest=Request & UserInfo
export const verifyToken = (
    req : AuthRequest,
    res : Response,
    next : NextFunction,
) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken){
        throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED)
    }

    try{
        const verifyJWT = jwt.verify(accessToken, ENV.JWT_SECRET) as JwtPayload
        req.userInfo=verifyJWT
        next()
    } catch (error){
        throw new AppError("invalid token", StatusCodes.UNAUTHORIZED)
    }
}