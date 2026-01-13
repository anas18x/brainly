import { Router } from "express";
const router = Router()
import authRouter from "../router/auth.route.js";

Router.arguments("/auth",authRouter)

export default router