import { Router } from 'express';
import { getProfileController, loginUserController, logoutController, registerUserController, verifyEmailController } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const userRouter = Router();

// Register routes
userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);  // ✅ corrected
userRouter.post('/login', loginUserController);

// Logout route
userRouter.get('/logout', auth, logoutController);
userRouter.get('/profile', auth, getProfileController);

export default userRouter;