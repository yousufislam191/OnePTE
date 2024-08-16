import { HttpCode } from '../constants';
import { IType } from '../interface/question.interface';
import { HttpError } from '../middleware/errorHandler';
import Question from '../models/question.model';
import RMMCQ from '../models/rmmcq.model';
import RO from '../models/ro.model';
import SST from '../models/sst.model';
import { paginate, paginatedResults } from '../utils/pagination';

class QuestionService {
	public async getAllQuestions(
		type?: IType,
		page: number = 1,
		pageSize: number = 10
	) {
		const whereClause = type ? { type } : {};
		const paginationParams = paginate(page, pageSize);
		return await paginatedResults(Question, {
			where: whereClause,
			limit: paginationParams.limit,
			offset: paginationParams.offset,
		});
	}

	public async getQuestionById(id: number) {
		const question = await Question.findByPk(id);
		if (!question)
			throw new HttpError(HttpCode.NOT_FOUND, 'Question not found');

		let details = null;
		if (question.type === 'SST' && question.sst_id) {
			details = await SST.findByPk(question.sst_id);
		} else if (question.type === 'RO' && question.ro_id) {
			details = await RO.findByPk(question.ro_id);
		} else if (question.type === 'RMMCQ' && question.rmmcq_id) {
			details = await RMMCQ.findByPk(question.rmmcq_id);
		}

		return {
			...question.toJSON(),
			details: details ? details.toJSON() : null,
		};
	}
}

export default new QuestionService();
