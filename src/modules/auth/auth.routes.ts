import { Router } from "express";
import  {validate}  from "../../middleware/validate.middleware.js";
import { registerSchema, loginSchema, changePasswordSchema } from "./auth.schema.js";
import { loginController, logoutController, registerController, changePasswordController, refreshTokenController } from "./auth.controller.js";
import {authMiddleware} from "../../middleware/auth.middleware.js";


const router = Router()

router.post("/register",
          validate(registerSchema),
          registerController); 

router.post("/login",
          validate(loginSchema),
          loginController); 

router.post("/logout",
          authMiddleware,
          logoutController);

router.post("/change-password",
          authMiddleware,
          validate(changePasswordSchema),
          changePasswordController)

router.post("/refresh-token",
           refreshTokenController)

export default router;