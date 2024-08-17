import { z } from 'zod';

const submitAnswerSchema = z.object({
	body: z.object({
		questionId: z.number().int().positive({ message: 'Invalid id' }),
		answerData: z.union([z.string(), z.array(z.number())]),
	}),
});

export { submitAnswerSchema };
