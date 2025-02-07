import { Request, Response } from "express";
import Settlement from "../models/Settlement";
import Group from "../models/Group";
import mongoose from "mongoose";

interface AuthRequest extends Request {
    userId?: string;
}

// Create a single settlement
export const createSettlement = async (req: AuthRequest, res: Response) => {
    try {
        const { groupId, payer, payee, amount } = req.body;

        if (!groupId || !payer || !payee || !amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid input values" });
        }

        if (req.userId !== payer && req.userId !== payee) {
            return res.status(403).json({ message: "Unauthorized to settle this payment" });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (!group.members.includes(payer) || !group.members.includes(payee)) {
            return res.status(400).json({ message: "Payer or Payee is not a member of this group" });
        }

        const settlement = new Settlement({ groupId, payer, payee, amount });
        await settlement.save();

        res.status(201).json({ message: "Settlement created successfully", settlement });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Bulk create settlements
export const createBulkSettlements = async (req: AuthRequest, res: Response) => {
    try {
        const { transactionList } = req.body;

        if (!Array.isArray(transactionList) || transactionList.length === 0) {
            return res.status(400).json({ message: "Invalid settlements data" });
        }

        const bulkSettlements = transactionList.map(settlement => ({
            groupId: settlement.groupId,
            payer: settlement.payer,
            payee: settlement.payee,
            amount: settlement.amount,
            status: settlement.status || "pending",
        }));

        const result = await Settlement.insertMany(bulkSettlements);

        res.status(201).json({ message: "Bulk settlements created successfully", settlements: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get settlements by group
export const getGroupSettlements = async (req: AuthRequest, res: Response) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - No user ID found" });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ message: "Unauthorized - You are not a member of this group" });
        }

        const settlements = await Settlement.find({ groupId }).populate("payer payee", "name email");

        res.status(200).json(settlements);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get settlements by payer
export const getSettlementsByPayer = async (req: AuthRequest, res: Response) => {
    try {
        const payerId = req.params.payerId;
        const settlements = await Settlement.find({ payer: payerId }).populate("groupId payee", "groupName name email");

        res.status(200).json(settlements);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get settlements by payee
export const getSettlementsByPayee = async (req: AuthRequest, res: Response) => {
    try {
        const payeeId = req.params.payeeId;
        const settlements = await Settlement.find({ payee: payeeId }).populate("groupId payer", "groupName name email");

        res.status(200).json(settlements);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update settlement
export const updateSettlement = async (req: AuthRequest, res: Response) => {
    try {
        const { settlementId } = req.params;
        const { status } = req.body;

        if (!settlementId || !status) {
            return res.status(400).json({ message: "Settlement ID and status are required" });
        }

        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const settlement = await Settlement.findById(settlementId);
        if (!settlement) {
            return res.status(404).json({ message: "Settlement not found" });
        }

        if (req.userId !== String(settlement.payer) && req.userId !== String(settlement.payee)) {
            return res.status(403).json({ message: "Unauthorized to update this settlement" });
        }

        if (settlement.status === "completed") {
            return res.status(400).json({ message: "This settlement is already completed" });
        }

        settlement.status = status;
        await settlement.save();

        res.status(200).json({ message: "Settlement updated successfully", settlement });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete settlement
export const deleteSettlement = async (req: AuthRequest, res: Response) => {
    try {
        const { settlementId } = req.params;

        const settlement = await Settlement.findById(settlementId);
        if (!settlement) {
            return res.status(404).json({ message: "Settlement not found" });
        }

        if (req.userId !== String(settlement.payer) && req.userId !== String(settlement.payee)) {
            return res.status(403).json({ message: "Unauthorized to delete this settlement" });
        }

        await settlement.deleteOne();

        res.status(200).json({ message: "Settlement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
