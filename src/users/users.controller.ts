import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.UsersService.create(email, password);
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    this.UsersService.findOne(id);
  }

}
