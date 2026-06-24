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