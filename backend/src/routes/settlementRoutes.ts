import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    createBulkSettlements,
    getGroupSettlements,
    updateSettlement,
    deleteAllSettlements,
    getMySettlements
} from "../controllers/settlementController";

const router = express.Router();

router.get("/", protect, getMySettlements);
router.post("/bulk", protect, createBulkSettlements);
router.get("/group/:groupId", protect, getGroupSettlements);
router.patch("/:settlementId", protect, updateSettlement);
router.delete("/group/:groupId", protect, deleteAllSettlements);

export default router;
