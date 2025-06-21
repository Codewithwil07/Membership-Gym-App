import { Router } from "express";
import { registerSchema } from "../validations/authValidation";
import { AuthController } from "../controllers/authController";
import { Validate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", Validate(registerSchema), AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
