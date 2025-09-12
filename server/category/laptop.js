// server/category/laptop.js
import { Router } from "express";
import Category from "../models/category.model.js";

const laptopRouter = Router();

// ✅ MongoDB Laptop category ObjectId
const LAPTOP_CATEGORY_ID = "68bdb82f195b330f4a1187ce";

// ===== GET all laptops =====
laptopRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(LAPTOP_CATEGORY_ID);

    if (!category) {
      return res.status(404).json({ message: "Laptop category not found" });
    }

    // Send the products array
    res.status(200).json(category.products);
  } catch (error) {
    console.error("Error fetching laptops:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default laptopRouter;
