import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BatteryDocument = Battery & mongoose.Document;

@Schema()
export class Battery {
  @Prop({
    type: String,
    minlength: 1,
    maxlength: 100,
    required: [true, 'VALUE_IS_BLANK'],
  })
  serialNumber: string;

  @Prop({
    type: Number,    
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 100,
    required: [true, 'VALUE_IS_BLANK'],
  })
  batteryCapacity: number;
}

export const BatterySchema = SchemaFactory.createForClass(Battery);

