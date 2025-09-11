import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import armRouter from './category/arm.js';
import cartRouter from './routes/cart.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Test route
app.get('/', (req, res) => {
  res.json({ message: `Server is running on port ${process.env.PORT}` });
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/arm", armRouter);
app.use("/api/cart", cartRouter);

// DB + Server start
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to DB', err);
    process.exit(1);
  });
