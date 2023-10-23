import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { droneWeightLimit } from 'src/common/const/drone.const';
import { DroneModel } from 'src/common/enum/done/droneModel.enum';
import { DroneState } from 'src/common/enum/done/droneState.enum';
import { Medication } from 'src/medications/schemas/medication.schema';

export type DroneDocument = Drone & mongoose.Document;

@Schema()
export class Drone {
  @Prop({
    type: String,
    minlength: 1,
    maxlength: 100,
    required: [true, 'VALUE_IS_BLANK'],
    unique:true,
  })
  serialNumber: string;

  @Prop({
    type: Number,    
    min: 0.1,
    max: droneWeightLimit,
    required: [true, 'VALUE_IS_BLANK'],
  })
  weightLimit: number; 

  @Prop({
    type: Number,    
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 100,
    required: [true, 'VALUE_IS_BLANK'],
  })
  batteryCapacity: number;

  @Prop({
    type: String,
    enum: Object.keys(DroneState),
    required: [true, 'VALUE_IS_BLANK'],
  })
  state: DroneState;

  @Prop({
    type: String,
    enum: Object.keys(DroneModel),
    required: [true, 'VALUE_IS_BLANK'],
  })
  model: DroneModel;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId], 
    ref:'Medications',
    required: false,
  })
  medications: Medication [];
}

export const DroneSchema = SchemaFactory.createForClass(Drone);

