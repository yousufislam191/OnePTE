import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import Question from './question.model';

class RMMCQ extends Model {
	public id!: number;
	public passage!: string;
	public options!: any;
}

RMMCQ.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		passage: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		options: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		correct_options: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'rmmcq',
	}
);

RMMCQ.belongsTo(Question, { foreignKey: 'question_id' });

export default RMMCQ;
