import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class RO extends Model {
	public id!: number;
	public paragraphs!: string[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
