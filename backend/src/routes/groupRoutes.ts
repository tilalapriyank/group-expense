import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { createGroup, getUserGroups, getGroupDetails, updateGroup, deleteGroup } from "../controllers/groupController";

const router = express.Router();

router.post("/", protect, createGroup);
router.get("/", protect, getUserGroups);
router.get("/:groupId", protect, getGroupDetails);
router.put("/:groupId", protect, updateGroup);
router.delete("/:groupId", protect, deleteGroup);

export default router;
