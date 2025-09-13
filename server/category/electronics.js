import { Router } from "express";
import Category from "../models/category.model.js";

const electronicsRouter = Router();
const ELECTRONICS_CATEGORY_ID = "68bdb82f195b330f4a1187d0";

// GET all electronics
electronicsRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(ELECTRONICS_CATEGORY_ID);
    if (!category) return res.status(404).json({ message: "Electronics not found" });
    res.json(category.products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET single product by id
electronicsRouter.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(ELECTRONICS_CATEGORY_ID);
    if (!category) return res.status(404).json({ message: "Electronics not found" });

    const product = category.products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default electronicsRouter;
