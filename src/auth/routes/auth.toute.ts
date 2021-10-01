import { Router } from 'express';
import { AuthController } from '../contollers/auth.controller';

export const authRouter: Router = Router();
const authController = new AuthController();
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
