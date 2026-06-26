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
  }
}



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
  }
}



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



export const updateBrainController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const brain = await brainService.updateBrain({
            ownerId : req.user!.userId,
            brainId : req.params.id as string,
            brainData : req.body
        })
        SuccessResponse(res, {brain}, "Brain updated successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}  



export const deleteBrainController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await brainService.deleteBrain({
            ownerId: req.user!.userId,
            brainId: req.params.id as string,
        });
        SuccessResponse(res, null, "Brain deleted successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
}



export const getTagsController = async (
    req: Request,
    res: Response,
    next: NextFunction  
) => {
    try {
        const tags = await brainService.getTags({ ownerId: req.user!.userId });
        SuccessResponse(res, { tags }, "Tags fetched successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
}



export const enableBrainSharingController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await brainService.enableBrainSharing({ userId: req.user!.userId });
        SuccessResponse(res, { result }, "Brain sharing enabled successfully", StatusCodes.OK);

    } catch (error) {
        next(error);
    }
}



export const getPublicBrainController = async (
    req: Request,
    res: Response,  
    next: NextFunction
) => {
    try{
        const brain = await brainService.getPublicBrain({
            shareSlug : req.params.shareSlug as string
        })
        SuccessResponse(res, {brain}, "Public brain fetched successfully", StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}



export const disableBrainSharingController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await brainService.disableBrainSharing({ userId: req.user!.userId });
        SuccessResponse(res, null, "Brain sharing disabled successfully", StatusCodes.OK);
    } catch (error) {
        next(error);
    }
}