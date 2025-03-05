"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async getPostsByUserId(userId) {
        return this.postRepository.findByUserId(userId);
    }
    async createPost(post) {
        return this.postRepository.save(post);
    }
    async deletePost(id) {
        await this.postRepository.delete(id);
    }
}
exports.PostService = PostService;
