import { HttpCode } from '../constants';
import { IType } from '../interface/question.interface';
import { IUserRegistrationInput } from '../interface/user.interface';
import { HttpError } from '../middleware/errorHandler';
import Answer from '../models/answer.model';
import Question from '../models/question.model';
import RMMCQ from '../models/rmmcq.model';
import RO from '../models/ro.model';
import SST from '../models/sst.model';
import User from '../models/user.model';
import { hashPassword } from '../utils/encryptedPassword';
import { paginate, paginatedResults } from '../utils/pagination';

class UserService {
	public async createUser(data: IUserRegistrationInput): Promise<void> {
		const isExist = await User.findOne({ where: { email: data.email } });
		if (isExist) {
			throw new HttpError(HttpCode.CONFLICT, 'User already exists');
		}

		//* if no user is present then make the first user as admin
		const userCount = await User.count();
		const isAdmin = userCount === 0 ? 1 : undefined;

		await User.create({
			name: data.name,
			email: data.email,
			password: await hashPassword(data.password),
			...(isAdmin !== undefined && { isAdmin }), //* it will be applied only if isAdmin value is present
		});
	}

	public async getUserHistory(
		userId: number,
		type?: IType,
		page: number = 1,
		pageSize: number = 10
	): Promise<any> {
		const paginationParams = paginate(page, pageSize);

		const user = await User.findByPk(userId, {
			attributes: ['name'],
		});

		const result = await paginatedResults(Answer, {
			where: { user_id: userId },
			attributes: ['id', 'answer', 'score', 'max_score'],
			include: [
				{
					model: Question,
					as: 'question',
					where: type ? { type } : {},
					attributes: ['id', 'type', 'title'],
					include: [
						{
							model: SST,
							as: 'sst',
							attributes: ['id', 'audio_files', 'time_limit'],
						},
						{
							model: RO,
							as: 'ro',
							attributes: ['id', 'paragraphs'],
						},
						{
							model: RMMCQ,
							as: 'rmmcq',
							attributes: ['id', 'options'],
						},
					],
				},
			],
			limit: paginationParams.limit,
			offset: paginationParams.offset,
		});

		const { totalItems, totalPages, currentPage } = result;

		const formattedData = result.data.map((item: any) => ({
			answer: {
				id: item.id,
				answer: item.answer,
				score: item.score,
				max_score: item.max_score,
			},
			question: {
				id: item.question.id,
				type: item.question.type,
				title: item.question.title,
				sst: item.question.sst,
				ro: item.question.ro,
				rmmcq: item.question.rmmcq,
			},
		}));

		return {
			totalItems,
			totalPages,
			currentPage,
			user,
			history: formattedData,
		};
	}
}

export default new UserService();
