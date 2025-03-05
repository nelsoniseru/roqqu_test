"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressRouter = void 0;
const express_1 = __importDefault(require("express"));
const createAddressRouter = (addressController) => {
    const router = express_1.default.Router();
    router.get("/:userId", addressController.getAddressByUserId.bind(addressController));
    router.post("/", addressController.createAddress.bind(addressController));
    router.patch("/:userId", addressController.updateAddress.bind(addressController));
    return router;
};
exports.createAddressRouter = createAddressRouter;
