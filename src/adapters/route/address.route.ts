import express from "express";
import { AddressController } from "../controllers/address.controller";

export const createAddressRouter = (addressController: AddressController) => {
    const router = express.Router();

    router.get("/:userId", addressController.getAddressByUserId.bind(addressController));

    router.post("/", addressController.createAddress.bind(addressController));

    router.patch("/:userId", addressController.updateAddress.bind(addressController));

    return router;
};