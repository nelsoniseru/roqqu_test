import { PostRepository } from "../../domain/ports/post-repository";
import PostModel, { PostType } from "../../domain/entities/post";
import UserModel from "../../domain/entities/user";

export class PostRepositoryImpl implements PostRepository {
    async findByUserId(userId: number): Promise<PostType[]> {
        const posts = await PostModel.findAll({
            where: { userId },
            include: [{ model: UserModel, as: "user" }],
        });
        return posts;
    }

    async save(post: Omit<PostType, "id" | "createdAt" | "user">): Promise<PostType> {
        const created = await PostModel.create(post);
        return created;
    }

    async delete(id: number): Promise<void> {
        const deleted = await PostModel.destroy({ where: { id } });
        if (deleted === 0) throw new Error("Post not found");
    }
}