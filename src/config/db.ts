import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import { envs } from './env';
import { HttpError } from '../middleware/errorHandler';
import { HttpCode } from '../constants';

// Define the options for Sequelize
const sequelize = new Sequelize(
	envs.DB_NAME,
	envs.DB_LOGIN_NAME,
	envs.DB_LOGIN_PASSWORD,
	{
		host: envs.DB_HOST,
		port: envs.DB_PORT,
		dialect: 'mysql',
		dialectModule: mysql2,
		dialectOptions: {
			ssl: envs.DB_HOST !== 'localhost' ? { rejectUnauthorized: false } : false,
		},
	}
);

// Create the database if it doesn't exist
const createDatabase = async (): Promise<void> => {
	const connection = mysql2.createConnection({
		host: envs.DB_HOST,
		port: envs.DB_PORT,
		user: envs.DB_LOGIN_NAME,
		password: envs.DB_LOGIN_PASSWORD,
	});

	try {
		await connection
			.promise()
			.query(`CREATE DATABASE IF NOT EXISTS ${envs.DB_NAME};`);
		console.log('Database created successfully.');
	} catch (error) {
		console.error(`Error creating database: ${error}`);
		throw new HttpError(
			HttpCode.INTERNAL_SERVER_ERROR,
			`Error creating database: ${(error as Error).message}`
		);
	} finally {
		connection.end();
	}
};

const connectDB = async (): Promise<void> => {
	try {
		// Create the database if it doesn't exist
		await createDatabase();

		// Try to authenticate
		await sequelize.authenticate();
		console.log('Database connection has been established successfully.');

		// Try to synchronize the model with the database
		try {
			await sequelize.sync({ force: false }); // Set force to true to drop and recreate the table
			console.log('Database synchronized successfully.');
		} catch (error) {
			console.error('Database synchronization error', error);
			throw new HttpError(
				HttpCode.INTERNAL_SERVER_ERROR,
				`Database synchronization error: ${(error as Error).message}`
			);
		}
	} catch (error) {
		console.error('Unable to connect to the database', error);
		throw new HttpError(
			HttpCode.SERVICE_UNAVAILABLE,
			`Unexpected error occurred while connecting to the database: ${(error as Error).message}`
		);
	}
};

export { connectDB, sequelize };
