import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import { envs } from './env';

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
		// if (error instanceof Error)
		// 	throw new HttpError(500, `Error creating database: ${error.message}`);
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

		// Try to synchronize the User model with the database
		try {
			await sequelize.sync({ force: false }); // Set force to true to drop and recreate the table
			console.log('Model synchronized with database');
		} catch (error) {
			console.log('Model not synchronized with database', error);
			// if (error instanceof Error)
			// 	throw new HttpError(
			// 		500,
			// 		`Database synchronization error: ${error.message}`
			// 	);
		}
	} catch (error) {
		console.log('Unable to connect to the database', error);
		// if (error instanceof Error)
		// 	throw new HttpError(
		// 		500,
		// 		`Unable to connect to the database: ${error.message}`
		// 	);
	}
};

export { connectDB, sequelize };
