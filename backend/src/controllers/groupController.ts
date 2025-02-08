import { Request, Response } from "express";
import Group from "../models/Group";
import User from "../models/User";
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: string;
}

export const createGroup = async (req: AuthRequest, res: Response) => {
    try {
        const { groupName } = req.body;
        const createdBy = req.userId;

        if (!createdBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!groupName) {
            return res.status(400).json({ message: "Invalid input values" });
        }
        const groupCode = Math.random().toString(36).substring(2, 10);

        const group = new Group({ groupName, createdBy, members: [createdBy], groupCode });
        await group.save();

        await User.updateMany({ _id: { $in: [createdBy] } }, { $push: { groups: group._id } });

        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserGroups = async (req: AuthRequest, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        const groups = await Group.find({ members: userId }).populate("members", "name");

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

export const joinGroup = async (req: AuthRequest, res: Response) => {
    try {
        const { groupCode } = req.body; 
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - No userId provided" });
        }

        if (!groupCode) {
            return res.status(400).json({ message: "Group code is required" });
        }

        const group = await Group.findOne({ groupCode });

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (group.members.includes(userId)) {
            return res.status(400).json({ message: "You are already a member of this group" });
        }

        group.members.push(userId);
        await group.save();

        await User.findByIdAndUpdate(userId, { $push: { groups: group._id } });

        res.status(200).json({ message: "Successfully joined the group", group });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};