import { Router } from "express";
import { PaketController } from "../controllers/paketController";
import { Validate } from "../middlewares/authMiddleware";
import { createPaketSchema, updatePaketSchema } from "../validations/paketValidation";
import { protectRoute } from "../middlewares/authMiddleware";
import { adminOnly, superadminOnly } from "../middlewares/AdminOnly";

const router = Router();

router.post(
  "/paket-tambah",
  protectRoute,
  adminOnly,
  Validate(createPaketSchema),
  PaketController.create
);
router.get("/paket", protectRoute, PaketController.getAll);
router.get("/paket/:id", protectRoute, PaketController.getById);
router.put("/paket-update/:id", protectRoute, adminOnly, Validate(updatePaketSchema), PaketController.update);
router.delete("/paket-hapus/:id", protectRoute, adminOnly, PaketController.remove);

export default router;
