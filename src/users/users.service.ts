import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { GenericService } from 'src/common/generic.service';
import { DateRegisterModel } from 'src/database/mongoose/dateRegister/dateRegister.model';
import { SoftDeleteModel } from 'src/database/mongoose/softDelete/softDelete.model';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService extends GenericService<User, UserDto, UpdateUserDto, Model<UserDocument>,
                                  DateRegisterModel<UserDocument>, SoftDeleteModel<UserDocument> > {
  constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(User.name) dateRegisterModel: DateRegisterModel<UserDocument>,
        @InjectModel(User.name) softDeleteModel: SoftDeleteModel<UserDocument>
        ) {
    super(userModel, dateRegisterModel, softDeleteModel);
  }
}
