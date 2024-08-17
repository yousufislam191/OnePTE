import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class RMMCQ extends Model {
	public id!: number;
	public passage!: string;
	public options!: string[];
	public correct_options!: number[];
}

RMMCQ.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
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
