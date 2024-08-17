import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/createJWT';
import { envs } from '../config/env';
import { HttpCode } from '../constants';
import { BaseController } from '../shared/baseController';
import User from '../models/user.model';

class AuthMiddleware extends BaseController {
	public isLoggedIn = this.handleAsync(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			if (req.cookies['accessToken']) {
				const decodedToken = await verifyJWT(
					req.cookies['accessToken'],
					envs.JWT_ACCESS_SECRET
				);

				if (decodedToken.userId) {
					req.userId = decodedToken.userId;
					return next();
				}
			}

			this.sendResponse(req, res, {
				status: HttpCode.UNAUTHORIZED,
				success: false,
				message: 'Unauthorized. Please login',
			});
		}
	);

	public isAdmin = this.handleAsync(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const user = await User.findByPk(req.userId, {
				attributes: ['isAdmin'],
			});

			if (user && user.isAdmin) {
				return next();
			}

			this.sendResponse(req, res, {
				status: HttpCode.UNAUTHORIZED,
				success: false,
				message: 'Unauthorized. Please login as an admin',
			});
		}
	);
}

export default new AuthMiddleware();
