// server/routes/search.route.js
import { Router } from "express";
import Category from "../models/category.model.js"; // centralized category model

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
    // Find categories where at least one product matches the search query
    const categories = await Category.find({
      "products.name": { $regex: query, $options: "i" },
    });

    // Extract matching products from each category
    const results = categories.flatMap(category =>
      category.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
