import { Router } from "express";
import CartProduct from "../models/cartproduct.model.js";
//CartProduct → collection of cart items.
import Category from "../models/category.model.js";
import User from "../models/user.model.js";

const cartRouter = Router();
//separate router to handle cart-related endpoints.

// ➕ Add item to cart
cartRouter.post("/add", async (req, res) => {
  //POST /add → add a product to a user’s cart.
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity)
      return res.status(400).json({ message: "userId, productId, and quantity required" });

    let cartItem = await CartProduct.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity; // use frontend quantity
      await cartItem.save();
    } else {
      cartItem = await CartProduct.create({ userId, productId, quantity });
      await User.findByIdAndUpdate(userId, { $push: { shopping_cart: cartItem._id } });
    }

    res.json({ success: true, cartItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🛒 Get cart items for a user
cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await CartProduct.find({ userId });

    const categories = await Category.find({});
    const allProducts = categories.flatMap((c) => c.products);
    const productMap = new Map(allProducts.map((p) => [p.id, p]));

    const cartWithProducts = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      product: productMap.get(item.productId) || null,
    }));

    res.json(cartWithProducts);
  } catch (error) {
    console.error("Fetch cart error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🔄 Update quantity of cart item
cartRouter.put("/update/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1)
      return res.status(400).json({ message: "Quantity must be >= 1" });

    const cartItem = await CartProduct.findByIdAndUpdate(itemId, { quantity }, { new: true });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    res.json({ success: true, cartItem });
  } catch (error) {
    console.error("Update cart quantity error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🗑️ Delete item from cart
cartRouter.delete("/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const cartItem = await CartProduct.findByIdAndDelete(itemId);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    await User.findByIdAndUpdate(cartItem.userId, { $pull: { shopping_cart: itemId } });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Delete cart item error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default cartRouter;
