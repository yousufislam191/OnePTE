import { z } from 'zod';

const createQuestionSchema = z.object({
	body: z
		.object({
			type: z.enum(['SST', 'RO', 'RMMCQ'], {
				required_error: 'Question type is required',
			}),
			title: z.string({ message: 'Title must be a string' }).min(1, {
				message: 'Title is required',
			}),
			time_limit: z.string({ message: 'Time limit is required' }).optional(), // SST
			paragraphs: z
				.array(z.string({ message: 'Each paragraph must be a string' }))
				.optional(), // RO
			passage: z.string({ message: 'Passage must be a string' }).optional(), // RMMCQ
			options: z
				.array(z.string({ message: 'Each option must be a string' }))
				.optional(), // RMMCQ
			correct_options: z
				.array(z.number({ message: 'Each correct option must be a number' }))
				.optional(), // RMMCQ
		})
		.superRefine((data, ctx) => {
			if (data.type === 'SST') {
				if (!data.time_limit) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Time limit is required for SST',
						path: ['time_limit'],
					});
				}
			}

			if (data.type === 'RO') {
				if (!data.paragraphs) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Paragraphs are required for RO',
						path: ['paragraphs'],
					});
				}
			}

			if (data.type === 'RMMCQ') {
				if (!data.passage) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Passage is required for RMMCQ',
						path: ['passage'],
					});
				}
				if (!data.options || !Array.isArray(data.options)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Options are required and must be an array for RMMCQ',
						path: ['options'],
					});
				}
				if (!data.correct_options || !Array.isArray(data.correct_options)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'Correct options are required and must be an array of numbers for RMMCQ',
						path: ['correct_options'],
					});
				}
			}
		}),
});

export { createQuestionSchema };
