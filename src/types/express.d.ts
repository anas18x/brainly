import { jwtPayload } from "../../utils/common/tokens.js";


// telling TypeScript : Express Request ALSO has a user property.

"Express Request ALSO has a user property."
declare global {
    namespace Express {
        interface Request {
            // combine JwtPayload with custom fields
            user ?: jwtPayload & {
                userId : string
            }
        }
    }
}