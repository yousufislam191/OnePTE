import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import {
	API_REQUEST_TIMEOUT_DURATION,
	HttpCode,
	ONE_HUNDRED,
	ONE_THOUSAND,
	SIXTY,
} from './constants';
import { envs } from './config/env';
import morgan from 'morgan';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan middleware setup for development
if (envs.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

//*  limit repeated requests to public APIs
app.use(
	rateLimit({
		max: ONE_HUNDRED,
		windowMs: SIXTY * SIXTY * ONE_THOUSAND,
		message: 'Too many requests from this IP, please try again in one hour',
	})
);

//* CORS
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || envs.ALLOWED_ORIGINS.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);

//* Middleware to handle request timeout for all routes. Duration has been set to 8 seconds
app.use((req: Request, res: Response, next: NextFunction) => {
	const timeout = setTimeout(() => {
		res.status(HttpCode.REQUEST_TIMEOUT).json({
			success: false,
			message: 'Request Timeout',
			errors: [{ path: req.path, message: 'Request Timeout in this route' }],
		});
		next();
	}, API_REQUEST_TIMEOUT_DURATION);

	res.on('finish', () => clearTimeout(timeout));
	res.on('close', () => clearTimeout(timeout));

	next();
});

app.get('/', (_req: Request, res: Response): Response => {
	return res.status(HttpCode.OK).json({
		success: true,
		message: 'Hello from OnePTE App Backend!!!',
	});
});

export { app };
