import { Router } from 'express';
import AuthMiddleware from '../middleware/auth';
import questionController from '../controllers/question.controller';
import validateResource from '../middleware/validateResource';
import { createQuestionSchema } from '../validations/question.validation';
import { uploadMultiple } from '../middleware/fileUploader';

const router = Router();

router.get('/', AuthMiddleware.isLoggedIn, questionController.getQuestions);

router.get(
	'/:id(\\d+)',
	AuthMiddleware.isLoggedIn,
	questionController.getQuestionById
);

router.post(
	'/',
	AuthMiddleware.isLoggedIn,
	AuthMiddleware.isAdmin,
	uploadMultiple,
	validateResource(createQuestionSchema),
	questionController.createQuestion
);

export default router;
