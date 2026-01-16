import { Router } from "express";
const authRouter = Router()
import { AuthController } from "../../controller/index.js";
import { AuthInputvalidator } from "../../middlewares/inputValidator.middleware.js";
import { AuthMiddleware } from "../../middlewares/index.js";

authRouter.post("/register", 
    AuthInputvalidator,
    AuthController.handleSignUp)

authRouter.post("/login",
    AuthInputvalidator,
    AuthController.handleSignIn)

authRouter.post("/logout",
    AuthMiddleware.verifyToken,
    AuthController.handleLogOut
)

// authRouter.post("/refresh-token",)

// authRouter.post("/reset-password")

export default authRouter
