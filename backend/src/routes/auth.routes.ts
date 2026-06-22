import { Router } from 'express';
import { AuthController } from '../controllers/authController';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/register', authController.register.bind(authController));
