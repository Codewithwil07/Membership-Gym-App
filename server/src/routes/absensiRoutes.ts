import express from "express";
import { AbsensiController } from "../controllers/absensiController";
import { protectRoute } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/AdminOnly";

const router = express.Router();

// ✅ Absensi scan QR user (cek kartu aktif & simpan absensi)
router.post("/", protectRoute, AbsensiController.absen);

// ✅ Get all absensi untuk admin (pagination + search)
router.get("/", protectRoute, adminOnly, AbsensiController.getAbsensi24Jam);

router.get("/member/:id", protectRoute, AbsensiController.getByUserId);

export default router;
