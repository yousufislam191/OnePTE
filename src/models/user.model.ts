import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import Answer from './answer.model';

class User extends Model {
	public id!: number;
	public name!: string;
	public email!: string;
	public password!: string;
	public isAdmin!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
);

// User.hasMany(Answer, { foreignKey: 'user_id', as: 'answers' });

export default User;
