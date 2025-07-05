import { Router } from "express";
import { UserController } from "../controllers/userController";
import { protectRoute } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile/:id", protectRoute, UserController.getProfileById);
router.put("/profile/:id", protectRoute, UserController.updateProfile);

export default router;
