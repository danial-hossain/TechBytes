import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    opinion: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
