import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";

import userRouter from "./routes/user.route.js";
import armRouter from "./routes/arm.js";
import cartRouter from "./routes/cart.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ===== TEST ROUTE =====
app.get("/", (req, res) => res.json({ message: "API running" }));

// ===== ROUTES =====
app.use("/api/user", userRouter);
app.use("/api/arm", armRouter);
app.use("/api/cart", cartRouter);

// ===== DATABASE + SERVER =====
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 8000}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
