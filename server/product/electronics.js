import { Router } from "express";
import Category from "../models/category.model.js";

const electronicsProductRouter = Router();
const ELECTRONICS_CATEGORY_ID = "68bdb82f195b330f4a1187d0";

// GET single electronics product by ID
electronicsProductRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const category = await Category.findById(ELECTRONICS_CATEGORY_ID);

    if (!category) return res.status(404).json({ message: "Electronics category not found" });

    // Assuming your products in MongoDB use _id (Mongo ObjectId)
    const product = category.products.find(p => p._id.toString() === productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default electronicsProductRouter;
