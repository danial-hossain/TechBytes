import { Router } from "express";
import Category from "../models/category.model.js";

const legsProductRouter = Router();
const LEGS_CATEGORY_ID = "68bdb82f195b330f4a1187d1";

legsProductRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const category = await Category.findById(LEGS_CATEGORY_ID);

    if (!category) return res.status(404).json({ message: "Legs category not found" });

    const product = category.products.find(p => p._id.toString() === productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default legsProductRouter;
