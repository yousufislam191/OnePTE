import Answer from '../models/answer.model';

class AnswerService {
	public async submitAnswer(id: number, questionId: number, answerData: any) {
		// return await Answer.create({
		//     user_id: id,
		//     question_id: questionId,
		//     answer_data: answerData,
		//     score: score,
		// });
		const data = {
			user_id: id,
			question_id: questionId,
			answer_data: answerData,
		};
		return data;
	}
}

export default new AnswerService();
