import express from "express";
import { PostController } from "../controllers/post.controller"

export const createPostRouter = (postController: PostController) => {
    const router = express.Router();

    router.get("/", postController.getPostsByUserId.bind(postController));

    router.post("/", postController.createPost.bind(postController));

    router.delete("/:id", postController.deletePost.bind(postController));

    return router;
};