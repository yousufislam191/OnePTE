import { Request, Response } from 'express';
import userService from '../services/user.service';
import { IUserRegistrationInput } from '../interface/user.interface';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';
import { IType } from '../interface/question.interface';

class UserController extends BaseController {
	public register = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const input: IUserRegistrationInput = req.body;
			await userService.createUser(input);
			this.sendResponse(req, res, {
				status: HttpCode.CREATED,
				success: true,
				message: 'User created successfully',
			});
		}
	);

	public getUserHistory = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const { page = '1', pageSize = '10', type } = req.query;
			const pageNumber = parseInt(page as string, 10) || 1;
			const pageSizeNumber = parseInt(pageSize as string, 10) || 10;

			const result = await userService.getUserHistory(
				parseInt(req.userId as string, 10),
				type as IType,
				pageNumber,
				pageSizeNumber
			);
			this.sendResponse(req, res, {
				status: HttpCode.OK,
				success: true,
				message: 'User history retrieved successfully',
				data: result,
			});
		}
	);
}

export default new UserController();
