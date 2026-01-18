import { Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  // In-memory storage for demo purposes
  private usersStore: User[] = [
    {
      id: '1',
      email: 'demo@hdip.ai',
      name: 'Demo User',
      role: UserRole.USER,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as User,
    {
      id: '2',
      email: 'admin@hdip.ai',
      name: 'Admin User',
      role: UserRole.ADMIN,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as User,
  ];

  async create(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: (this.usersStore.length + 1).toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    
    this.usersStore.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersStore;
  }

  async findOne(id: string): Promise<User | null> {
    const user = this.usersStore.find((u) => u.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.usersStore.find((u) => u.email === email);
    return user || null;
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    const index = this.usersStore.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.usersStore[index] = {
      ...this.usersStore[index],
      ...updateData,
      updatedAt: new Date(),
    };
    
    return this.usersStore[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.usersStore.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.usersStore.splice(index, 1);
    return true;
  }
}
