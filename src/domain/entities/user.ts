import { Model, ModelCtor, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/index'; 
import Address, { AddressType } from './address';
import Post, { PostType } from './post';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public createdAt!: Date;

  public address?: AddressType; 
  public posts?: PostType[]; 
}

const UserModel: ModelCtor<User> = User;

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, tableName: 'users', timestamps: false }
);


export type UserType = User;
export default UserModel;