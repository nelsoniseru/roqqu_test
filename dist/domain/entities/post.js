"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../../infrastructure/index"));
class Post extends sequelize_1.Model {
}
exports.Post = Post;
const PostModel = Post;
PostModel.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    body: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
    },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW }
}, { sequelize: index_1.default, tableName: 'posts', timestamps: false });
exports.default = PostModel;
