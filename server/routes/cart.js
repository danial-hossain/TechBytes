// routes/cart.js
import { Router } from "express";
import CartProduct from "../models/cartproduct.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

/**
 * ➕ Add item to cart
 * Protected route → requires JWT
 */
cartRouter.post("/add", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; // ✅ from auth middleware

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "userId, productId, and quantity required",
      });
    }

    let cartItem = await CartProduct.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartProduct.create({ userId, productId, quantity });
      await User.findByIdAndUpdate(userId, {
        $push: { shopping_cart: cartItem._id },
      });
    }

    res.json({ success: true, cartItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🛒 Get cart items for logged-in user
 */
cartRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.userId; // ✅ from JWT
    const cartItems = await CartProduct.find({ userId });

    // Fetch all products from categories
    const categories = await Category.find({});
    const allProducts = categories.flatMap((c) => c.products);
    const productMap = new Map(allProducts.map((p) => [p.id, p]));

    const cartWithProducts = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      product: productMap.get(item.productId) || null,
    }));

    res.json({ success: true, cart: cartWithProducts });
  } catch (error) {
    console.error("Fetch cart error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🔄 Update quantity of a cart item
 */
cartRouter.put("/update/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be >= 1" });
    }

    const cartItem = await CartProduct.findById(itemId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    // Ensure the item belongs to the logged-in user
    if (cartItem.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ success: true, cartItem });
  } catch (error) {
    console.error("Update cart quantity error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🗑️ Delete item from cart
 */
cartRouter.delete("/delete/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const cartItem = await CartProduct.findById(itemId);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    // Ensure the item belongs to the logged-in user
    if (cartItem.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await CartProduct.findByIdAndDelete(itemId);
    await User.findByIdAndUpdate(cartItem.userId, { $pull: { shopping_cart: itemId } });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Delete cart item error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default cartRouter;
