const dotEnv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
	const envFilePath = `.env.${process.env.NODE_ENV}`;
	dotEnv.config({ path: envFilePath });
} else {
	dotEnv.config();
}

interface IEnv {
	NODE_ENV: string;
	SERVER_PORT: number;
	ALLOWED_ORIGINS: string[];
	APPLICATION_NAME: string;
	API_PREFIX: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_LOGIN_NAME: string;
	DB_LOGIN_PASSWORD: string;
	DB_NAME: string;
}

const envs: IEnv = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	SERVER_PORT: parseInt(process.env.SERVER_PORT || '3001', 10),
	ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || [
		'http://localhost:3000',
	],
	APPLICATION_NAME: process.env.APPLICATION_NAME || 'OnePTE',
	API_PREFIX: process.env.API_PREFIX || '/api/v1',
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
	DB_LOGIN_NAME: process.env.DB_LOGIN_NAME || 'root',
	DB_LOGIN_PASSWORD: process.env.DB_LOGIN_PASSWORD || 'root',
	DB_NAME: process.env.DB_NAME || 'onepte',
};

export { envs };
