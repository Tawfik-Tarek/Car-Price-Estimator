import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let mockAuthService: Partial<AuthService>;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockAuthService = {
      signup: (email: string, name: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          name,
          password,
        };
        return Promise.resolve(user);
      },
      signin: (email: string, password: string) =>
        Promise.resolve({
          id: Math.floor(Math.random() * 99999),
          email,
          name: email,
          password,
        }),
    };

    mockUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'any@any.any',
          name: 'any',
          password: 'any',
        });
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: Math.floor(Math.random() * 99999),
            email,
            name: 'any',
            password: 'any',
          },
        ]);
      },
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({
          id,
          email: 'any@any.any',
          name: 'any',
          password: 'any',
          ...attrs,
        });
      },
      remove: (id: number) => {
        return Promise.resolve({
          id,
          email: 'any@any.any',
          name: 'any',
          password: 'any',
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a lsit of users with same email', async () => {
    const users = await controller.findAllUsers('me@me.me');
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('me@me.me');
  });

  it('findUser returns a user with id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });

  it('signin works', async () => {
    const session = { userId: null };
    const user = await controller.signin(
      { email: 'any@any.any', name: 'me', password: '1234' },
      session,
    );
    expect(user).toBeDefined();
    expect(user.email).toBe('any@any.any');
    expect(session.userId).toEqual(user.id);
  });
});
