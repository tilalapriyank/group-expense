import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { getProfile, updateProfile, changePasswordProfile } from "../controllers/profileController";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/update", protect, updateProfile);
router.post("/change-password", protect, changePasswordProfile);

export default router;
