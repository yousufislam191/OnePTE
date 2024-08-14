import { Router } from 'express';
import userController from '../controllers/user.controller';
import validateResource from '../middleware/validateResource';
import { registrationValidation } from '../validations/user.validation';

const router = Router();

router.post(
	'/register',
	validateResource(registrationValidation),
	userController.register
);

export default router;
