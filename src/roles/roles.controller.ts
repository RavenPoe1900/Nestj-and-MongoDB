import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ObjectIdValidationPipe } from 'src/utils/validationPipe/objectId.validationPipe';
import { ObjectId } from 'mongoose';

@Controller('roles')
// @UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() userDto: RoleDto) {
    return this.rolesService.create(userDto);
  }
  
  @Get()
  find(){//: Promise<Role[]> {
    return this.rolesService.find();
  }

  @Get(':id')
  async findOne(@Param('id', ObjectIdValidationPipe)id: ObjectId): Promise<any> {
    return await this.rolesService.findOne({_id:id});
  }

  @Patch(':id')
  async update(@Param('id', ObjectIdValidationPipe)id: ObjectId, @Body() updateRoleDto: UpdateRoleDto): Promise<any> {
   return await this.rolesService.updateById( {_id: id, isDeleted: false} ,updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id', ObjectIdValidationPipe)id: ObjectId): Promise<any> {
    return this.rolesService.delete(id,{_id: id, isDeleted: true});
  }
}
