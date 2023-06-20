import { Controller, Get, Post, Body, Param, Delete, Patch} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ObjectIdValidationPipe } from 'src/utils/validationPipe/objectId.validationPipe';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }
  
  @Get()
  find(){//: Promise<User[]> {
    return this.usersService.find({}, "", {populate:{path:'role'}, limit: 2, skip: 4});
  }

  @Get(':id')
  findOne(@Param('id', ObjectIdValidationPipe)id: ObjectId): Promise<any> {
    return this.usersService.findOne({_id:id});
  }

  @Patch(':id')
  update(@Param('id', ObjectIdValidationPipe)id: ObjectId, @Body() updateUserDto: UpdateUserDto): Promise<any> {
   return this.usersService.updateById( {_id: id, isDeleted: false} ,updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ObjectIdValidationPipe)id: ObjectId): Promise<any> {
    return this.usersService.delete(id,{_id: id, isDeleted: true});
  } 

}
