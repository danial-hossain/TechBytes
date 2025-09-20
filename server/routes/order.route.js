import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import auth from "../middlewares/auth.js"; // <-- your existing middleware

const router = express.Router();

// Use auth middleware to protect the order route
router.post("/", auth, createOrder);

export default router;
