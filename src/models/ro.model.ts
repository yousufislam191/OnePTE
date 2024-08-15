import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import Question from './question.model';

class RO extends Model {
	public id!: number;
	public paragraphs!: any;
}

RO.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		paragraphs: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'ro',
	}
);

RO.belongsTo(Question, { foreignKey: 'question_id' });

export default RO;
