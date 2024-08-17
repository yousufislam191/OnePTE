import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
	return bcrypt.hash(password, 10);
};

export const comparePassword = async (
	candidatePassword: string,
	hashedPassword: string
): Promise<boolean> => {
	return bcrypt.compare(candidatePassword, hashedPassword);
};
