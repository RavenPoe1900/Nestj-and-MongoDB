import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { droneWeightLimit } from 'src/common/const/drone.const';
import { URL } from 'url';

export type MedicationDocument = Medication & mongoose.Document;

@Schema()
export class Medication {
  @Prop({
    type: String,
    minlength: 1,
    maxlength: 100,
    required: [true, 'VALUE_IS_BLANK'],
    match: /^[A-Z0-9_]+$/g,
    unique: true
  })
  code: string;

  @Prop({
    type: String,
    minlength: 1,
    maxlength: 100,
    required: [true, 'VALUE_IS_BLANK'], 
    match: /^[a-zA-Z0-9_-]+$/g,
  })
  name: string;

  @Prop({
    type: Number,    
    min: 0.1,
    max: droneWeightLimit,
    required: [true, 'VALUE_IS_BLANK'],
  })
  weight: number;

  @Prop({
    minlength: 6,
    maxlength: 100,
    type: URL,
    required: [true, 'VALUE_IS_BLANK'], 
  })
  image: string;
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);

