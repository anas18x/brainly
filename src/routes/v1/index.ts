import {Router} from 'express';
import authRoutes from "../../modules/auth/auth.routes.js"
import brainRoutes from "../../modules/brain/brain.routes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/brain", brainRoutes);


export default router;