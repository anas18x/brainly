import { request, type Request, type Response } from "express";  
import { Auth } from "../service/index.js";
import { SuccessResponse } from "../utils/common/responseHandler.js";
import AppError from "../utils/error/AppError.js";
import { StatusCodes } from "http-status-codes";



export async function handleSignUp(req : Request ,res : Response) {
    if (!req.validatedData) 
    throw new AppError("Invalid request data", StatusCodes.BAD_REQUEST);
  
    const { email, password } = req.validatedData;

    try{
        await Auth.signUpService(email , password)
        SuccessResponse(res, null, "signed-up successfull")
    } catch(error){
        throw new AppError("user already exist", StatusCodes.CONFLICT)
    }
}




export async function handleSignIn(req : Request , res : Response){
    if(!req.validatedData)
        throw new AppError("invalid request data", StatusCodes.BAD_REQUEST)

    const {email , password} = req.validatedData
    try{
        const tokens = await Auth.signInService(email,password)
        const {accessToken, refreshToken} = tokens
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure : true,
            sameSite : "strict",
        });
        res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : true,
            sameSite : "strict"
        })

        return SuccessResponse(res, null, "logged in successfully", StatusCodes.OK)

    } catch(error){
        if(error instanceof AppError)
            throw error
 
        throw new AppError("login failed", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



export async function handleLogOut(req : Request, res : Response){
    try{
        res.clearCookie("refreshToken")
        res.clearCookie("accessToken")
        return SuccessResponse(res, null , "logged out", StatusCodes.OK)
    } catch ( error){
        throw new AppError("logout failed", StatusCodes.INTERNAL_SERVER_ERROR)
    } 
}