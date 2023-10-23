import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { GenericService } from 'src/common/generic/service.generic';
import { BatteryDto } from './dto/create-battery.dto';
import { Battery, BatteryDocument } from './schemas/battery.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DronesService } from 'src/drones/drones.service';
import { droneQuantity } from 'src/common/const/drone.const';

@Injectable()
export class BatteriesService extends GenericService<Battery, BatteryDto, UpdateBatteryDto, Model<BatteryDocument>> {
  constructor(
        @InjectModel(Battery.name) private BatteryModel: Model<BatteryDocument>,
        private dronesService: DronesService,
        ) {
    super(BatteryModel);  }
    
    protected numberOfDrones: number = droneQuantity;

    @Cron(CronExpression.EVERY_12_HOURS)
    async checkDroneBatteryLevel() {
      const allDrones = await this.
      dronesService.find({}, "",
      { 
        limit: this.numberOfDrones, 
        skip: 0
      }) as any;
      let batteries: Array<BatteryDto> = allDrones.rows.map(drone => {
        return {
          serialNumber: drone.serialNumber,  
          batteryCapacity: drone.batteryCapacity,
          drone: drone._id,          
        }
      });
      this.create(batteries);
    }
}
