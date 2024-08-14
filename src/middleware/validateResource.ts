import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateResource =
	(schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
	async (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (schema) {
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
