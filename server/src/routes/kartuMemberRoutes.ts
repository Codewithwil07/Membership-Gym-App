import express from "express";
import { KartuController } from "../controllers/kartuMemberController";
import { protectRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:id", protectRoute, KartuController.getKartuById);

export default router;
