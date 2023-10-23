import { PartialType } from '@nestjs/swagger';
import { MedicationDto } from './create-medication.dto';

export class UpdateMedicationDto extends PartialType(MedicationDto){
}
