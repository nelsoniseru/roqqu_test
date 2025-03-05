"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const createUserRouter = (userController) => {
    const router = express_1.default.Router();
    router.get('/', userController.getAll.bind(userController));
    router.get('/count', userController.getCount.bind(userController));
    router.get('/:id', userController.getById.bind(userController));
    router.post('/', userController.create.bind(userController));
    return router;
};
exports.createUserRouter = createUserRouter;
