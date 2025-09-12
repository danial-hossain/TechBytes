import { Router } from "express";
<<<<<<< HEAD
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";
import Category from "../models/category.model.js";
=======
import CartProduct from "../models/cartproduct.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
>>>>>>> upstream/main

const cartRouter = Router();

// ➕ Add item to cart
cartRouter.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: "userId and productId required" });

<<<<<<< HEAD
    let cartItem = await CartProductModel.findOne({ userId, productId });
=======
    let cartItem = await CartProduct.findOne({ userId, productId });
>>>>>>> upstream/main
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
<<<<<<< HEAD
      cartItem = await CartProductModel.create({ userId, productId });
      await UserModel.findByIdAndUpdate(userId, { $push: { shopping_cart: cartItem._id } });
=======
      cartItem = await CartProduct.create({ userId, productId });
      await User.findByIdAndUpdate(userId, { $push: { shopping_cart: cartItem._id } });
>>>>>>> upstream/main
    }

    res.json({ success: true, cartItem });
  } catch (error) {
<<<<<<< HEAD
=======
    console.error("Add to cart error:", error);
>>>>>>> upstream/main
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🛒 Get cart items for a user
cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
<<<<<<< HEAD
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
=======
    const cartItems = await CartProduct.find({ userId });

    const categories = await Category.find({});
    const allProducts = categories.flatMap(c => c.products);
    const productMap = new Map(allProducts.map(p => [p.id, p]));

    const cartWithProducts = cartItems.map(item => ({
      _id: item._id,
      quantity: item.quantity,
      product: productMap.get(item.productId) || null,
    }));

    res.json(cartWithProducts);
  } catch (error) {
    console.error("Fetch cart error:", error);
>>>>>>> upstream/main
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🗑️ Delete item from cart
cartRouter.delete("/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
<<<<<<< HEAD
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
=======
    const cartItem = await CartProduct.findByIdAndDelete(itemId);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    await User.findByIdAndUpdate(cartItem.userId, { $pull: { shopping_cart: itemId } });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Delete cart item error:", error);
>>>>>>> upstream/main
    res.status(500).json({ success: false, error: error.message });
  }
});

export default cartRouter;
