import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    splitDetails: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        shareAmount: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
