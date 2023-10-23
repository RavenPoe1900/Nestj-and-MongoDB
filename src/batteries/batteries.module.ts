import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatteriesController } from './batteries.controller';
import { BatteriesService } from './batteries.service';
import { Battery, BatterySchema } from './schemas/battery.schema';
import { DronesModule } from 'src/drones/drones.module';
@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: Battery.name, schema: BatterySchema }]),
    DronesModule,
  ],
  controllers: [BatteriesController],
  providers: [BatteriesService],
  exports: [BatteriesService]
})
export class BatteriesModule {}
