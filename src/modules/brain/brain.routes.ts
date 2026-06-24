import {Router} from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createBrainSchema } from "./brain.schema.js";
import { createBrainController } from "./brain.controller.js";

const router = Router()

router.post("/create-Brain",authMiddleware, validate(createBrainSchema), createBrainController)


export default router;