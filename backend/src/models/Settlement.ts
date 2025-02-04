import mongoose from "mongoose";

const SettlementSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    payer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    payee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Settlement", SettlementSchema);
