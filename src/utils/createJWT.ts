import JWT from 'jsonwebtoken';
import { HttpError } from '../middleware/errorHandler';
import { HttpCode } from '../constants';

const createJWT = (
	data: object,
	JWTSecretKey: string,
	expiresIn: string
): string => {
	if (typeof data !== 'object' || !data) {
		throw new HttpError(
			HttpCode.BAD_REQUEST,
			'Data must be a non-empty object'
		);
	} else if (typeof JWTSecretKey !== 'string' || JWTSecretKey === '') {
		throw new HttpError(
			HttpCode.BAD_REQUEST,
			'Secret Key must be a non-empty string'
		);
	} else {
		try {
			const token = JWT.sign(data, JWTSecretKey, { expiresIn });
			return token as string;
		} catch (error) {
			throw new HttpError(
				HttpCode.INTERNAL_SERVER_ERROR,
				'Failed to create the JWT'
			);
		}
	}
};

const verifyJWT = (token: string, JWTSecretKey: string): Promise<any> => {
	if (typeof token !== 'string' || token === '') {
		throw new HttpError(
			HttpCode.BAD_REQUEST,
			'Token must be a non-empty string'
		);
	} else if (typeof JWTSecretKey !== 'string' || JWTSecretKey === '') {
		throw new HttpError(
			HttpCode.BAD_REQUEST,
			'Secret Key must be a non-empty string'
		);
	} else {
		try {
			return JWT.verify(token, JWTSecretKey) as any;
		} catch (error) {
			throw new HttpError(
				HttpCode.UNAUTHORIZED,
				'Invalid token. Please login again'
			);
		}
	}
};

export { createJWT, verifyJWT };
