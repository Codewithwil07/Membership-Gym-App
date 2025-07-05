import { Router } from "express";
import { UserController } from "../controllers/userController";
import { protectRoute } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/profile/:id", protectRoute, UserController.getProfileById);
router.put("/profile/:id", protectRoute, UserController.updateProfile);

router.put("/profile/:id/photo", upload.single("photo"), UserController.updateProfilePhoto);
export default router;
