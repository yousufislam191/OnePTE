import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class RMMCQ extends Model {
	public id!: number;
	public passage!: string;
	public options!: string[];
	public correct_options!: number[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
		modelName: 'rmmcqs',
	}
);

export default RMMCQ;
