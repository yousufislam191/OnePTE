import { Router } from 'express';
import answerController from '../controllers/answer.controller';
import AuthMiddleware from '../middleware/auth';

const router = Router();

router.post('/', AuthMiddleware.isLoggedIn, answerController.submitAnswer);

export default router;
