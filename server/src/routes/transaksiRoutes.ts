import { Router } from "express";
import { TransaksiController } from "../controllers/transaksiController";
import { protectRoute } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/AdminOnly";

const router = Router();

router.post("/transaksi-manual", protectRoute, TransaksiController.createManual);
router.get("/transaksi-data", protectRoute, adminOnly, TransaksiController.getAll);
router.get("/transaksi/:id", protectRoute, adminOnly, TransaksiController.getById);
router.patch("/transaksi-verify/:id", protectRoute, adminOnly, TransaksiController.verify);

export default router;
