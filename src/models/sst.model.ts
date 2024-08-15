import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import Question from './question.model';

class SST extends Model {
	public id!: number;
	public time_limit!: number;
	public audio_files!: any;
}

SST.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		audio_files: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		time_limit: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'ssts',
	}
);

SST.belongsTo(Question, { foreignKey: 'question_id' });

export default SST;
