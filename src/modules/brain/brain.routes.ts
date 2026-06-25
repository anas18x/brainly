import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate, validateQuery , validateParams} from "../../middleware/validate.middleware.js";
import { createBrainSchema , getBrainsQuerySchema, brainIdParamsSchema} from "./brain.schema.js";
import { createBrainController , getBrainController, getBrainByIdController } from "./brain.controller.js";


const router = Router()


router.post("/",
    authMiddleware, 
    validate(createBrainSchema), 
    createBrainController
)

 
router.get("/",
    authMiddleware, 
    validateQuery(getBrainsQuerySchema),
    getBrainController
)    


router.get("/:id",
    authMiddleware, 
    validateParams(brainIdParamsSchema),
    getBrainByIdController
)




export default router;