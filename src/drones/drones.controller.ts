import { 
   Body, 
   Controller, 
   Delete, 
   Get, 
   Injectable, 
   Param, 
   Patch, 
   Post, 
   Query, 
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { DroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Drone } from './schemas/drone.schema';
import { DronesService } from './drones.service';
import { ObjectIdDto } from 'src/common/dto/findOne.dto';
import { ObjectIdValidationPipe } from 'src/common/validationPipe/objectId.validationPipe';
import { ApiResponseSwagger } from 'src/common/swagger/response.swagger';
import { 
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger
} from 'src/common/swagger/http.swagger';
import { ResponseDroneDto } from './dto/response-drone.dto';
import { IPageInfo } from 'src/common/interface/pageInfo.interface';
import { PaginationDroneDto } from './dto/pagination-drone.dto';
import { ResponseFindDroneDto } from './dto/response-findDrone.dto';
import { populateDrone } from './populate/drone.populate';
import { DroneState } from 'src/common/enum/done/droneState.enum';

const controllerName = 'Drone';

@Injectable()
@ApiTags('drones')
@Controller('drones')
export class DronesController{
  constructor(
    protected readonly service: DronesService,
    ) {}

  @Post()
  @ApiResponseSwagger(createSwagger(ResponseDroneDto,controllerName))
  create(@Body()dto:DroneDto): Promise<Drone>{    
    return this.service.createDrone(dto, populateDrone);
  }
  
  @Get()
  @ApiResponseSwagger(findSwagger(ResponseFindDroneDto,controllerName))
  find(@Query()pagination: PaginationDroneDto): Promise<IPageInfo<Drone>> {
   return this.service.findDrone(pagination);
  }

  @Get(':id')
  @ApiResponseSwagger(findOneSwagger(ResponseDroneDto,controllerName))
  findOne(@Param('id', ObjectIdValidationPipe)id: ObjectIdDto): Promise<Drone> {
     return this.service.findOne(
      {
        _id: id, deletedAt: null }, 
        "",
       { populate: populateDrone });
  }

  @Patch(':id')
  @ApiResponseSwagger(updateSwagger(ResponseDroneDto,controllerName))  
  update(
  @Param('id', ObjectIdValidationPipe)id: ObjectIdDto,
  @Body() updateDroneDto: UpdateDroneDto): Promise<Drone> {   
    return this.service.update(updateDroneDto, id);
  }

  @Delete(':id')
  @ApiResponseSwagger(deleteSwagger(ResponseDroneDto,controllerName))  
  async delete(
    @Param('id', ObjectIdValidationPipe)id: ObjectId, 
    @Query() query): Promise<Drone> {
    return this.service.delete(
      id,
      {
        _id: id, 
        deletedAt: null,
        or:[
          {state:DroneState.BROKEN},
          {state:DroneState.IDLE}
        ]
      },
      {populate:populateDrone});
  }
}