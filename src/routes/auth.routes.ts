import { Router } from 'express';
import controllers from '../controllers';

const authRoutes = Router();
const { authController } = controllers;

authRoutes.post('/register', authController.register)
// authRoutes.post('/login', authController.login)


export default authRoutes;