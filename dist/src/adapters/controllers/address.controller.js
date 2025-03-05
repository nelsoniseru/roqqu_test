"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const address_validator_1 = require("../validators/address-validator");
const logger_1 = __importDefault(require("../../infrastructure/logger"));
class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async getAddressByUserId(req, res) {
        try {
            logger_1.default.info("About to get address belonging to a user");
            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                logger_1.default.error(`Invalid userId: ${userId}`);
                res.json({ status: false, message: "Invalid userId" });
                return;
            }
            const address = await this.addressService.getAddressByUserId(userId);
            res.status(200).json({ status: true, message: "address found successfully", address });
        }
        catch (error) {
            logger_1.default.error(`Error getting address: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
    async createAddress(req, res) {
        try {
            logger_1.default.info("Creating a new address");
            const { error, value } = address_validator_1.createAddressSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger_1.default.error(`Error: ${error.details[0].message}`);
                return;
            }
            const address = await this.addressService.createAddress(value);
            logger_1.default.info(`Address created successfully: ${JSON.stringify(address)}`);
            res.status(200).json({ status: true, message: "address created successfully", address });
        }
        catch (error) {
            logger_1.default.error(`Error creating address: ${error}`);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    }
    async updateAddress(req, res) {
        try {
            logger_1.default.info("About to update address belonging to a user");
            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                res.json({ status: false, message: "Invalid userId" });
                return;
            }
            const { error, value } = address_validator_1.updateAddressSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger_1.default.error(`Error: ${error.details[0].message}`);
                return;
            }
            const updatedAddress = await this.addressService.updateAddress(userId, value);
            res.status(200).json({ status: true, message: "address updated successfully", updatedAddress });
        }
        catch (error) {
            logger_1.default.error(`Error updating address: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
}
exports.AddressController = AddressController;
