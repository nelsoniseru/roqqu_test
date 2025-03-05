import { AddressRepository } from "../../domain/ports/address-repository";
import { AddressType } from "../../domain/entities/address";

export class AddressService {
    constructor(private addressRepository: AddressRepository) { }

    async getAddressByUserId(userId: number): Promise<AddressType> {
        if (userId <= 0) throw new Error("Invalid userId");
        const address = await this.addressRepository.findByUserId(userId);
        if (!address) throw new Error("Address not found");
        return address;
    }

    async createAddress(address: Omit<AddressType, "user">): Promise<AddressType> {
        return this.addressRepository.save(address);
    }

    async updateAddress(userId: number, addressData: Partial<Omit<AddressType, "user">>): Promise<AddressType> {
        const updatedAddress = await this.addressRepository.update(userId, addressData);
        if (!updatedAddress) throw new Error("Address not found");
        return updatedAddress;
    }
}