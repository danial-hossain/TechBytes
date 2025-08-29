import { Router } from 'express';
import { loginUserController, logoutController, registerUserController, verifyEmailController } 
from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const userRouter = Router();

// Register routes
userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);  // ✅ corrected
userRouter.post('/login', loginUserController);

// Logout route
userRouter.get('/logout', auth, logoutController);

export default userRouter;
