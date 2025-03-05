"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../domain/entities/user"));
class UserRepositoryImpl {
    async findAll(pageNumber, pageSize) {
        return user_1.default.findAll({
            offset: pageNumber * pageSize,
            limit: pageSize
        });
    }
    async count() {
        return user_1.default.count();
    }
    async findById(id) {
        return user_1.default.findByPk(id);
    }
    async create(user) {
        const newUser = await user_1.default.create({
            ...user,
            createdAt: new Date()
        });
        return newUser;
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
