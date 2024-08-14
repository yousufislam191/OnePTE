import { IUserRegistrationInput } from '../interface/user.interface';
import User from '../models/user.model';
import { hashPassword } from '../utils/encryptedPassword';

class UserService {
	public async createUser(data: IUserRegistrationInput) {
		return await User.create({
			data: data.name,
			email: data.email,
			password: await hashPassword(data.password),
		});
	}
}

export default new UserService();
