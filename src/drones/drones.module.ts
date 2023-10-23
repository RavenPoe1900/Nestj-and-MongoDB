import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drone, DroneSchema } from './schemas/drone.schema';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { MedicationsModule } from 'src/medications/medications.module';
@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: Drone.name, schema: DroneSchema }]),
    MedicationsModule
  ],
  controllers: [DronesController],
  providers: [DronesService],
  exports: [DronesService]
})
export class DronesModule {}
