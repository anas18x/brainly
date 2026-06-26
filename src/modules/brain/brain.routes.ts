import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate, validateQuery , validateParams} from "../../middleware/validate.middleware.js";
import { createBrainSchema , getBrainsQuerySchema, brainIdParamsSchema, updateBrainSchema, shareSlugParamsSchema} from "./brain.schema.js";
import { createBrainController , getBrainController, getBrainByIdController, updateBrainController, deleteBrainController, getTagsController , enableBrainSharingController, getPublicBrainController, disableBrainSharingController} from "./brain.controller.js";


const router = Router()

// Static routes first
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


router.get("/tags",
    authMiddleware, 
    getTagsController
)


router.post("/share",
    authMiddleware,
    enableBrainSharingController
)


router.patch("/share",
    authMiddleware,
    disableBrainSharingController
)


router.get("/share/:shareSlug",
    validateParams(shareSlugParamsSchema),
    getPublicBrainController
)


//  Dynamic routes last
router.get("/:id",
    authMiddleware, 
    validateParams(brainIdParamsSchema),
    getBrainByIdController
)


router.patch("/:id",
    authMiddleware, 
    validateParams(brainIdParamsSchema),
    validate(updateBrainSchema), 
    updateBrainController
)


router.delete("/:id",
  authMiddleware,
  validateParams(brainIdParamsSchema),
  deleteBrainController,
);


export default router;