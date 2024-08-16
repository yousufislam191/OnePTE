import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import questionRoutes from './question.routes';
import answerRoutes from './answer.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
router.use('/answer', answerRoutes);

export default router;
