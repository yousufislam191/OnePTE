import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class RO extends Model {
	public id!: number;
	public paragraphs!: string[];
}

RO.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
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
		modelName: 'ros',
	}
);

export default RO;
