import { Request, Response } from 'express';

class Cookie {
	public setAccessToken(res: Response, token: string): void {
		res.cookie('accessToken', token, {
			maxAge: 60 * 60 * 1000, // 60 minutes
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/',
		});
	}

	public setRefreshToken(res: Response, token: string): void {
		res.cookie('refreshToken', token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/',
		});
	}

	public removeToken(res: Response): void {
		res.clearCookie('accessToken', { path: '/' });
		res.clearCookie('refreshToken', { path: '/' });
	}

	public getAccessToken(req: Request): string | undefined {
		return req.cookies['accessToken'];
	}

	public getRefreshToken(req: Request): string | undefined {
		return req.cookies['refreshToken'];
	}
}

export default new Cookie();
