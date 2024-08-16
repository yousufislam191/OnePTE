import { Request, Response } from 'express';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';
import answerService from '../services/answer.service';

class AnswerController extends BaseController {
	public submitAnswer = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const id = parseInt(req.userId as string, 10);
			const { questionId, answerData } = req.body;
			const result = await answerService.submitAnswer(
				id,
				parseInt(questionId),
				answerData
			);
			this.sendResponse(req, res, {
				status: HttpCode.CREATED,
				success: true,
				message: 'Answer submitted successfully',
				data: result,
			});
		}
	);
}

export default new AnswerController();
