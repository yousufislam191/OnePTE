import { app } from './app';
import { connectDB } from './config/db';
import { envs } from './config/env';

const startServer = async () => {
	try {
		// await connectDB();

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
