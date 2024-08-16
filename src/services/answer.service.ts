import { HttpCode } from '../constants';
import { HttpError } from '../middleware/errorHandler';
import Answer from '../models/answer.model';
import Question from '../models/question.model';
import RMMCQ from '../models/rmmcq.model';
import SST from '../models/sst.model';

class AnswerService {
	public async submitAnswer(id: number, questionId: number, answerData: any) {
		const question = await Question.findByPk(questionId, {
			attributes: ['type', 'sst_id', 'rmmcq_id'],
		});

		if (!question)
			throw new HttpError(HttpCode.NOT_FOUND, 'Question not found');

		let score = 0;
		let details = null;

		switch (question.type) {
			case 'SST':
				if (question.sst_id) {
					details = await SST.findByPk(question.sst_id);
				}
				break;

			case 'RO':
				score = this.calculateROScore(answerData);
				break;

			case 'RMMCQ':
				if (question.rmmcq_id) {
					details = await RMMCQ.findByPk(question.rmmcq_id, {
						attributes: ['correct_options'],
					});

					if (details) {
						score = this.calculateRMMCQScore(
							answerData,
							details.correct_options
						);
					}
				}
				break;

			default:
				throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid question type');
		}

		const data = await Answer.create({
			user_id: id,
			question_id: questionId,
			answer: answerData,
			score: score,
		});

		return data;
	}

	private calculateROScore(answerData: number[]): number {
		let score = 0;

		// Compare adjacent pairs
		for (let i = 0; i < answerData.length - 1; i++) {
			if (answerData[i] < answerData[i + 1]) {
				score += 1;
			}
		}

		const maxScore = answerData.length - 1;
		return Math.min(score, maxScore);
	}

	private calculateRMMCQScore(
		answerData: number[],
		correctOptions: number[]
	): number {
		let score = 0;
		const maxScore = correctOptions.length;

		// Create a Set of correct options for O(1) lookups
		const correctSet = new Set(correctOptions);

		// Calculate score based on correct and incorrect answers
		answerData.forEach((answer) => {
			if (correctSet.has(answer)) {
				score += 1;
			} else {
				score -= 1;
			}
		});

		return Math.max(0, Math.min(score, maxScore));
	}
}

export default new AnswerService();
