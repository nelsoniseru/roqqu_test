"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostRouter = void 0;
const express_1 = __importDefault(require("express"));
const createPostRouter = (postController) => {
    const router = express_1.default.Router();
    router.get("/", postController.getPostsByUserId.bind(postController));
    router.post("/", postController.createPost.bind(postController));
    router.delete("/:id", postController.deletePost.bind(postController));
    return router;
};
exports.createPostRouter = createPostRouter;
