import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';
import { GenericService } from 'src/common/generic.service';
import { DateRegisterModel } from 'src/database/mongoose/dateRegister/dateRegister.model';
import { SoftDeleteModel } from 'src/database/mongoose/softDelete/softDelete.model';
import { RoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schemas/role.entity';



@Injectable()
export class RolesService extends GenericService<Role, RoleDto, UpdateRoleDto, Model<RoleDocument>,
                                  DateRegisterModel<RoleDocument>, SoftDeleteModel<RoleDocument> > {
  constructor(
        @InjectModel(Role.name) private userModel: Model<RoleDocument>,
        @InjectModel(Role.name) dateRegisterModel: DateRegisterModel<RoleDocument>,
        @InjectModel(Role.name) softDeleteModel: SoftDeleteModel<RoleDocument>
        ) {
    super(userModel, dateRegisterModel, softDeleteModel);
  }
}