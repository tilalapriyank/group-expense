import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { createGroup, getUserGroups, getGroupDetails, deleteGroup, joinGroup } from "../controllers/groupController";

const router = express.Router();

router.post("/", protect, createGroup);
router.get("/", protect, getUserGroups);
router.get("/:groupId", protect, getGroupDetails);
router.delete("/:groupId", protect, deleteGroup);
router.post("/join", protect, joinGroup);

export default router;
