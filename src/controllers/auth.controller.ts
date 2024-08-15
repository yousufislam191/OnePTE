import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { ILogin } from '../interface/auth.interface';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';

class AuthController extends BaseController {
	public login = this.handleAsync(async (req: Request, res: Response) => {
		const input: ILogin = req.body;
		const result = await authService.login(input);
		this.sendResponse(req, res, {
			status: HttpCode.OK,
			success: true,
			message: 'Successfully logged in',
			data: result,
		});
	});
}

export default new AuthController();
