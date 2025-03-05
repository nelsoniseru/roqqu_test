"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const address_1 = __importDefault(require("./address"));
const post_1 = __importDefault(require("./post"));
user_1.default.hasMany(post_1.default, { foreignKey: "userId", as: "posts" });
post_1.default.belongsTo(user_1.default, { foreignKey: "userId", as: "user" });
user_1.default.hasOne(address_1.default, { foreignKey: "userId", as: "address" });
address_1.default.belongsTo(user_1.default, { foreignKey: "userId", as: "user" });
exports.default = { User: user_1.default, Address: address_1.default, Post: post_1.default };
