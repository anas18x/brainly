import type { NextFunction, Request, Response } from "express";
import { loginService, logoutService, registerService, changePasswordService, refreshTokenService } from "./auth.service.js";
import  StatusCodes from "http-status-codes";
import { SuccessResponse } from "../../utils/common/responseHandler.js";


export const registerController = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const user = await registerService(req.body)
        SuccessResponse(res, user, "User registered successfully", StatusCodes.CREATED)
    } catch (error) {
        next(error)
    }
}


export const loginController = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {

    try{
        const result = await loginService(req.body)

        res.cookie(
            "accessToken",
            result.accessToken,
            {
                httpOnly: true,         // JavaScript cannot access it. document.cookie cannot read token
                sameSite: "strict",
                maxAge: 15 * 60 * 1000  // 15 minutes
            })

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true, 
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
            })
    
        SuccessResponse(res, {user: result.user}, "Login successful", StatusCodes.OK)

    } catch (error){
        next(error)
    }

}


export const logoutController = async (
    req : Request,
    res : Response, 
    next : NextFunction
) => {
    try{
        await logoutService(req.user!.userId)
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        SuccessResponse(res, null, "Logout successful", StatusCodes.OK)

    } catch(error){
        next(error)
    }

}


export const changePasswordController = async (
    req : Request,
    res : Response, 
    next : NextFunction
) => {

    try{
        await changePasswordService(req.user!.userId, req.body)
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        SuccessResponse(res, null, "Password changed successfully. Please log in again.", StatusCodes.OK)

    } catch(error){
        next(error)
    }

}


export const refreshTokenController = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {

    try{
        const result = await refreshTokenService(req.cookies.refreshToken)

        res.cookie(
            "accessToken",
            result.accessToken,
            {
                httpOnly: true,         
                sameSite: "strict",
                maxAge: 15 * 60 * 1000  
            })
        
        SuccessResponse(res, null, "Token refreshed successfully", StatusCodes.OK)    

    } catch(error){
        next(error)
    }
    
}