// Copyright 2024 Google LLC
import { Router } from "express";
import Category from "../models/category.model.js";

const electronicsRouter = Router();

// Replace with the ObjectId of your Electronics category
const ELECTRONICS_CATEGORY_ID = "68bdb82f195b330f4a1187d0";

electronicsRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(ELECTRONICS_CATEGORY_ID);

    if (!category) {
      return res.status(404).json({ message: "Electronics category not found" });
    }

    res.json(category.products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default electronicsRouter;
