import mongoose from "mongoose";

<<<<<<< HEAD
const cartProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String, // store category product id
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CartProductModel = mongoose.model("cartProduct", cartProductSchema);
=======
const cartProductSchema = new mongoose.Schema({
  productId: {
    type: String, // category product id
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);
>>>>>>> upstream/main
export default CartProductModel;
