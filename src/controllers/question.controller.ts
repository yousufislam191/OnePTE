import { Request, Response } from 'express';
import questionService from '../services/question.service';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';
import { IType } from '../interface/question.interface';

class QuestionController extends BaseController {
	public getQuestions = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const type = req.query.type as IType;
			const questions = await questionService.getAllQuestions(type);

			this.sendResponse(req, res, {
				status: HttpCode.OK,
				success: true,
				message: 'Questions fetched successfully',
				data: questions,
			});
		}
	);
}

export default new QuestionController();
