import { Router } from 'express';
import answerController from '../controllers/answer.controller';
import AuthMiddleware from '../middleware/auth';
import validateResource from '../middleware/validateResource';
import { submitAnswerSchema } from '../validations/answer.validation';

const router = Router();

router.post(
	'/',
	AuthMiddleware.isLoggedIn,
	validateResource(submitAnswerSchema),
	answerController.submitAnswer
);

export default router;
