import { Request, Response } from 'express';
import userService from '../services/user.service';
import { IUserRegistrationInput } from '../interface/user.interface';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';

class UserController extends BaseController {
	public register = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const input: IUserRegistrationInput = req.body;
			await userService.createUser(input);
			this.sendResponse(req, res, {
				status: HttpCode.OK,
				success: true,
				message: 'User created successfully',
			});
		}
	);
}

export default new UserController();
