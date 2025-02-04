import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }]
  },
  { timestamps: true }
);

export default mongoose.model("Group", GroupSchema);
