import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const registrationValidation = z.object({
	body: z.object({
		name: z.string().min(3, { message: 'Name at least 3 characters' }),
		email: z.string().email({ message: 'Invalid email address' }).trim(),
		password: z.string().trim().regex(passwordValidation, {
			message:
				'Pssword must be at least 8 characters with one uppercase, lowercase, number and special character',
		}),
	}),
});

export { registrationValidation };
