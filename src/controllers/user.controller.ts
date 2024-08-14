import { Request, Response } from 'express';
import userService from '../services/user.service';
import { IUserRegistrationInput } from '../interface/user.interface';

class UserController {
	public async register(req: Request, res: Response): Promise<void> {
		const input: IUserRegistrationInput = req.body;
		const result = await userService.createUser(input);
		res.json(result);
	}
}

export default new UserController();
