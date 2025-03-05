import { UserRepository } from '../../domain/ports/user-repository';
import User, { UserType } from '../../domain/entities/user';

export class UserRepositoryImpl implements UserRepository {
    async findAll(pageNumber: number, pageSize: number): Promise<UserType[]> {
        return User.findAll({
            offset: pageNumber * pageSize,
            limit: pageSize
        });
    }

    async count(): Promise<number> {
        return User.count();
    }

    async findById(id: number): Promise<UserType | null> {
        return User.findByPk(id);
    }

    async create(user: Omit<UserType, 'id' | 'createdAt'>): Promise<UserType> {
        const newUser = await User.create({
            ...user,
            createdAt: new Date()
        });
        return newUser;
    }

  async findByEmail(email: string): Promise<UserType | null> {
      const user = await User.findOne({ where: { email } });
      return user || null;
}
}