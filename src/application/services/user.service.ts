import { UserRepository } from '../../domain/ports/user-repository';
import { User } from '../../domain/entities/user';

export class UserService {
  constructor(private userRepository: UserRepository) { }


  async getUsers(pageNumber: number, pageSize: number): Promise<User[]> {
    if (pageNumber < 0 || pageSize <= 0) {
      throw new Error('Invalid pagination parameters');
    }
    return this.userRepository.findAll(pageNumber, pageSize);
  }

  async getUserCount(): Promise<number> {
    return this.userRepository.count();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
     throw new Error("A user with this email already exists");
    }
    return this.userRepository.create(userData);
  }
}