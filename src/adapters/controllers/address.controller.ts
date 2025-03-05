import { Request, Response } from "express";
import { AddressService } from "../../application/services/address.service";
import { createAddressSchema, updateAddressSchema } from "../validators/address-validator";
import logger from "../../infrastructure/logger";

export class AddressController {
    constructor(private addressService: AddressService) { }

    async getAddressByUserId(req: Request, res: Response): Promise<void> {
        try {
            logger.info("About to get address belonging to a user");

            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                logger.error(`Invalid userId: ${userId}`);
                res.json({ status: false, message: "Invalid userId" });
                return;
            }
            const address = await this.addressService.getAddressByUserId(userId);
            res.status(200).json({ status: true, message: "address found successfully", address });
        } catch (error) {
            logger.error(`Error getting address: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }

    async createAddress(req: Request, res: Response): Promise<void> {
        try {
            logger.info("Creating a new address");
            const { error, value } = createAddressSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger.error(`Error: ${error.details[0].message}`);
                return;
            }
            const address = await this.addressService.createAddress(value);
            logger.info(`Address created successfully: ${JSON.stringify(address)}`);
            res.status(200).json({ status: true, message: "address created successfully", address })
        } catch (error) {
            logger.error(`Error creating address: ${error}`);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    }

    async updateAddress(req: Request, res: Response): Promise<void> {
        try {
            logger.info("About to update address belonging to a user");

            const userId = Number(req.params.userId);
            if (isNaN(userId)) {
                res.json({ status: false, message: "Invalid userId" });
                return;
            }
            const { error, value } = updateAddressSchema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
                logger.error(`Error: ${error.details[0].message}`);
                return;
            }
            const updatedAddress = await this.addressService.updateAddress(userId, value);
            res.status(200).json({ status: true, message: "address updated successfully", updatedAddress })
        } catch (error) {
            logger.error(`Error updating address: ${error}`);
            res.status(400).json({ status: false, message: `${error}` });
        }
    }
}