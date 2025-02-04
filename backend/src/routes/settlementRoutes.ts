import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { createSettlement, getGroupSettlements, updateSettlement } from "../controllers/settlementController";

const router = express.Router();

router.post("/", protect, createSettlement);
router.get("/:groupId", protect, getGroupSettlements);
router.put("/:settlementId", protect, updateSettlement);

export default router;
