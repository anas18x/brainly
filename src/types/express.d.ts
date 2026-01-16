// this file only contains type declarations
import type { JwtPayload } from "./jwt.ts"
import { AuthInput } from "../schemas/auth.schema.ts";


// Whenever TS sees Express.Request anywhere in this project, it should also assume it has a property called validatedData of type AuthInput.
declare global {
    namespace Express {
      interface Request {
        validatedData ?: AuthInput,
        userInfo ?: JwtPayload,
        cookies : Record <string, string>
      }
    }
}

