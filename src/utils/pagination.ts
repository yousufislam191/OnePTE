import { FindAndCountOptions, Model } from 'sequelize';

interface PaginationParams {
	limit: number;
	offset: number;
}

export const paginate = (
	page: number = 1,
	pageSize: number = 10
): PaginationParams => {
	const limit = pageSize;
	const offset = (page - 1) * pageSize;

	return { limit, offset };
};

export const paginatedResults = async <T extends Model>(
	model: { new (): T } & typeof Model, // Using constructor type and Model
	options: FindAndCountOptions
) => {
	const { count, rows } = await model.findAndCountAll(options);
	return {
		totalItems: count,
		totalPages: Math.ceil(count / (options.limit || 10)),
		currentPage: options.offset! / (options.limit || 10) + 1,
		data: rows,
	};
};
