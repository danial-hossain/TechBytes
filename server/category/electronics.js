import { Router } from "express";
import Category from "../models/category.model.js";

const electronicsRouter = Router();

// Replace with your Electronics category ObjectId
const ELECTRONICS_CATEGORY_ID = "68bdb82f195b330f4a1187d0";

electronicsRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(ELECTRONICS_CATEGORY_ID);
    if (!category) return res.status(404).json({ message: "Electronics not found" });

    res.json(category.products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default electronicsRouter;
