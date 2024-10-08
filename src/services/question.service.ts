import { HttpCode } from '../constants';
import { IType } from '../interface/question.interface';
import { HttpError } from '../middleware/errorHandler';
import Question from '../models/question.model';
import RMMCQ from '../models/rmmcq.model';
import RO from '../models/ro.model';
import SST from '../models/sst.model';
import { paginate, paginatedResults } from '../utils/pagination';

class QuestionService {
	private shuffleArrayWithIndices(
		array: string[]
	): { index: number; value: string }[] {
		const indexedArray = array.map((value, index) => ({ index, value }));

		for (let i = indexedArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indexedArray[i], indexedArray[j]] = [indexedArray[j], indexedArray[i]];
		}

		return indexedArray;
	}

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
		const question = await Question.findByPk(id, {
			attributes: ['id', 'type', 'title', 'sst_id', 'ro_id', 'rmmcq_id'],
		});

		if (!question)
			throw new HttpError(HttpCode.NOT_FOUND, 'Question not found');

		let details = null;
		if (question.type === 'SST' && question.sst_id) {
			details = await SST.findByPk(question.sst_id, {
				attributes: ['id', 'audio_files', 'time_limit'],
			});
		} else if (question.type === 'RO' && question.ro_id) {
			details = await RO.findByPk(question.ro_id, {
				attributes: ['id', 'paragraphs'],
			});

			if (details && details.paragraphs) {
				const shuffledParagraphs = this.shuffleArrayWithIndices(
					details.paragraphs
				);
				details = { ...details.toJSON(), paragraphs: shuffledParagraphs };
			}
		} else if (question.type === 'RMMCQ' && question.rmmcq_id) {
			details = await RMMCQ.findByPk(question.rmmcq_id, {
				attributes: ['id', 'passage', 'options'],
			});

			if (details && details.options) {
				const shuffledOptions = this.shuffleArrayWithIndices(details.options);
				details = { ...details.toJSON(), options: shuffledOptions };
			}
		}

		return {
			id: question.id,
			type: question.type,
			title: question.title,
			details: details,
		};
	}

	public async createQuestion(data: any, files: any) {
		const {
			type,
			title,
			time_limit,
			paragraphs,
			passage,
			options,
			correct_options,
			speakers,
		} = data;

		let audioFiles: { fileUrl: string; speaker: string }[] = [];

		// Creating object containing audio files and speakers
		if (files && files['audio_files']) {
			audioFiles = files['audio_files'].map((file: any, index: number) => ({
				fileUrl: file.path,
				speaker: speakers && speakers[index] ? speakers[index] : 'Unknown',
			}));
		}

		// Validate audioFiles separately
		if (type === 'SST' && (audioFiles.length === 0 || !speakers)) {
			if (audioFiles.length === 0)
				throw new HttpError(
					HttpCode.BAD_REQUEST,
					'Audio files are required for SST type questions'
				);
			if (!speakers)
				throw new HttpError(
					HttpCode.BAD_REQUEST,
					'Speakers are required for SST type questions'
				);
		}

		let questionData: any = { type: type, title: title };
		let details;

		// Store question in database
		if (type === 'SST') {
			details = await SST.create({
				time_limit: parseInt(time_limit as string, 10),
				audio_files: audioFiles,
			});
			questionData = { ...questionData, sst_id: details.id };
		} else if (type === 'RO') {
			details = await RO.create({ paragraphs });
			questionData = { ...questionData, ro_id: details.id };
		} else if (type === 'RMMCQ') {
			details = await RMMCQ.create({ passage, options, correct_options });
			questionData = { ...questionData, rmmcq_id: details.id };
		}

		const question = await Question.create(questionData);

		return { question, details };
	}
}

export default new QuestionService();
