"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_validator_1 = require("../validators/user-validator");
const logger_1 = __importDefault(require("../../infrastructure/logger"));
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll(req, res) {
        try {
            const { error, value } = user_validator_1.paginationSchema.validate(req.query);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger_1.default.error(`error: ${error.details[0].message}`);
                return;
            }
            const { pageNumber, pageSize } = value;
            const users = await this.userService.getUsers(pageNumber, pageSize);
            res.status(200).json({ status: true, message: "user found successfully", users });
        }
        catch (error) {
        }
    }
    async getCount(req, res) {
        try {
            logger_1.default.info(`About to get total number of user in the system`);
            const count = await this.userService.getUserCount();
            logger_1.default.info(`user count found successfully: ${JSON.stringify(count)}`);
            res.status(200).json({ status: true, message: "user count found successfully", count });
        }
        catch (error) {
            logger_1.default.error(`Error getting user: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                logger_1.default.error(`invalid id: ${id}`);
                res.json({ status: false, message: "invalid id" });
                return;
            }
            const user = await this.userService.getUserById(id);
            logger_1.default.info(`user found successfully: ${JSON.stringify(user)}`);
            res.status(200).json({ status: true, message: "user found successfully", user });
            res.json();
        }
        catch (error) {
            logger_1.default.error(`Error getting user: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
    async create(req, res) {
        try {
            logger_1.default.info('creating a new user');
            const { error, value } = user_validator_1.createUserSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger_1.default.error(`error: ${error.details[0].message}`);
                return;
            }
            const user = await this.userService.createUser(value);
            logger_1.default.info(`user created successfully: ${JSON.stringify(user)}`);
            res.status(200).json({ status: true, message: "user created successfully", user });
        }
        catch (error) {
            logger_1.default.error(`Error creating user: ${error}`);
            console.log(error);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
}
exports.UserController = UserController;
