import { Router } from 'express';
import AuthMiddleware from '../middleware/auth';
import questionController from '../controllers/question.controller';

const router = Router();

router.get('/', AuthMiddleware.isLoggedIn, questionController.getQuestions);

export default router;
