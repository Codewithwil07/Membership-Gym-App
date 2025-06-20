import { Router } from "express";
import { registerSchema } from "../validations/authValidation";
import { AuthController } from "../controllers/authController";
import { Validate } from "../middlewares/Authmiddleware";

const router = Router();

router.post("/register", Validate(registerSchema), AuthController.Register);
router.post("/login", AuthController.Login);
router.post("/logout", AuthController.Logout);

export default router;
