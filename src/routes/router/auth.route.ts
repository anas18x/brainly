import { Router } from "express";
const authRouter = Router()
import { AuthController } from "../../controller/index.js";

authRouter.post("/register", AuthController.handleSignUp)

authRouter.post("/login", AuthController.handleSignIn)

// authRouter.post("/logout",)

// authRouter.post("/refresh-token",)

// authRouter.post("/reset-password")

export default authRouter
