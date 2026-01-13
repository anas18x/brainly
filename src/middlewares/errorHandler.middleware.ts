import { ErrorResponse } from "../utils/common/responseHandler.js";
import type { Request, Response, NextFunction } from "express";


export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server Error"
    ErrorResponse(res, message, statusCode)
}
