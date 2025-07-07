import { Router } from "express";
import { registerSchema } from "../validations/authValidation";
import { AdminController } from "../controllers/adminController";
import { protectRoute, Validate } from "../middlewares/authMiddleware";
import { adminOnly, superadminOnly } from "../middlewares/AdminOnly";

const router = Router();

router.post(
  "/user-tambah",
  Validate(registerSchema),
  protectRoute,
  superadminOnly,
  AdminController.tambahAdmin
);
router.put(
  "/update-admin/:id",
  protectRoute,
  adminOnly,
  AdminController.updateAdmin
);
router.delete(
  "/user-hapus/:id",
  protectRoute,
  adminOnly,
  AdminController.deleteUser
);
router.get(
  "/user-data",
  protectRoute,
  adminOnly,
  AdminController.getAllUsers
);

export default router;
