import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    this.repo.save(user);
  }

  findOne(id: number) {
    const user = this.repo.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  find(name: string) {
    const user = this.repo.find({
      where: {
        name,
      },
    });

    return user;
  }

}
