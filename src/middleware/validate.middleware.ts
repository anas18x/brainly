import type { Request, Response,NextFunction} from "express";
import type { ZodSchema} from "zod";
import { StatusCodes} from "http-status-codes";
import { ErrorResponse} from "../utils/common/responseHandler.js";
import {fromError} from "zod-validation-error";


export const validate = ( schema: ZodSchema) => {

  // FUNCTION that RETURNS middleware
  return ( req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const validationErrors = fromError(result.error)
      return ErrorResponse( res, validationErrors.message ,StatusCodes.BAD_REQUEST);
    }

    req.body = result.data;

    next();
  };
};



export const validateQuery = ( schema: ZodSchema) => {
  return ( req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const validationErrors = fromError(result.error)
      return ErrorResponse( res, validationErrors.message ,StatusCodes.BAD_REQUEST);
    }

    next();
  }
}


export const validateParams = ( schema: ZodSchema) => {
  return ( req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      const validationErrors = fromError(result.error)
      return ErrorResponse( res, validationErrors.message ,StatusCodes.BAD_REQUEST);
    }
    next();
  }
}
