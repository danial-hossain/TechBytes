// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";


// Routers
import userRouter from "./route/user.route.js";
import armRouter from "./category/arm.js";
import electronicsRouter from "./category/electronics.js";
import laptopRouter from "./category/laptop.js";
import desktopRouter from "./category/desktop.js";
import legsRouter from "./category/legs.js";
import cartRouter from "./routes/cart.js";
import reportRouter from "./routes/report.route.js";
import helpRouter from "./routes/help.route.js";
import homeRouter from "./routes/home.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import searchRouter from "./routes/search.route.js";

// ✅ Import product routers
import armProductRouter from "./product/arm.js"; // <- single arm product
import electronicsProductRouter from "./product/electronics.js";

import laptopProductRouter from "./product/laptop.js";
import desktopProductRouter from "./product/desktop.js";
import legsProductRouter from "./product/legs.js";

// You can similarly import electronicsProductRouter, etc.
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// ===== ROUTES =====
app.use("/api/user", userRouter);
app.use("/api/arm", armRouter);           // All Arm products
app.use("/api/arm-product", armProductRouter); // Single Arm product by ID
app.use("/api/electronics", electronicsRouter);
app.use("/api/electronics-product", electronicsProductRouter);

app.use("/api/laptops", laptopRouter);
app.use("/api/laptop-product", laptopProductRouter);

app.use("/api/desktop", desktopRouter);
app.use("/api/desktop-product", desktopProductRouter);

app.use("/api/legs", legsRouter);
app.use("/api/legs-product", legsProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/report", reportRouter);
app.use("/api/help", helpRouter);
app.use("/api/home", homeRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/search", searchRouter);

app.use("/api/product", productRouter);

// ===== DATABASE + SERVER =====
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`✅ Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  });
