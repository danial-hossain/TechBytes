import { Router } from "express";
import Category from "../models/category.model.js";

const router = Router();

// GET single product by category slug and product ID
router.get("/:categorySlug/:productId", async (req, res) => {
  const { categorySlug, productId } = req.params;

  try {
    // Find category by name (case-insensitive)
    const category = await Category.findOne({
      name: new RegExp(`^${categorySlug}$`, "i"),
    });

    if (!category)
      return res.status(404).json({ message: "Unknown product category!" });

    // Find product inside that category
    const product = category.products.find(
      (p) => p._id?.toString() === productId || p.id === productId
    );

    if (!product) return res.status(404).json({ message: "Product not found!" });

    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
