"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const sequelize_1 = require("sequelize");
const infrastructure_1 = __importDefault(require("../../infrastructure/"));
class Address extends sequelize_1.Model {
}
exports.Address = Address;
const AddressModel = Address;
AddressModel.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
    },
    street: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    postalCode: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { sequelize: infrastructure_1.default, tableName: 'addresses', timestamps: false });
exports.default = AddressModel;
