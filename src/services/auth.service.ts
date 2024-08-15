import { Request, Response } from 'express';
import { HttpCode } from '../constants';
import { ILogin } from '../interface/auth.interface';
import { IId } from '../interface/user.interface';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/user.model';
import cookie from '../utils/cookie';
import { comparePassword } from '../utils/encryptedPassword';
import { createJWT } from '../utils/createJWT';
import { envs } from '../config/env';

class AuthService {
	public async login(req: Request, res: Response, data: ILogin): Promise<IId> {
		const isExist = await User.findOne({ where: { email: data.email } });
		if (!isExist) {
			throw new HttpError(
				HttpCode.NOT_FOUND,
				`User not found with this email ${data.email}`
			);
		} else if (!(await comparePassword(data.password, isExist.password))) {
			throw new HttpError(HttpCode.UNAUTHORIZED, 'Wrong password');
		} else {
			cookie.setAccessToken(
				res,
				createJWT(
					{
						userId: isExist.id,
					},
					envs.JWT_ACCESS_SECRET,
					envs.JWT_ACCESS_EXPIRES_IN
				)
			);

			cookie.setRefreshToken(
				res,
				createJWT(
					{
						userId: isExist.id,
					},
					envs.JWT_REFRESH_SECRET,
					envs.JWT_REFRESH_EXPIRES_IN
				)
			);

			const user: IId = {
				id: isExist.id,
			};

			return user as IId;
		}
	}
}

export default new AuthService();
