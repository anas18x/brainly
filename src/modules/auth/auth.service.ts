import type { RegisterInput, LoginInput } from "./auth.schema.js";
import bcrypt from 'bcrypt';
import User from "../users/user.model.js";
import AppError from "../../utils/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken, generateRefreshToken } from "../../utils/common/tokens.js";


export const registerService = async (
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




export const loginService = async (
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

        user.refreshToken = refreshToken
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

