import type { RegisterInput, LoginInput , ChangePasswordInput } from "./auth.schema.js";
import bcrypt from 'bcrypt';
import User from "../users/user.model.js";
import AppError from "../../utils/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken, generateRefreshToken } from "../../utils/common/tokens.js";
import jwt from "jsonwebtoken";
import {ENV} from "../../config/ENV.config.js"


export const getCurrentUser = async (
    userId : string
) => {
    const user = await User.findById(userId).select("username shareSlug isBrainPublic")
    if(!user) throw new AppError("User not found", StatusCodes.NOT_FOUND)

    return {
        id: user._id,
        username: user.username,
        shareSlug: user.shareSlug,
        isBrainPublic: user.isBrainPublic
    }
}



export const register = async (
    payload : RegisterInput
) => {
   
    const existingUser = await User.findOne({username: payload.username})
    if(existingUser){
        throw new AppError("User already exists", StatusCodes.CONFLICT)
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = new User({
        username: payload.username,
        password: hashedPassword
    })
    await user.save();

    return {
        id: user._id,
        username: user.username,
    }
}   



export const login = async (
    payload : LoginInput
) => {

    const user = await User.findOne({
        username : payload.username
    })

    if(!user) throw new AppError("invalid credentials", StatusCodes.UNAUTHORIZED)

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password) 

    if(isPasswordMatched){
        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

        user.refreshToken = hashedRefreshToken
        await user.save()

        return {
            accessToken,
            refreshToken,
            user : {
                id: user._id,
                username: user.username,
            }
        }


    } else {
        throw new AppError("invalid credentials", StatusCodes.UNAUTHORIZED)
    }
}



export const logout = async (
    userId : string
) => {
    const user = await User.findById(userId)
    if(!user) throw new AppError("User not found", StatusCodes.NOT_FOUND)

    user.refreshToken = null
    await user.save()    
}



export const changePassword = async (
    userId : string,
    payload : ChangePasswordInput
) => {

    const user = await User.findById(userId)
    if(!user) throw new AppError("User not found", StatusCodes.NOT_FOUND)

    if(!await bcrypt.compare(payload.oldPassword, user.password)) {
        throw new AppError("Old password is incorrect", StatusCodes.UNAUTHORIZED)
    }
    const hashedNewPassword = await bcrypt.hash(payload.newPassword, 10)
    user.password = hashedNewPassword
    user.refreshToken = null // Invalidate existing refresh tokens on password change
    await user.save()

}



export const refreshToken = async (
    refreshToken : string
) => {
    if(!refreshToken) throw new AppError("Refresh token is missing", StatusCodes.UNAUTHORIZED)

    const decoded = jwt.verify(refreshToken, ENV.JWT_SECRET) as {userId : string}

    const user = await User.findById(decoded.userId)
    if(!user || !user.refreshToken) throw new AppError("Invalid refresh token", StatusCodes.UNAUTHORIZED)   
        
    if(!await bcrypt.compare(refreshToken, user.refreshToken)) {
        throw new AppError("Invalid refresh token", StatusCodes.UNAUTHORIZED)
    }
    
    const accessToken = generateAccessToken(user._id.toString())
    return {accessToken}

}