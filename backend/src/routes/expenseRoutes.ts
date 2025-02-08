import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { addExpense, getGroupExpenses, deleteExpense } from "../controllers/expenseController";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/:groupId", protect, getGroupExpenses);
router.delete("/:expenseId", protect, deleteExpense);

export default router;
