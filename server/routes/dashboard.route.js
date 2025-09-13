import { Router } from "express";
import auth from "../middlewares/auth.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import CartProduct from "../models/cartproduct.model.js";
import Report from "../models/report.model.js";
import Help from "../models/help.model.js";

const router = Router();

// ===== DASHBOARD STATS =====
router.get("/", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userCount = await User.countDocuments();
    const orderCount = await CartProduct.countDocuments();
    const reportCount = await Report.countDocuments();
    const helpCount = await Help.countDocuments();

    const categories = await Category.find({}, "products");
    let productCount = 0;
    categories.forEach(cat => (productCount += cat.products.length));

    res.json({ userCount, productCount, orderCount, reportCount, helpCount });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== USERS =====
router.get("/users", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

    const users = await User.find({}, "name email role status createdAt");
    res.json({ users });
  } catch (err) {
    console.error("Dashboard users error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== PRODUCTS =====
router.get("/products", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

    const categories = await Category.find({});
    let products = [];
    categories.forEach(cat => {
      products = products.concat(
        cat.products.map(p => ({
          name: p.name,
          price: p.price,
          photo: p.photo,
          details: p.details,
          category: cat.name,
          _id: p._id, // use Mongoose _id
        }))
      );
    });

    res.json({ products });
  } catch (err) {
    console.error("Dashboard products error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== ADD PRODUCT =====
router.post("/add-product", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

    const { categoryName, name, price, photo, details } = req.body;
    if (!categoryName || !name || !price || !photo || !details)
      return res.status(400).json({ message: "All fields are required" });

    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.products.push({ name, price, photo, details });
    await category.save();

    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== ORDERS =====
router.get("/orders", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

    const orders = await CartProduct.find({});
    res.json({ orders });
  } catch (err) {
    console.error("Dashboard orders error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== REPORTS =====
router.get("/reports", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

    const reports = await Report.find({}).populate("userId", "name email");
    res.json({ reports });
  } catch (err) {
    console.error("Dashboard reports error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== HELPS =====
router.get("/helps", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

    const helps = await Help.find({});
    res.json({ helps });
  } catch (err) {
    console.error("Dashboard helps error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
