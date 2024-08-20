import { Response } from 'express';
import { HttpCode } from '../constants';
import { ILogin } from '../interface/auth.interface';
import { IId } from '../interface/user.interface';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/user.model';
import cookie from '../utils/cookie';
import { comparePassword } from '../utils/encryptedPassword';
import { createJWT, verifyJWT } from '../utils/createJWT';
import { envs } from '../config/env';

class AuthService {
	public async login(res: Response, data: ILogin): Promise<IId> {
		const user = await User.findOne({ where: { email: data.email } });

		if (!user) {
			throw new HttpError(
				HttpCode.NOT_FOUND,
				`User not found with this email ${data.email}`
			);
		}

		if (!(await comparePassword(data.password, user.password))) {
			throw new HttpError(HttpCode.UNAUTHORIZED, 'Wrong password');
		}

		const accessToken = createJWT(
			{ userId: user.id },
			envs.JWT_ACCESS_SECRET,
			envs.JWT_ACCESS_EXPIRES_IN
		);
		const refreshToken = createJWT(
			{ userId: user.id },
			envs.JWT_REFRESH_SECRET,
			envs.JWT_REFRESH_EXPIRES_IN
		);

		cookie.setAccessToken(res, accessToken);
		cookie.setRefreshToken(res, refreshToken);

		return { id: user.id };
	}

	public async logout(res: Response): Promise<void> {
		cookie.removeToken(res);
	}

	public async generateRefreshToken(res: Response, token: any): Promise<void> {
		if (!token)
			throw new HttpError(HttpCode.NOT_FOUND, 'Refresh toekn not found');

		const decoded: any = verifyJWT(token, envs.JWT_REFRESH_SECRET);
		const accessToken = createJWT(
			{ userId: decoded.userId },
			envs.JWT_ACCESS_SECRET,
			envs.JWT_ACCESS_EXPIRES_IN
		);

		cookie.setAccessToken(res, accessToken);
	}
}

export default new AuthService();
