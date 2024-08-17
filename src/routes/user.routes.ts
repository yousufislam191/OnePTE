import { Router } from 'express';
import userController from '../controllers/user.controller';
import validateResource from '../middleware/validateResource';
import AuthMiddleware from '../middleware/auth';
import { registrationValidation } from '../validations/user.validation';

const router = Router();

router.post(
	'/register',
	validateResource(registrationValidation),
	userController.register
);

router.get(
	'/history',
	AuthMiddleware.isLoggedIn,
	userController.getUserHistory
);

export default router;
