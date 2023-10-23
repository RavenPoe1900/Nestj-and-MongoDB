import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { DroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Drone, DroneDocument } from './schemas/drone.schema';
import { GenericService } from 'src/common/generic/service.generic';
import { MedicationsService } from 'src/medications/medications.service';
import { ObjectId } from 'mongoose';
import { ObjectIdDto } from 'src/common/dto/findOne.dto';
import { populateDrone } from './populate/drone.populate';
import { DroneState } from 'src/common/enum/done/droneState.enum';
import { PaginationDroneDto } from './dto/pagination-drone.dto';
import { droneWeightLimit, droneQuantity } from 'src/common/const/drone.const';

@Injectable()
export class DronesService extends GenericService<Drone, DroneDto, UpdateDroneDto, Model<DroneDocument>> {
  constructor(
        @InjectModel(Drone.name) private droneModel: Model<DroneDocument>,
        private medicationsService: MedicationsService,
        ) {
    super(droneModel);    
  }
  protected minToFly = 25;
  protected numberOfDrones: number = droneQuantity;
  protected logicDroneState = {
    IDLE: (filter: FilterQuery<Drone>)=>{ 
      filter["$or"]=[
        {state:DroneState.DOWNLOADING},
        {state:DroneState.BROKEN},
        {state:DroneState.RETURNING}
      ];},
    LOADING: (filter: FilterQuery<Drone>)=>{ 
      filter["$and"]=[
        {state:DroneState.IDLE},
        {batteryCapacity:{$gte: this.minToFly}}
      ];},
    LOADED: (filter: FilterQuery<Drone>)=>{ 
      filter["state"]=DroneState.LOADING},
    DELIVERING: (filter: FilterQuery<Drone>)=>{ 
      filter["state"]=DroneState.LOADED},
    DELIVERED: (filter: FilterQuery<Drone>)=>{ 
      filter["state"]=DroneState.DELIVERING
    },
    RETURNING: (filter: FilterQuery<Drone>)=>{ 
      filter["state"] = DroneState.DELIVERED
    },
    DOWNLOADING: (filter: FilterQuery<Drone>)=>{ 
      filter["$or"]=[
        {state:DroneState.DELIVERED},
        {state:DroneState.DELIVERING},
        {state:DroneState.LOADED},
      ];},
  };

  async createDrone(dto:DroneDto, 
                    populate:  string | string[] | PopulateOptions | PopulateOptions[]
                    ): Promise<Drone>{
    const count = await this.repository.count({deletedAt: null }); 
    if (count > this.numberOfDrones)throw new BadRequestException(`There cannot be more than 10 drones.`);
    return await this.create(dto, populate);
  }
  protected async medicationsWeight(medications?: Array<ObjectId>): Promise<void>{
    if(medications){
      const weight = await this.medicationsService.medicationsWeight(medications);
      const weightLimit = droneWeightLimit;
      if(weight > weightLimit) 
        throw new BadRequestException(`The sum of the weight of the medications is greater
                          than the weight allowed by the drone. the maximum allowed weight
                          is ${droneWeightLimit} and it is being loaded with ${weight}`);
    }
  }

  protected filterDroneState(state:DroneState, filter: FilterQuery<Drone>): void{
    if(state) 
      if(this.logicDroneState[state])
        this.logicDroneState[state](filter);
  }

  protected ifUpdateMedecations(medications: Array<ObjectId>, state:DroneState){
    if(medications){
      if(medications.length === 0 &&
        state === DroneState.LOADING)
        throw new BadRequestException(`Drone is charging with no medication.`);

      if(medications.length > 0 &&(
        state === DroneState.DOWNLOADING ||
        state === DroneState.RETURNING))
        throw new BadRequestException(`IThe drone cannot be loaded for the 
                                       states downloading and returning.`); 
      if(state === DroneState.IDLE ||
        state === DroneState.DELIVERED ||
        state === DroneState.DELIVERING ||
        state === DroneState.BROKEN ||
        state === DroneState.LOADED)
        throw new BadRequestException(`It is not possible to upgrade to medications 
                                       if the drone status is not idle, delivered,
                                       delivering or loaded.`);  
    }

    if(state === DroneState.LOADING ||
      state === DroneState.DOWNLOADING ||
      state === DroneState.RETURNING)
      throw new BadRequestException(`For loading, downloading and returning operations,
      it is not possible to update the medications`);  

  }

  async update(updateDroneDto: UpdateDroneDto, id: ObjectIdDto): Promise<Drone>{    
    const filter: FilterQuery<Drone> = { _id: id, deletedAt: null};
    this.ifUpdateMedecations(updateDroneDto.medications, updateDroneDto.state)
    await this.medicationsWeight(updateDroneDto.medications);
    this.filterDroneState(updateDroneDto.state, filter)
    return this.updateById(
      filter,
      updateDroneDto,
      {populate:populateDrone});   
  }

  async findDrone(pagination: PaginationDroneDto){
    const filter : FilterQuery<Drone> = {};
    if(pagination.availableDrones)this.logicDroneState[DroneState.LOADING](filter);
    return this.find( filter, "",
    { 
      populate: populateDrone, 
      limit: this.numberOfDrones, 
      skip: 0
    });
  }
}
