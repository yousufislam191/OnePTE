import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {
	API_REQUEST_TIMEOUT_DURATION,
	HttpCode,
	ONE_HUNDRED,
	ONE_THOUSAND,
	SIXTY,
} from './constants';
import { envs } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/index';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

//* Routes
app.use(envs.API_PREFIX, routes);

//* Middleware to handle unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(HttpCode.NOT_FOUND).json({
		success: false,
		message: 'Not Found',
		errors: [{ path: req.path, message: 'API Route Not Found' }],
	});
	next();
});

//* Global error handling middleware
app.use(errorHandler);

export { app };
