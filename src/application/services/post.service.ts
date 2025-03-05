import { PostRepository } from "../../domain/ports/post-repository";
import { PostType } from "../../domain/entities/post";

export class PostService {
    constructor(private postRepository: PostRepository) { }

    async getPostsByUserId(userId: number): Promise<PostType[]> {
        return this.postRepository.findByUserId(userId);
    }

    async createPost(post: Omit<PostType, "id" | "createdAt" | "user">): Promise<PostType> {
        return this.postRepository.save(post);
    }

    async deletePost(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}