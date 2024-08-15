import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/createJWT';
import { envs } from '../config/env';
import { HttpCode } from '../constants';
import { BaseController } from '../shared/baseController';

class AuthMiddleware extends BaseController {
	public isLoggedIn = this.handleAsync(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			if (req.cookies['accessToken']) {
				const decodedToken = verifyJWT(
					req.cookies['accessToken'],
					envs.JWT_ACCESS_SECRET
				);

				req.userId = decodedToken as any;

				return next();
			}

			this.sendResponse(req, res, {
				status: HttpCode.UNAUTHORIZED,
				success: false,
				message: 'Unauthorized. Please login',
			});
		}
	);

	// async isLoggedIn(
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction
	// ): Promise<void> {
	// 	try {
	// 		if (req.cookies['accessToken']) {
	// 			const decodedToken = verifyJWT(
	// 				req.cookies['accessToken'],
	// 				envs.JWT_ACCESS_SECRET
	// 			);

	// 			req.userId = decodedToken as any;

	// 			return next();
	// 		}
	// 		// res.redirect('/login');
	// 		res
	// 			.status(HttpCode.UNAUTHORIZED)
	// 			.json({ message: 'Unauthorized. Please login' });
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
}

export default new AuthMiddleware();
