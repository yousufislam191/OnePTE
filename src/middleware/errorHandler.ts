import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
	ForeignKeyConstraintError,
	TimeoutError,
	ConnectionError,
} from 'sequelize';
import { envs } from '../config/env';
import { HttpCode } from '../constants';

class HttpError extends Error {
	status: number;

	constructor(status: HttpCode, message: string | undefined, stack = '') {
		super(message);
		this.status = status;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (res.headersSent) {
		return next(err);
	}

	let status: HttpCode;
	let message: string;
	let errors: any[];

	if (err instanceof ZodError) {
		// Handle Zod validation errors
		status = HttpCode.BAD_REQUEST;
		message = 'Input Validation error';
		errors = err.issues.map((issue) => ({
			message: issue.message,
			field: issue.path[issue.path.length - 1],
		}));
	} else if (err instanceof ValidationError) {
		// Handle Sequelize validation errors
		status = HttpCode.BAD_REQUEST;
		message = 'Sequelize Validation Error!';
		errors = err.errors.map((error) => ({
			field: error.path,
			message: error.message,
		}));
	} else if (err instanceof UniqueConstraintError) {
		// Handle Sequelize unique constraint violation errors
		status = HttpCode.CONFLICT;
		message = 'Unique constraint error!';
		errors = err.errors.map((error) => ({
			field: error.path,
			message: error.message,
		}));
	} else if (err instanceof DatabaseError) {
		// Handle general Sequelize database errors
		status = HttpCode.INTERNAL_SERVER_ERROR;
		message = 'Database error!';
		errors = [
			{
				message: err.message,
				field: err.name,
			},
		];
	} else if (err instanceof ForeignKeyConstraintError) {
		// Handle foreign key constraint violation errors
		status = HttpCode.BAD_REQUEST;
		message = 'Foreign key constraint error!';
		errors = [
			{
				field: err.index,
				message: err.message,
			},
		];
	} else if (err instanceof TimeoutError) {
		// Handle Sequelize timeout errors
		status = HttpCode.REQUEST_TIMEOUT;
		message = 'Database operation timed out!';
		errors = [
			{
				message: err.message,
			},
		];
	} else if (err instanceof ConnectionError) {
		// Handle connection-related errors
		status = HttpCode.SERVICE_UNAVAILABLE;
		message = 'Database connection error!';
		errors = [
			{
				message: err.message,
			},
		];
	} else if (err instanceof HttpError) {
		// Handle custom HttpErrors
		status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
		message = err.message || 'Something went wrong';
		errors = err.message
			? [
					{
						field: 'error',
						message: err.message,
					},
				]
			: [];
	} else if (err instanceof Error) {
		// Handle other types of errors
		status = HttpCode.INTERNAL_SERVER_ERROR;
		message = err.message || 'Something went wrong';
		errors = err.message
			? [
					{
						field: 'error',
						message: err.message,
					},
				]
			: [];

		if (status === HttpCode.INTERNAL_SERVER_ERROR) {
			const correlationId = req.headers['x-correlation-id'] as string;
			errors.push({
				correlationId: correlationId,
			});
		}
	} else {
		// Handle unknown errors
		status = HttpCode.INTERNAL_SERVER_ERROR;
		message = 'Unknown error';
		errors = [];
		const correlationId = req.headers['x-correlation-id'] as string;
		errors.push({
			correlationId: correlationId,
		});
	}

	return res.status(status).json({
		success: false,
		message,
		errors,
		stack: envs.NODE_ENV !== 'production' ? err.stack : undefined,
	});
};

export { HttpError, errorHandler };
