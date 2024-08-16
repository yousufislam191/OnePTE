import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

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
		modelName: 'ros',
	}
);

export default RO;
