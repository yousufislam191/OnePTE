import { Router } from 'express';
import validateResource from '../middleware/validateResource';
import { loginValidation } from '../validations/auth.validation';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', validateResource(loginValidation), authController.login);
router.post('/logout', authController.logout);

export default router;
