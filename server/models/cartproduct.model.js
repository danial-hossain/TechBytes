import mongoose from "mongoose";

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
export default CartProductModel;
/*
 Cart er structure ta kirokom setar jonno
 productId → the ID of the product added to the cart. Required.
quantity → how many of this product the user wants. Defaults to 1.
userId → links the cart item to a specific user. Uses MongoDB ObjectId and references the User collection. Required.
Timestamps: createdAt and updatedAt are automatically added.
*/