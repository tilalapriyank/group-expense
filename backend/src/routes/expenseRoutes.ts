import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { addExpense, getGroupExpenses, updateExpense, deleteExpense } from "../controllers/expenseController";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/:groupId", protect, getGroupExpenses);
router.put("/:expenseId", protect, updateExpense);
router.delete("/:expenseId", protect, deleteExpense);

export default router;
