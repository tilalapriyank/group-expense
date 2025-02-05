import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/userController";

const router = express.Router();

router.get("/:userId", protect, getUser);

export default router;
