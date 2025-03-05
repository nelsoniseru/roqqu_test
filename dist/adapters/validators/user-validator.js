"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = exports.paginationSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.paginationSchema = joi_1.default.object({
    pageNumber: joi_1.default.number().integer().min(0).required(),
    pageSize: joi_1.default.number().integer().min(1).max(100).required()
}).unknown(true);
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    email: joi_1.default.string().email().required()
});
