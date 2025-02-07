import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    createSettlement,
    createBulkSettlements,
    getGroupSettlements,
    getSettlementsByPayer,
    getSettlementsByPayee,
    updateSettlement,
    deleteSettlement
} from "../controllers/settlementController";

const router = express.Router();

router.post("/", protect, createSettlement);
router.post("/bulk", protect, createBulkSettlements);
router.get("/group/:groupId", protect, getGroupSettlements);
router.get("/payer/:payerId", protect, getSettlementsByPayer);
router.get("/payee/:payeeId", protect, getSettlementsByPayee);
router.put("/:settlementId", protect, updateSettlement);
router.delete("/:settlementId", protect, deleteSettlement);

export default router;
