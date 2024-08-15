import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IApiResponse } from '../interface/response.interface';

class BaseController {
	protected handleAsync =
		(fn: RequestHandler) =>
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				await fn(req, res, next);
			} catch (error) {
				next(error);
			}
		};

	protected sendResponse<T>(
		_req: Request,
		res: Response,
		data: IApiResponse<T>
	): Response {
		const responseData: IApiResponse<T> = {
			status: data.status,
			success: data.success,
			message: data.message || null,
			data: data.data || null || undefined,
		};

		return res.status(data.status).json(responseData);
	}
}

export { BaseController };
