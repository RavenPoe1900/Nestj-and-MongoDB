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
import { UpdateBatteryDto } from './dto/update-battery.dto';
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
import { IPageInfo } from 'src/common/interface/pageInfo.interface';
import { ResponseBatteryDto } from './dto/response-battery.dto';
import { BatteryDto } from './dto/create-battery.dto';
import { Battery } from './schemas/battery.schema';
import { ResponseFindBatteryDto } from './dto/response-findBattery.dto copy';
import { BatteriesService } from './batteries.service';
import { PaginationBatteryDto } from './dto/pagination-battery.dto';

const controllerName = 'Battery';

@Injectable()
@ApiTags('batteries')
@Controller('batteries')
export class BatteriesController{
  constructor(
    protected readonly service: BatteriesService,
    ) {}
    
  @Post()
  @ApiResponseSwagger(createSwagger(ResponseBatteryDto,controllerName))
  create(@Body()dto:BatteryDto): Promise<Battery>{   
    return this.service.create(dto)    
  }
  
  @Get()
  @ApiResponseSwagger(findSwagger(ResponseFindBatteryDto,controllerName))
  find(@Query()pagination: PaginationBatteryDto): Promise<IPageInfo<Battery>> {
    return this.service.find(
      {}, "", {limit: pagination.perPage, skip: pagination.page});
  }

  @Get(':id')
  @ApiResponseSwagger(findOneSwagger(ResponseBatteryDto,controllerName))
  findOne(@Param('id', ObjectIdValidationPipe)id: ObjectIdDto): Promise<Battery> {
     return this.service.findOne(
      { _id: id, deletedAt: null }, "", {});
  }

  @Patch(':id')
  @ApiResponseSwagger(updateSwagger(ResponseBatteryDto,controllerName))  
  update(
    @Param('id', ObjectIdValidationPipe)id: ObjectIdDto, 
    @Body() updateBatteryDto: UpdateBatteryDto): Promise<Battery> {   
     return this.service.updateById({ _id: id, deletedAt: null }, updateBatteryDto);   
  }

  @Delete(':id')
  @ApiResponseSwagger(deleteSwagger(ResponseBatteryDto,controllerName))  
  async delete(@Param('id', ObjectIdValidationPipe)id: ObjectId, @Query() query): Promise<Battery> {
    return this.service.delete(
      id, {_id: id, deletedAt: null}, {});
  }  
}