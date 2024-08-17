import { app } from './app';
import { connectDB } from './config/db';
import { envs } from './config/env';
import './models/user.model'; // Import models to ensure they are initialized
import './models/answer.model';
import './models/question.model';
import './models/rmmcq.model';
import './models/sst.model';
import './models/ro.model';
import './models/associations';

const startServer = async () => {
	try {
		await connectDB();

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
