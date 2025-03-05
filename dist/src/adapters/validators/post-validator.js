"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsQuerySchema = exports.createPostSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.createPostSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().min(1).required(),
    title: joi_1.default.string().min(1).required(),
    body: joi_1.default.string().min(1).required()
});
exports.postsQuerySchema = joi_1.default.object({
    userId: joi_1.default.number().integer().min(1).required()
}).unknown(true);
