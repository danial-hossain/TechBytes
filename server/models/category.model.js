import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },   // Product unique id
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String },
  details: { type: String },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema],
});

// Force collection name
const Category = mongoose.model("Category", categorySchema, "category");

export default Category;
