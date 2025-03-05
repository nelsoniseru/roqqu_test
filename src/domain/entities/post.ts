import { Model, ModelCtor, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/index';
import User, { UserType } from './user';

export class Post extends Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public userId!: number;
  public createdAt!: Date;

  public user?: UserType;
}

const PostModel: ModelCtor<Post> = Post;

PostModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE'
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, tableName: 'posts', timestamps: false }
);


export type PostType = Post;
export default PostModel;