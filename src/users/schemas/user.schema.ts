import * as validator from 'validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/roles/schemas/role.entity';


export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  })
  firstName: string;

  @Prop({
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  })
  lastName: string;

  @Prop({
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: [true, 'PASSWORD_IS_BLANK'],
  })
  password: string;

  @Prop({
    type: String,
    lowercase: true,
    validate: validator.isEmail,
    maxlength: 255,
    minlength: 6,
    required: [true, 'EMAIL_IS_BLANK'],
  })
  email: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref:'Role',
    required: [true, 'ROLE_IS_BLANK'],
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

