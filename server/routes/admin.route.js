import { Router } from "express";
import auth from "../middlewares/auth.js";
import User from "../models/user.model.js";

const router = Router();

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (admin only)
 */
router.get("/users", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser || currentUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    // fetch users without sending password hash
    const users = await User.find().select("-password");

    res.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
