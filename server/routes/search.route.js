// server/routes/search.route.js
import { Router } from "express";
import Category from "../models/category.model.js";

const router = Router();

/**
 * GET /api/search?q=term
 * Search across all products in all categories
 */
router.get("/", async (req, res) => {
  const query = req.query.q || "";

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    // Find categories with matching product names
    const categories = await Category.find({
      "products.name": { $regex: query, $options: "i" },
    });

    // Extract matching products and attach their category slug
    const results = categories.flatMap((category) =>
      category.products
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((product) => ({
          ...product.toObject(),
          categorySlug: category.name.toLowerCase(), // ✅ needed for frontend
        }))
    );

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
