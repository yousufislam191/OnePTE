import { Router } from 'express';
import validateResource from '../middleware/validateResource';
import { loginValidation } from '../validations/auth.validation';
import authController from '../controllers/auth.controller';
import AuthMiddleware from '../middleware/auth';

const router = Router();

router.post('/login', validateResource(loginValidation), authController.login);
router.post('/logout', AuthMiddleware.isLoggedIn, authController.logout);

export default router;
