import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import { envs } from './env';
import loggerService from '../services/logger.service';

const options: ConnectOptions = {
	serverSelectionTimeoutMS: 5000,
};

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(
			envs.NODE_ENV === 'production'
				? envs.DB_URL || envs.DB_HOST
				: envs.DB_HOST,
			options
		);
		console.log('MongoDB database connection established successfully');

		mongoose.connection.on('error', (err) =>
			loggerService.error(
				'After establishing connection there has been an error:',
				err
			)
		);
	} catch (error) {
		loggerService.error('Could not connect to MongoDB database', error);
		throw error; // Re-throw the error for handling in calling function (index.ts)
	}
};

export { connectDB };
