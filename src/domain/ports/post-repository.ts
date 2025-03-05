import { PostType } from "../entities/post";

export interface PostRepository {
  findByUserId(userId: number): Promise<PostType[]>;
  save(post: Omit<PostType, "id" | "createdAt" | "user">): Promise<PostType>;
  delete(id: number): Promise<void>;
}