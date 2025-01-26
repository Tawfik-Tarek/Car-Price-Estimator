import { Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';

@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, name, password } = body;
    this.UsersService.create(email , name, password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.UsersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('name') name: string){
    return this.UsersService.find(name);
  }

  @Patch('/:id')
  updateUser(@Param("id") id: string,@Body() body: UpdateUserDto){
    return this.UsersService.update(parseInt(id) , body)
  }

  @Delete('/:id')
  deleteUser(@Param("id") id: string){
    return this.UsersService.remove(parseInt(id))
  }

}
