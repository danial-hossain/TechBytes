import Order from "../models/order.model.js";
import Cart from "../models/cartproduct.model.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    const { products, delivery_address, subTotalAmt, totalAmt } = req.body;
    const userId = req.userId; // from auth middleware

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products are required" });
    }

    if (
      !delivery_address ||
      !delivery_address.name ||
      !delivery_address.email ||
      !delivery_address.phone ||
      !delivery_address.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete delivery address is required",
      });
    }

    // 1️⃣ Create order
    const newOrder = new Order({
      userId,
      orderId: uuidv4(),
      product_details: products,
      delivery_address,
      subTotalAmt,
      totalAmt,
      payment_status: "pending",
    });

    await newOrder.save();

    // 2️⃣ Clear user's cart collection
    await Cart.deleteMany({ userId });

    // 3️⃣ Update user: clear shopping_cart and push new order ID into orderHistory
    await User.findByIdAndUpdate(userId, {
      $set: { shopping_cart: [] },
      $push: { orderHistory: newOrder._id },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully, cart cleared, and order saved to history",
      data: newOrder,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * Get all orders of the logged-in user
 */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Fetch orders for this user, sorted by newest first
    const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders: userOrders,
    });
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};