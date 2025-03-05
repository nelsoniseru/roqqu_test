"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers(pageNumber, pageSize) {
        if (pageNumber < 0 || pageSize <= 0) {
            throw new Error('Invalid pagination parameters');
        }
        return this.userRepository.findAll(pageNumber, pageSize);
    }
    async getUserCount() {
        return this.userRepository.count();
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        return user;
    }
    async createUser(userData) {
        return this.userRepository.create(userData);
    }
}
exports.UserService = UserService;
