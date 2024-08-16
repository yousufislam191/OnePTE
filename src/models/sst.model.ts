import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class SST extends Model {
	public id!: number;
	public time_limit!: number;
	public audio_files!: any;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

SST.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		audio_files: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		time_limit: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'ssts',
	}
);

export default SST;
