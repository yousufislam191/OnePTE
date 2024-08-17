import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Question extends Model {
	public id!: number;
	public type!: 'SST' | 'RO' | 'RMMCQ';
	public title!: string;
	public sst_id?: number | null;
	public ro_id?: number | null;
	public rmmcq_id?: number | null;
}

Question.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM('SST', 'RO', 'RMMCQ'),
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		sst_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		ro_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		rmmcq_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: 'questions',
	}
);

export default Question;
