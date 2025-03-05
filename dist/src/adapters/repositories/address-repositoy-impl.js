"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepositoryImpl = void 0;
const address_1 = __importDefault(require("../../domain/entities/address"));
const user_1 = __importDefault(require("../../domain/entities/user"));
class AddressRepositoryImpl {
    async findByUserId(userId) {
        const address = await address_1.default.findOne({
            where: { userId },
            include: [{ model: user_1.default, as: "user" }],
        });
        return address || null;
    }
    async save(address) {
        const created = await address_1.default.create(address);
        return created;
    }
    async update(userId, addressData) {
        await address_1.default.update(addressData, { where: { userId } });
        const updated = await this.findByUserId(userId);
        if (!updated)
            throw new Error("Address not found");
        return updated;
    }
}
exports.AddressRepositoryImpl = AddressRepositoryImpl;
