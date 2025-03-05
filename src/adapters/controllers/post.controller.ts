import { Request, Response } from "express";
import { PostService } from "../../application/services/post.service";
import { createPostSchema, postsQuerySchema } from "../validators/post-validator";
import logger from "../../infrastructure/logger";

export class PostController {
    constructor(private postService: PostService) { }

    async getPostsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { error, value } = postsQuerySchema.validate(req.query);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger.error(`Error: ${error.details[0].message}`);
                return;
            }
            const posts = await this.postService.getPostsByUserId(value.userId);
            res.status(200).json({ status: true, message: "post found successfully", posts });;
        } catch (error) {
            logger.error(`Error getting posts: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }

    async createPost(req: Request, res: Response): Promise<void> {
        try {
            logger.info("Creating a new post");
            const { error, value } = createPostSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger.error(`Error: ${error.details[0].message}`);
                return;
            }
            const post = await this.postService.createPost(value);
            logger.info(`Post created successfully: ${JSON.stringify(post)}`);
            res.status(201).json({ status: true, message: "post created successfully", post });
        } catch (error) {
            logger.error(`Error creating post: ${error}`);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            logger.info(`About to delete post`);
            const id = Number(req.params.id);
            if (isNaN(id)) {
                logger.info(`About to delete post: ${id}`);
                res.json({ status: false, message: "Invalid post ID" });
                return;
            }
            await this.postService.deletePost(id);
            logger.info(`post deleted successfuly`);
            res.status(200).json({ status: true, message: "post deleted successfully" });
        } catch (error) {
            logger.error(`Error deleting post: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
}