import { HttpCode } from '../constants';
import { IUserRegistrationInput } from '../interface/user.interface';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/user.model';
import { hashPassword } from '../utils/encryptedPassword';

class UserService {
	public async createUser(data: IUserRegistrationInput): Promise<string> {
		const isExist = await User.findOne({ where: { email: data.email } });
		if (isExist) {
			throw new HttpError(HttpCode.CONFLICT, 'User already exists');
		}
		await User.create({
			name: data.name,
			email: data.email,
			password: await hashPassword(data.password),
		});
		return 'User created successfully';
	}
}

export default new UserService();
