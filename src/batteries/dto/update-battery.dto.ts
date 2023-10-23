import { OmitType } from '@nestjs/swagger';
import { BatteryDto } from './create-battery.dto';

export class UpdateBatteryDto extends OmitType(BatteryDto, ["serialNumber"] as const){
}