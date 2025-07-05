import { Router } from "express";
import { LaporanKeuanganController } from "../controllers/transaksiController";
import { protectRoute } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/AdminOnly";

const router = Router();

router.get("/transaksi-data", protectRoute, adminOnly, LaporanKeuanganController.getAll);
router.get("/laporan-keuangan", protectRoute, adminOnly, LaporanKeuanganController.getLaporan);

export default router;
