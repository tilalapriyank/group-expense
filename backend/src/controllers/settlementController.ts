import { Request, Response } from "express";
import Settlement from "../models/Settlement";
import Group from "../models/Group";
import User from "../models/User";
import mongoose from "mongoose";


interface AuthRequest extends Request {
    userId?: string;
}

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


export const getGroupSettlements = async (req: AuthRequest, res: Response) => {
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

        const settlements = await Settlement.find({ groupId }).populate("payer payee", "name email");

        res.status(200).json(settlements);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



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