import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // custom product id like 3_htij7g
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Arm', 'Leg'
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
