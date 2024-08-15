import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const loginValidation = z.object({
	body: z.object({
		email: z.string().email({ message: 'Invalid email address' }).trim(),
		password: z
			.string()
			.trim()
			.min(8, { message: 'Password must be at least minimum 8 characters' }),
		// .regex(passwordValidation, {
		// 	message:
		// 		'Pssword must be at least 8 characters with one uppercase, lowercase, number and special character',
		// }),
	}),
});

export { loginValidation };
