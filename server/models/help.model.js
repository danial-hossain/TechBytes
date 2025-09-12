import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Help = mongoose.model("Help", helpSchema);
export default Help;
