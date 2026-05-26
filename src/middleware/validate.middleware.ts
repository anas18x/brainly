import type { Request, Response,NextFunction} from "express";
import type { ZodSchema} from "zod";
import { StatusCodes} from "http-status-codes";
import { ErrorResponse} from "../utils/common/responseHandler.js";
import {fromError} from "zod-validation-error";


const validate = ( schema: ZodSchema) => {

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

export default validate;
