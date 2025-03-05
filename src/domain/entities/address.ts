import { Model, ModelCtor, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/';
import User, { UserType } from './user';

export class Address extends Model {
    public userId!: number;
    public street!: string;
    public city!: string;
    public country!: string;
    public postalCode!: string;

    public user?: UserType;
}

const AddressModel: ModelCtor<Address> = Address;

AddressModel.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: { model: 'users', key: 'id' },
            onDelete: 'CASCADE'
        },
        street: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        postalCode: { type: DataTypes.STRING, allowNull: false }
    },
    { sequelize, tableName: 'addresses', timestamps: false }
);


export type AddressType = Address;
export default AddressModel;