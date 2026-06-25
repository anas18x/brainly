import type{ Request, Response, NextFunction } from "express";
import {SuccessResponse} from "../../utils/common/responseHandler.js";
import * as brainService from "./brain.service.js";
import { StatusCodes } from "http-status-codes";



export const createBrainController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const userId = req.user!.userId
        const brain = await brainService.createBrain({
            ownerId: userId,
            brainData: req.body,
        })
        SuccessResponse(res, {brain}, "Brain created successfully", StatusCodes.CREATED)

    } catch (error) {
       next(error)
  }}



export const getBrainController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const userId = req.user!.userId
        const brains = await brainService.getBrains({
            ownerId: userId,
            query: req.query,
        })
        SuccessResponse(res, {brains}, "Brains fetched successfully", StatusCodes.OK)

    }   catch (error) {
        next(error)
    }}



export const getBrainByIdController = async (
    req: Request,
    res: Response,  
    next: NextFunction
) => {
    try{
        const brain = await brainService.getBrainById({
            ownerId : req.user!.userId,
            brainId : req.params.id as string
        })
        SuccessResponse(res, {brain}, "Brain fetched successfully", StatusCodes.OK)

    } catch (error) {
        next(error)
    }
}    