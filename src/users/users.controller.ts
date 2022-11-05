import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile, Req, Res, StreamableFile, HttpStatus, Header, Headers, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { ObjectId } from 'mongoose';
import { join } from 'path';
import { UploadConfig } from 'src/utils/dto/uploadConfig';
import { multerConfig } from 'src/utils/functions';
import { ImageValidationPipe } from 'src/utils/validationPipe/isImage.validationPipe';
import { PdfValidationPipe } from 'src/utils/validationPipe/isPdf.validationPipe';
import { PowerPointValidationPipe } from 'src/utils/validationPipe/isPowerPoint.validationPipe';
import { VideoValidationPipe } from 'src/utils/validationPipe/isVideo.validationPipe';
import { ObjectIdValidationPipe } from 'src/utils/validationPipe/objectId.validationPipe';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { uploadConfig } from 'config/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
