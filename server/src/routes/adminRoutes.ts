import { Router } from "express";
import { registerSchema } from "../validations/authValidation";
import { AdminController } from "../controllers/adminController";
import { Validate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/tambah", Validate(registerSchema), AdminController.tambahAdmin);
router.put("/ubah-status-akun/:id", AdminController.updateStatus);
router.delete("/hapus/:id", AdminController.deleteUser);
router.get("/data-users", AdminController.getAllUsers);

export default router;
