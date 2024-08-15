import { HttpCode } from '../constants';

export type IApiResponse<T> = {
	status: HttpCode;
	success: boolean;
	message?: string | null;
	data?: T | null;
};
