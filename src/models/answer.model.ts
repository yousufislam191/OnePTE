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
	public max_score!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Answer.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id',
			},
		},
		question_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: 'questions',
				key: 'id',
			},
		},
		answer: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		score: {
			type: DataTypes.INTEGER.UNSIGNED,
			defaultValue: 0,
		},
		max_score: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'answers',
		indexes: [
			{
				fields: ['user_id'],
			},
		],
	}
);

// Answer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

export default Answer;
