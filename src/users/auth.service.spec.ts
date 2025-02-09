import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let testingUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    testingUsersService = {
      find: async (email: string) => {
        const filterdUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filterdUsers);
      },
      create: async (email: string, name: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          name,
          password,
        };
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: testingUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of Auth Service', async () => {
    expect(service).toBeDefined();
  });

  it('can create a new user with salted and hashed password', async () => {
    const user = await service.signup('tl@tt.tt', 'mee', '1234');
    expect(user.password).not.toEqual('1234');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error when user sign up with existed email', async () => {
    await service.signup('used@used.com', 'mee', '1234');

    await expect(service.signup('used@used.com', 'mee', '1234')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    expect(service.signin('hamo@kkk.kk', '12345')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('tl@tt.tt', 'mee', '1234');
    expect(service.signin('tl@tt.tt', '123')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct data are provided', async () => {
    await service.signup('tl@tt1.tt', 'me', '123');
    const user = await service.signin('tl@tt1.tt', '123');
    expect(user).toBeDefined();
  });
});
