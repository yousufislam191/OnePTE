import { HttpCode } from '../constants';
import { ILogin } from '../interface/auth.interface';
import { IId } from '../interface/user.interface';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/user.model';
import { comparePassword } from '../utils/encryptedPassword';

class AuthService {
	public async login(data: ILogin): Promise<IId> {
		const isExist = await User.findOne({ where: { email: data.email } });
		if (!isExist) {
			throw new HttpError(
				HttpCode.NOT_FOUND,
				`User not found with this email ${data.email}`
			);
		} else if (!(await comparePassword(data.password, isExist.password))) {
			throw new HttpError(HttpCode.UNAUTHORIZED, 'Wrong password');
		} else {
			return { id: isExist.id };
		}
	}
}

export default new AuthService();
