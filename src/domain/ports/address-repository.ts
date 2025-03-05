import { AddressType } from "../entities/address";

export interface AddressRepository {
  findByUserId(userId: number): Promise<AddressType | null>;
  save(address: Omit<AddressType, "user">): Promise<AddressType>;
  update(userId: number, addressData: Partial<Omit<AddressType, "user">>): Promise<AddressType>;
}