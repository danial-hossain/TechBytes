// server/category/desktop.js
import { Router } from "express";
import Category from "../models/category.model.js";

const desktopRouter = Router();

// ✅ MongoDB Desktop category ObjectId
const DESKTOP_CATEGORY_ID = "68bdb82f195b330f4a1187cf";

// ===== GET all desktops =====
desktopRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(DESKTOP_CATEGORY_ID);

    if (!category) {
      return res.status(404).json({ message: "Desktop category not found" });
    }

    // Send the products array
    res.status(200).json(category.products);
  } catch (error) {
    console.error("Error fetching desktops:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default desktopRouter;
