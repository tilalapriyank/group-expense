import { Request, Response } from "express";
import Expense from "../models/Expense";
import Group from "../models/Group";
import mongoose from "mongoose";

interface AuthRequest extends Request {
    userId?: string;
}

export const addExpense = async (req: AuthRequest, res: Response) => {
    try {
        const { groupId, paidBy, amount, description, splitDetails } = req.body;

        if (!groupId || !paidBy || !amount || amount <= 0 || !description || !splitDetails) {
            return res.status(400).json({ message: "Invalid input values" });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        if (!group.members.includes(paidBy)) {
            return res.status(403).json({ message: "User is not a member of this group" });
        }

        const expense = new Expense({ groupId, paidBy, amount, description, splitDetails });
        await expense.save();

        await Group.findByIdAndUpdate(groupId, { $push: { expenses: expense._id } });

        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getGroupExpenses = async (req: AuthRequest, res: Response) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - No user ID found" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        const memberIds = group.members.map(member => member.toString());

        if (!memberIds.includes(userObjectId.toString())) {
            return res.status(403).json({ message: "Unauthorized - You are not a member of this group" });
        }

        const expenses = await Expense.find({ groupId })
            .populate("paidBy", "name")
            .populate("splitDetails.userId", "name");

        res.status(200).json({ message: "Expense get successfully", expenses });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
    try {
        const { expenseId } = req.params;

        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (req.userId !== String(expense.paidBy)) {
            return res.status(403).json({ message: "Unauthorized to delete this expense" });
        }

        await expense.deleteOne();

        await Group.findByIdAndUpdate(expense.groupId, { $pull: { expenses: expenseId } });

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
