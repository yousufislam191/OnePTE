import { z } from 'zod';

const loginValidation = z.object({
	body: z.object({
		email: z.string().email({ message: 'Invalid email address' }).trim(),
		password: z
			.string()
			.trim()
			.min(8, { message: 'Password must be at least minimum 8 characters' })
			.trim(),
	}),
});

export { loginValidation };
