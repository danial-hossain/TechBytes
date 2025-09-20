import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    product_details: [
      {
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],
    paymentId: { type: String, default: "" },
    payment_status: { type: String, default: "pending" },
    delivery_address: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    subTotalAmt: { type: Number, default: 0 },
    totalAmt: { type: Number, default: 0 },
    invoice_receipt: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
