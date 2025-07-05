// src/routes/paymentRoutes.ts
import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { protectRoute } from "../middlewares/authMiddleware";

const router = Router();
router.post("/create", protectRoute, PaymentController.createPayment);
router.post("/notification", PaymentController.handleWebhook);

router.get("/history", protectRoute, PaymentController.getUserPaymentHistory);
export default router;
router.get("/ping", (req, res) => {
  console.log("PING RECEIVED");
  res.json({ message: "Pong" });
});
