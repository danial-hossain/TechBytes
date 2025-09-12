import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDb from "./config/db.js";

import authRoutes from "./routes/auth.js";
import reportRoutes from "./category/report.js"; // ✅ IMPORT report route
console.log("MONGO_URL from .env:", process.env.MONGO_URL);


// Connect to MongoDB
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON body

// Test route
app.get("/", (req, res) => { 
  res.send("API is running...");
});

// Auth routes
app.use("/api/auth", authRoutes);

// ✅ Report routes
app.use("/api/report", reportRoutes);

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
