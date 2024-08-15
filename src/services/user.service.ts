import { IUserRegistrationInput } from '../interface/user.interface';
import User from '../models/user.model';
import { hashPassword } from '../utils/encryptedPassword';

class UserService {
	public async createUser(data: IUserRegistrationInput): Promise<string> {
		await User.create({
			name: data.name,
			email: data.email,
			password: await hashPassword(data.password),
		});
		return 'User created successfully';
	}
}

export default new UserService();
