import { Router } from "express";
import Category from "../models/category.model.js";

const armRouter = Router();

// Replace with the actual ObjectId of the Arm category from MongoDB
const ARM_CATEGORY_ID = "68bdb82f195b330f4a1187cd";

armRouter.get("/", async (req, res) => {
  try {
    const category = await Category.findById(ARM_CATEGORY_ID);

    if (!category) {
      return res.status(404).json({ message: "Arm category not found" });
    }

    res.json(category.products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default armRouter;
