import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import { HttpCode } from '../constants';
import { HttpError } from './errorHandler';

const validateResource =
	(schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
	async (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (schema) {
				let bodyData = req.body.jsonData;

				// Parse `jsonData` as JSON if it's a string
				if (typeof bodyData === 'string') {
					try {
						bodyData = JSON.parse(bodyData);
						req.body = bodyData;
					} catch (error) {
						return next(
							new HttpError(
								HttpCode.BAD_REQUEST,
								'Invalid JSON data format in request body of jsonData field'
							)
						);
					}
				}

				const parsed = schema.safeParse({
					body: req.body,
					params: req.params,
					query: req.query,
					cookies: req.cookies,
				});

				if (!parsed.success) {
					next(parsed.error);
				}

				req.body = parsed.data?.body;
			}
			next();
		} catch (error: any) {
			next(error);
		}
	};

export default validateResource;
