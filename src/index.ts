import { app } from './app';
import { connectDB } from './config/db';
import { envs } from './config/env';
import defineAssociations from './models/associations';

const startServer = async () => {
	try {
		await connectDB();

		// Set up sequelize associations for models
		defineAssociations();

		app.listen(envs.SERVER_PORT, () => {
			console.log(
				`Server is running on port http://localhost:${envs.SERVER_PORT}`
			);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
