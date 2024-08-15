import { Request, Response } from 'express';
import questionService from '../services/question.service';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';
import { IType } from '../interface/question.interface';

class QuestionController extends BaseController {
	public getQuestions = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const { page = '1', pageSize = '10', type } = req.query;
			const pageNumber = parseInt(page as string, 10) || 1;
			const pageSizeNumber = parseInt(pageSize as string, 10) || 10;

			const questions = await questionService.getAllQuestions(
				type as IType,
				pageNumber,
				pageSizeNumber
			);

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
