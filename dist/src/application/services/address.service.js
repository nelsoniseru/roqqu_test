"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async getAddressByUserId(userId) {
        if (userId <= 0)
            throw new Error("Invalid userId");
        const address = await this.addressRepository.findByUserId(userId);
        if (!address)
            throw new Error("Address not found");
        return address;
    }
    async createAddress(address) {
        return this.addressRepository.save(address);
    }
    async updateAddress(userId, addressData) {
        const updatedAddress = await this.addressRepository.update(userId, addressData);
        if (!updatedAddress)
            throw new Error("Address not found");
        return updatedAddress;
    }
}
exports.AddressService = AddressService;
