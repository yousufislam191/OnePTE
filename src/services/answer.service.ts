import { HttpCode } from '../constants';
import { HttpError } from '../middleware/errorHandler';
import Answer from '../models/answer.model';
import Question from '../models/question.model';
import RMMCQ from '../models/rmmcq.model';

class AnswerService {
	public async submitAnswer(
		userId: number,
		questionId: number,
		answerData: string | number[]
	): Promise<void> {
		const question = await Question.findByPk(questionId, {
			attributes: ['type', 'rmmcq_id'],
		});

		if (!question) {
			throw new HttpError(HttpCode.NOT_FOUND, 'Question not found');
		}

		let score = 0;
		let maxScore = 0;

		switch (question.type) {
			case 'SST':
				({ score, maxScore } = this.calculateSSTScore(answerData as string));
				break;

			case 'RO':
				({ score, maxScore } = this.calculateROScore(answerData as number[]));
				break;

			case 'RMMCQ':
				if (question.rmmcq_id) {
					const details = await RMMCQ.findByPk(question.rmmcq_id, {
						attributes: ['correct_options'],
					});

					if (details) {
						({ score, maxScore } = this.calculateRMMCQScore(
							answerData as number[],
							details.correct_options
						));
					}
				}
				break;

			default:
				throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid question type');
		}

		await Answer.create({
			user_id: userId,
			question_id: questionId,
			answer: answerData,
			score,
			max_score: maxScore,
		});
	}

	private calculateROScore(answerData: number[]): {
		score: number;
		maxScore: number;
	} {
		let score = 0;

		// Compare adjacent pairs
		for (let i = 0; i < answerData.length - 1; i++) {
			if (answerData[i] < answerData[i + 1]) {
				score += 1;
			}
		}

		const maxScore = answerData.length - 1;
		return { score: Math.min(score, maxScore), maxScore };
	}

	private calculateRMMCQScore(
		answerData: number[],
		correctOptions: number[]
	): { score: number; maxScore: number } {
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

		return { score: Math.max(0, Math.min(score, maxScore)), maxScore };
	}

	private calculateSSTScore(answerData: string): {
		score: number;
		maxScore: number;
	} {
		let score = 0;
		const maxScore = 10;

		// Fake scoring mechanism for SST:
		// Assigning random values within the range of 0 to 2 for each component.

		const contentScore = Math.floor(Math.random() * 3);
		const formScore = Math.floor(Math.random() * 3);
		const grammarScore = Math.floor(Math.random() * 3);
		const vocabularyScore = Math.floor(Math.random() * 3);
		const spellingScore = Math.floor(Math.random() * 3);

		score =
			contentScore + formScore + grammarScore + vocabularyScore + spellingScore;

		return { score: Math.min(score, maxScore), maxScore };
	}
}

export default new AnswerService();
