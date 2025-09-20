import Order from "../models/order.model.js";
import Cart from "../models/cartproduct.model.js"; // import your cart model
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    const { products, delivery_address, subTotalAmt, totalAmt } = req.body;
    const userId = req.userId; // <-- get from auth middleware

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

    // Create order
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

    // Clear user's cart
    await Cart.deleteMany({ userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully and cart cleared",
      data: newOrder,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
