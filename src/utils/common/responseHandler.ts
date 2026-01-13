import { StatusCodes, ReasonPhrases } from "http-status-codes";
import type { Response } from "express";


interface ApiSuccessResponse <T> {
    success : true,
    data : T,
    message : string
}

interface ApiErrorResponse {
  success : false,
  message : string
}


export const SuccessResponse = <T> (
  res : Response,
  data : T,
  message : string = ReasonPhrases.OK,            // If caller does not pass message, it becomes "OK".
  statusCode : number = StatusCodes.OK           
) : Response<ApiSuccessResponse <T>> => {        // This function returns an Express Response whose JSON body matches ApiSuccessResponse<T>.
  return res.status(statusCode).json({
    success : true,
    data,
    message
  })
}



export const ErrorResponse = (
  res : Response,
  message : string = ReasonPhrases.INTERNAL_SERVER_ERROR,
  statusCode : number = StatusCodes.INTERNAL_SERVER_ERROR
) : Response <ApiErrorResponse> => {
  return res.status(statusCode).json({
    success : false,
    message
  })
}