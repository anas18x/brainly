import bcrypt from "bcrypt"
import { UserModel } from "../models/index.js"
import AppError from "../utils/error/AppError.js"
import { StatusCodes } from "http-status-codes"
import { generateAccessToken, generateRefreshToken } from "../utils/common/generateToken.js"
import { ENV } from "../config/ENV.config.js"


export const signUpService = async (email : string , password : string) => {
    const encryptedPassword = await bcrypt.hash(password, 5)
    await UserModel.User.create({
        email : email,
        password : encryptedPassword
    })
}



export const signInService = async (email : string , password:string) => {
    const findUser = await UserModel.User.findOne({email})
    if(!findUser){
        throw new AppError("user not found", StatusCodes.NOT_FOUND)
    }

    const passwordMatch = await bcrypt.compare(password,findUser.password) 
    if(passwordMatch){
        const accessToken = generateAccessToken(findUser._id.toString(), findUser.email, ENV.JWT_SECRET)

        const refreshToken = generateRefreshToken(findUser._id.toString(), ENV.JWT_SECRET)

        return {accessToken, refreshToken}

    } else {
        throw new AppError("invalid credentials", StatusCodes.UNAUTHORIZED)
    }
}