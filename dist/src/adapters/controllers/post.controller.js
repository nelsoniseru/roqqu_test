"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_validator_1 = require("../validators/post-validator");
const logger_1 = __importDefault(require("../../infrastructure/logger"));
class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getPostsByUserId(req, res) {
        try {
            const { error, value } = post_validator_1.postsQuerySchema.validate(req.query);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger_1.default.error(`Error: ${error.details[0].message}`);
                return;
            }
            const posts = await this.postService.getPostsByUserId(value.userId);
            res.status(200).json({ status: true, message: "post found successfully", posts });
            ;
        }
        catch (error) {
            logger_1.default.error(`Error getting posts: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
    async createPost(req, res) {
        try {
            logger_1.default.info("Creating a new post");
            const { error, value } = post_validator_1.createPostSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger_1.default.error(`Error: ${error.details[0].message}`);
                return;
            }
            const post = await this.postService.createPost(value);
            logger_1.default.info(`Post created successfully: ${JSON.stringify(post)}`);
            res.status(201).json({ status: true, message: "post created successfully", post });
        }
        catch (error) {
            logger_1.default.error(`Error creating post: ${error}`);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    }
    async deletePost(req, res) {
        try {
            logger_1.default.info(`About to delete post`);
            const id = Number(req.params.id);
            if (isNaN(id)) {
                logger_1.default.info(`About to delete post: ${id}`);
                res.json({ status: false, message: "Invalid post ID" });
                return;
            }
            await this.postService.deletePost(id);
            logger_1.default.info(`post deleted successfuly`);
            res.status(200).json({ status: true, message: "post deleted successfully" });
        }
        catch (error) {
            logger_1.default.error(`Error deleting post: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
}
exports.PostController = PostController;
