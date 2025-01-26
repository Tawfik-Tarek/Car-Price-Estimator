import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, name: string, password: string) {
    const user = this.repo.create({ name, email, password });
    this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async find(name: string) {
    const users = await this.repo.find({
      where: {
        name,
      },
    });

    return users;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user)
  }

  async remove(id: number){
    const user = await this.findOne(id);
    if (! user) {
        throw new Error("User not found")
    }

    return this.repo.remove(user)
  }
}
