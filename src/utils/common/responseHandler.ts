import { StatusCodes, ReasonPhrases } from "http-status-codes";
import type { Response } from 'express';



/**
 * 
 * @param res Express Response object
 * @param data payload data 
 * @param message success message to be sent in the response, default is "OK"
 * @param statusCode http status code for the response, default is 200 (OK)
 * @returns 
 */
export const SuccessResponse = <T>(
    res : Response,
    data : T,                                  // "I don't know the data type beforehand, caller will provide it."
    message : string = ReasonPhrases.OK,
    statusCode : number = StatusCodes.OK
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    })
}




/**
 * 
 * @param res Express Response object
 * @param message Error message
 * @param statusCode Http satus code
 * @param error optional detailed errors
 * @returns 
 */
export const ErrorResponse = (
    res : Response,
    message : string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode : number = StatusCodes.INTERNAL_SERVER_ERROR,
    error? : any
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error
    })
}