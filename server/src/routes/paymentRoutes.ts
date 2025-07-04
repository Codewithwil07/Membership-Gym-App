// src/routes/paymentRoutes.ts
import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { protectRoute } from "../middlewares/authMiddleware";

const router = Router();
router.post("/create", protectRoute, PaymentController.createPayment);
router.post("/webhook", PaymentController.handleWebhook);
export default router;
