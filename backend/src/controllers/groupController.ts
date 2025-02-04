import { Request, Response } from "express";
import Group from "../models/Group";
import User from "../models/User";

interface AuthRequest extends Request {
    userId?: string;
}

export const createGroup = async (req: AuthRequest, res: Response) => {
    try {
        const { groupName, members } = req.body;
        const createdBy = req.userId;

        if (!createdBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!groupName || !Array.isArray(members)) {
            return res.status(400).json({ message: "Invalid input values" });
        }

        const group = new Group({ groupName, createdBy, members: [createdBy, ...members] });
        await group.save();

        await User.updateMany({ _id: { $in: [createdBy, ...members] } }, { $push: { groups: group._id } });

        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserGroups = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId; 

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const groups = await Group.find({ members: userId });

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getGroupDetails = async (req: AuthRequest, res: Response) => {
    try {
        const groupId = req.params.groupId;

        const group = await Group.findById(groupId).populate("members", "name email");

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateGroup = async (req: AuthRequest, res: Response) => {
    try {
        const groupId = req.params.groupId;
        const { groupName } = req.body;

        if (!groupName) {
            return res.status(400).json({ message: "Group name is required" });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (req.userId !== String(group.createdBy)) {
            return res.status(403).json({ message: "Only the group creator can update this group" });
        }

        group.groupName = groupName;
        await group.save();

        res.status(200).json({ message: "Group updated successfully", group });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteGroup = async (req: AuthRequest, res: Response) => {
    try {
        const groupId = req.params.groupId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (req.userId !== String(group.createdBy)) {
            return res.status(403).json({ message: "Only the group creator can delete this group" });
        }

        await group.deleteOne();

        await User.updateMany({ groups: groupId }, { $pull: { groups: groupId } });

        res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
