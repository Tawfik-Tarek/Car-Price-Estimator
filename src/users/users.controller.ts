import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private UsersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, name, password } = body;
    return this.authService.signup(email, name, password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.authService.signin(email, password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.UsersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.UsersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.UsersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.UsersService.remove(parseInt(id));
  }
}
