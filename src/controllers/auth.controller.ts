import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { ILogin } from '../interface/auth.interface';
import { BaseController } from '../shared/baseController';
import { HttpCode } from '../constants';

class AuthController extends BaseController {
	public login = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			const input: ILogin = req.body;
			const result = await authService.login(res, input);
			this.sendResponse(req, res, {
				status: HttpCode.OK,
				success: true,
				message: 'Successfully logged in',
				data: result,
			});
		}
	);

	public logout = this.handleAsync(
		async (req: Request, res: Response): Promise<void> => {
			await authService.logout(res);
			this.sendResponse(req, res, {
				status: HttpCode.OK,
				success: true,
				message: 'Successfully logged out',
			});
		}
	);
}

export default new AuthController();
