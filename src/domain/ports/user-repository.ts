import { User } from '../entities/user';

export interface UserRepository {
    findAll(pageNumber: number, pageSize: number): Promise<User[]>;
    count(): Promise<number>;
    findById(id: number): Promise<User | null>;
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
  }
  
  