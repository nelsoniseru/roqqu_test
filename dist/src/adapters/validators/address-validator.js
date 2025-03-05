"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.createAddressSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.createAddressSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().min(1).required(),
    street: joi_1.default.string().min(1).required(),
    city: joi_1.default.string().min(1).required(),
    country: joi_1.default.string().min(1).required(),
    postalCode: joi_1.default.string().min(1).required()
});
exports.updateAddressSchema = joi_1.default.object({
    street: joi_1.default.string().min(1),
    city: joi_1.default.string().min(1),
    country: joi_1.default.string().min(1),
    postalCode: joi_1.default.string().min(1)
}).min(1);
