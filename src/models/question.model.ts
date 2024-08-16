import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface QuestionAttributes {
	id: number;
	type: 'SST' | 'RO' | 'RMMCQ';
	title: string;
	sst_id?: number | null;
	ro_id?: number | null;
	rmmcq_id?: number | null;
}

// Attributes for model creation (id is optional when creating a new record)
interface QuestionCreationAttributes
	extends Optional<QuestionAttributes, 'id'> {}

class Question
	extends Model<QuestionAttributes, QuestionCreationAttributes>
	implements QuestionAttributes
{
	public id!: number;
	public type!: 'SST' | 'RO' | 'RMMCQ';
	public title!: string;
	public sst_id?: number | null;
	public ro_id?: number | null;
	public rmmcq_id?: number | null;

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
		sst_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'ssts',
				key: 'id',
			},
		},
		ro_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'ros',
				key: 'id',
			},
		},
		rmmcq_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'rmmcqs',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		tableName: 'questions',
	}
);

export default Question;
