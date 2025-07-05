import { Router } from "express";
import { registerSchema } from "../validations/authValidation";
import { AuthController } from "../controllers/authController";
import { protectRoute, Validate } from "../middlewares/authMiddleware";
// import { verifyToken } from "../utils/jwtUtils";

const router = Router();

router.post("/register", Validate(registerSchema), AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", protectRoute, AuthController.getMe);

export default router;
