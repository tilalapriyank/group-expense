import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Profile from "../models/Profile";
import User from "../models/User";

interface AuthRequest extends Request {
    userId?: string
}

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const profile = await Profile.findOne({ userId: req.userId }).populate("userId", "name email");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    const { name, email, upiId } = req.body;

    try {
        await User.findByIdAndUpdate(req.userId, { name, email });

        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.userId },
            { upiId },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const changePasswordProfile = async (req: AuthRequest, res: Response) => {
    const { password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(req.userId, { password: hashedPassword });

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Server error" });
    }
};
