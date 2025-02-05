import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
    userId?: string;
}

export const getUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.find({ _id: userId });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
