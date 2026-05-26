import type{ NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/common/responseHandler.js";
import { StatusCodes } from "http-status-codes";

const errorMiddleware = (
    err : any,
    req : Request,
    res : Response,
    next : NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  return ErrorResponse(res, message, statusCode);
}

export default errorMiddleware;