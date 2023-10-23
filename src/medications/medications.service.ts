import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  mongoose, { Model, ObjectId } from 'mongoose';
import { UpdateMedicationDto } from './dto/update-medications.dto';
import { GenericService } from 'src/common/generic/service.generic';
import { MedicationDto } from './dto/create-medication.dto';
import { Medication, MedicationDocument } from './schemas/medication.schema';

@Injectable()
export class MedicationsService extends GenericService<Medication, MedicationDto, UpdateMedicationDto, Model<MedicationDocument>> {
  constructor(
        @InjectModel(Medication.name) private medicationModel: Model<MedicationDocument>,
        ) {
    super(medicationModel);
  }
  async medicationsWeight(medications):Promise<number>{
    let medicationsId = medications.map(medicationId => {
      return {_id: new mongoose.Types.ObjectId(medicationId)}
    });
    try{
      const data = await this.medicationModel.aggregate([ 
        {$match: {$or: medicationsId}}, 
        {$unwind: '$weight'}, 
        {
          "$group": {
            "_id": null, 
              "total": { "$sum": "$weight" }
          }
        }
       ])
      return data[0].total;
    } catch(err){
      throw new InternalServerErrorException(this.internalServerErrorException);
    }
  }
}
