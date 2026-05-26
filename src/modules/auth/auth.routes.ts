import { Router } from "express";
import  validate  from "../../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { loginController, registerController } from "./auth.controller.js";

const router = Router()


router.post("/register", validate(registerSchema) , registerController); 
router.post("/login", validate(loginSchema) , loginController); 
router.post("/logout",);
router.post("/refresh-token",)

export default router;