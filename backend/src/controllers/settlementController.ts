import { Request, Response } from "express";
import Settlement from "../models/Settlement";
import Group from "../models/Group";
import Profile from "../models/Profile";

interface AuthRequest extends Request {
    userId?: string;
}


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

        res.status(200).json({ message: "Settlements fetched successfully", settlements });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update settlement
export const updateSettlement = async (req: AuthRequest, res: Response) => {
    try {
        const { settlementId } = req.params;
        const { status } = req.body;

        // Validate request parameters
        if (!settlementId || !status) {
            return res.status(400).json({ message: "Settlement ID and status are required" });
        }

        // Ensure status is either "pending" or "completed"
        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value. Allowed values: pending, completed" });
        }

        // Fetch the settlement
        const settlement = await Settlement.findById(settlementId);
        if (!settlement) {
            return res.status(404).json({ message: "Settlement not found" });
        }

        // Check if the user is authorized to update the settlement
        const isAuthorized = req.userId === String(settlement.payer) || req.userId === String(settlement.payee);
        if (!isAuthorized) {
            return res.status(403).json({ message: "Unauthorized to update this settlement" });
        }

        // Prevent updating an already completed settlement
        if (settlement.status === "completed") {
            return res.status(400).json({ message: "This settlement is already completed" });
        }

        // Update settlement status
        settlement.status = status;
        await settlement.save();

        return res.status(200).json({
            message: "Settlement status updated successfully",
            settlement,
        });

    } catch (error) {
        console.error("Error updating settlement:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Delete settlement
export const deleteAllSettlements = async (req: AuthRequest, res: Response) => {
    try {
        const { groupId } = req.params;
        const settlements = await Settlement.find({ groupId });
        if (settlements.length === 0) {
            return res.status(404).json({ message: "No settlements found for this group" });
        }
        await Settlement.deleteMany({ groupId });
        res.status(200).json({ message: "All settlements deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getMySettlements = async (req: AuthRequest, res: Response) => {
    try {
        const settlements = await Settlement.find({
            $or: [{ payer: req.userId }, { payee: req.userId }]
        })
            .populate("groupId", "groupName")
            .populate("payer", "name")
            .populate("payee", "name")
            .lean(); // Converts Mongoose document to a plain object for easier manipulation

        // Fetch Payee UPI IDs
        const payeeIds = settlements.map(settlement => settlement.payee._id);
        const profiles = await Profile.find({ userId: { $in: payeeIds } }).select("userId upiId").lean();

        // Map UPI IDs to settlements
        const settlementsWithUPI = settlements.map(settlement => {
            const payeeProfile = profiles.find(profile => profile.userId.toString() === settlement.payee._id.toString());
            return {
                ...settlement,
                payee: {
                    ...settlement.payee,
                    upiId: payeeProfile ? payeeProfile.upiId : null
                }
            };
        });

        res.status(200).json(settlementsWithUPI);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};