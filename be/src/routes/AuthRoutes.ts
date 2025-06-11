import { Router } from "express";
import { Validate } from "../middlewares/validate";
import { registerSchema } from "../validations/authValidation";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/register", Validate(registerSchema), AuthController.register);
router.post("/login", AuthController.login);

export default router;
