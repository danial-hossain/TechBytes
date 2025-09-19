import { Router } from "express";
import Category from "../models/category.model.js";

const armProductRouter = Router();
const ARM_CATEGORY_ID = "68bdb82f195b330f4a1187cd";

armProductRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const category = await Category.findById(ARM_CATEGORY_ID);

    if (!category)
      return res.status(404).json({ message: "Arm category not found" });

    // 🔹 Debugging logs
    console.log("Available product IDs in this category:", category.products.map(p => p._id.toString()));
    console.log("Requested productId:", productId);

    // ✅ Find product by MongoDB _id
    const product = category.products.find(p => p._id.toString() === productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default armProductRouter;
