import { Router } from "express";
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";
import Category from "../models/category.model.js";

const cartRouter = Router();

// ➕ Add item to cart
cartRouter.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: "userId and productId required" });

    let cartItem = await CartProductModel.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await CartProductModel.create({ userId, productId });
      await UserModel.findByIdAndUpdate(userId, { $push: { shopping_cart: cartItem._id } });
    }

    res.json({ success: true, cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🛒 Get cart items for a user
cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).populate("shopping_cart");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch all products from categories
    const categories = await Category.find({});
    const allProducts = categories.flatMap(c => c.products);
    console.log("All Products:", allProducts);

    // Map category product.id → product
    const productMap = new Map(allProducts.map(p => [p.id, p]));
    console.log("Product Map Keys:", Array.from(productMap.keys()));

    const cartWithProducts = user.shopping_cart.map(item => {
      console.log("Cart Item productId:", item.productId);
      return {
        _id: item._id,
        quantity: item.quantity,
        product: productMap.get(item.productId) || null
      }
    });

    res.json(cartWithProducts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🗑️ Delete item from cart
cartRouter.delete("/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const cartItem = await CartProductModel.findByIdAndDelete(itemId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Remove the item from the user's shopping cart array
    await UserModel.findByIdAndUpdate(cartItem.userId, {
      $pull: { shopping_cart: itemId },
    });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default cartRouter;
