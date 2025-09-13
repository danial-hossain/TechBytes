// server/category/legs.js
import { Router } from "express";
import Category from "../models/category.model.js";

const legsRouter = Router();

// ✅ MongoDB Prosthetic Legs category ObjectId
const LEGS_CATEGORY_ID = "68bdb82f195b330f4a1187d1";

// ===== GET all prosthetic legs =====
legsRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(LEGS_CATEGORY_ID);

    if (!category) {
      return res.status(404).json({ message: "Prosthetic legs category not found" });
    }

    res.status(200).json(category.products);
  } catch (error) {
    console.error("Error fetching prosthetic legs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default legsRouter;
