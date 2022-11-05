import * as validator from 'validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  })
  name: string;

  @Prop({
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, 'INFO_IS_BLANK'],
  })
  info: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

