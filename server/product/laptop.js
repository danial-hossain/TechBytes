// server/routes/laptopProduct.js
import { Router } from "express";
import Category from "../models/category.model.js";

const laptopProductRouter = Router();
const LAPTOP_CATEGORY_ID = "68bdb82f195b330f4a1187ce"; // your laptop category

laptopProductRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const category = await Category.findById(LAPTOP_CATEGORY_ID);
    if (!category) return res.status(404).json({ message: "Laptop category not found" });

    const product = category.products.find(p => p._id.toString() === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default laptopProductRouter;
