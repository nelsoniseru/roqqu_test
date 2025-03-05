"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepositoryImpl = void 0;
const post_1 = __importDefault(require("../../domain/entities/post"));
const user_1 = __importDefault(require("../../domain/entities/user"));
class PostRepositoryImpl {
    async findByUserId(userId) {
        const posts = await post_1.default.findAll({
            where: { userId },
            include: [{ model: user_1.default, as: "user" }],
        });
        return posts;
    }
    async save(post) {
        const created = await post_1.default.create(post);
        return created;
    }
    async delete(id) {
        const deleted = await post_1.default.destroy({ where: { id } });
        if (deleted === 0)
            throw new Error("Post not found");
    }
}
exports.PostRepositoryImpl = PostRepositoryImpl;
