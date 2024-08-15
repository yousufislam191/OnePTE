import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';
import Question from './question.model';

class Answer extends Model {
	public id!: number;
	public user_id!: number;
	public question_id!: number;
	public answer_data!: any;
	public score!: any;
	public readonly submitted_at!: Date;
}

Answer.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		answer: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		score: {
			type: DataTypes.INTEGER,
		},
		submitted_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'answer',
	}
);

Answer.belongsTo(User, { foreignKey: 'user_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

export default Answer;
