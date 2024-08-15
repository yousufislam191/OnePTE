import { IType } from '../interface/question.interface';
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
}

export default new QuestionService();
