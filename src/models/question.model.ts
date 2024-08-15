import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Question extends Model {
	public id!: number;
	public type!: string;
	public title!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
	},
	{
		sequelize,
		tableName: 'questions',
	}
);

export default Question;
