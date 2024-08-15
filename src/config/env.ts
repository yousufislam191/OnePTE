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
	JWT_ACCESS_SECRET: string;
	JWT_ACCESS_EXPIRES_IN: string;
	JWT_REFRESH_SECRET: string;
	JWT_REFRESH_EXPIRES_IN: string;
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
	JWT_ACCESS_SECRET: process.env.JWT_SECRET || 'myaccesssecret',
	JWT_ACCESS_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '5m',
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'myrefreshsecret',
	JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};

export { envs };
