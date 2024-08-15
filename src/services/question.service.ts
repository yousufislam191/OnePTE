import { IType } from '../interface/question.interface';
import Question from '../models/question.model';
import RMMCQ from '../models/rmmcq.model';
import RO from '../models/ro.model';
import SST from '../models/sst.model';

class QuestionService {
	public async getAllQuestions(type?: IType) {
		const whereClause = type ? { type } : {};
		return await Question.findAll({ where: whereClause });
	}
}

export default new QuestionService();
