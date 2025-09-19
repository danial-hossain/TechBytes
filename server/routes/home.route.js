// routes/home.routes.js
import { Router } from "express";
import Category from "../models/category.model.js";

const homeRouter = Router();
const FEATURED_CATEGORY_ID = "66f2f07f4f0f5d4a9a8a7d31"; // 👈 your Featured _id

// GET featured products
homeRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(FEATURED_CATEGORY_ID);
    if (!category) return res.status(404).json({ message: "Featured not found" });
    res.json(category.products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default homeRouter;
