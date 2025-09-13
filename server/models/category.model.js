import mongoose from "mongoose";

// Only define _id, do NOT manually require id
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  details: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema], // _id will be generated automatically
});

const Category = mongoose.model("Category", categorySchema, "category");

export default Category;
