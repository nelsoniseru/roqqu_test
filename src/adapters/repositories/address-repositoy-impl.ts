import { AddressRepository } from '../../domain/ports/address-repository'
import AddressModel, { AddressType } from "../../domain/entities/address";
import UserModel from "../../domain/entities/user";

export class AddressRepositoryImpl implements AddressRepository {
    async findByUserId(userId: number): Promise<AddressType | null> {
        const address = await AddressModel.findOne({
            where: { userId },
            include: [{ model: UserModel, as: "user" }],
        });
        return address || null;
    }

    async save(address: Omit<AddressType, "user">): Promise<AddressType> {
        const created = await AddressModel.create(address);
        return created;
    }

    async update(userId: number, addressData: Partial<Omit<AddressType, "user">>): Promise<AddressType> {
        await AddressModel.update(addressData, { where: { userId } });
        const updated = await this.findByUserId(userId);
        if (!updated) throw new Error("Address not found");
        return updated;
    }
}