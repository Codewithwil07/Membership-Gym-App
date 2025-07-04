import express from "express";
import { BebanOperasionalController } from "../controllers/bebanOperasionalController";
import { protectRoute } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/AdminOnly";

const router = express.Router();

// hanya admin yang boleh kelola
router.post("/", protectRoute, adminOnly, BebanOperasionalController.create);
router.get("/", protectRoute, adminOnly, BebanOperasionalController.getAll);
router.get("/:id", protectRoute, adminOnly, BebanOperasionalController.getById);
router.put("/:id", protectRoute, adminOnly, BebanOperasionalController.update);
router.delete("/:id", protectRoute, adminOnly, BebanOperasionalController.delete);

export default router;
