// routes/user.route.js
import { Router } from "express";
import {
  getProfileController,
  updateProfileController,
  loginUserController,
  logoutController,
  registerUserController,
  verifyEmailController,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

// Auth routes
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutController);

// Profile routes
userRouter.get("/profile", auth, getProfileController);
userRouter.put("/update", auth, updateProfileController); // ✅ matches frontend

export default userRouter;
