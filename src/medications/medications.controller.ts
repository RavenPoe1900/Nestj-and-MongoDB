import { 
   Body, 
   Controller, 
   Delete, 
   FileTypeValidator, 
   Get, 
   Injectable, 
   MaxFileSizeValidator, 
   Param, 
   ParseFilePipe, 
   Patch, 
   Post, 
   Query,
   UploadedFile,
   UseInterceptors, 
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { UpdateMedicationDto } from './dto/update-medications.dto';
import { MedicationsService } from './medications.service';
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
import { ResponseMedicationDto } from './dto/response-medication.dto';
import { MedicationDto } from './dto/create-medication.dto';
import { Medication } from './schemas/medication.schema';
import { PaginationMedicationDto } from './dto/pagination-medication.dto';
import { ResponseFindMedicationDto } from './dto/response-findMedication.dto copy';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; 

const controllerName = 'Medication';

@Injectable()
@ApiTags('medications')
@Controller('medications')
export class MedicationsController{
  constructor(
    protected readonly service: MedicationsService,
    ) {}
    
  @Post()
  @ApiResponseSwagger(createSwagger(ResponseMedicationDto,controllerName))
  @UseInterceptors(FileInterceptor('file'))
  create(@Body()dto:MedicationDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
          new FileTypeValidator({fileType: /\.(jpg|jpeg|png)$/}),
          new MaxFileSizeValidator({ maxSize: 1000000 }),
      ],
  })
  ) file: Express.Multer.File): Promise<Medication>{    
    return this.service.create(dto);
  }
  
  @Get()
  @ApiResponseSwagger(findSwagger(ResponseFindMedicationDto,controllerName))
  find(@Query()pagination: PaginationMedicationDto): Promise<IPageInfo<Medication>> {
    return this.service.find({},"",{limit: pagination.perPage, skip: pagination.page});
  }

  @Get(':id')
  @ApiResponseSwagger(findOneSwagger(ResponseMedicationDto,controllerName))
  findOne(@Param('id', ObjectIdValidationPipe)id: ObjectIdDto): Promise<Medication> {
     return this.service.findOne({ _id: id, deletedAt: null });
  }

  @Patch(':id')
  @ApiResponseSwagger(updateSwagger(ResponseMedicationDto,controllerName))  
  update(
    @Param('id', ObjectIdValidationPipe)id: ObjectIdDto, 
    @Body() updateMedicationDto: UpdateMedicationDto): Promise<Medication> {   
     return this.service.updateById({ _id: id, deletedAt: null }, updateMedicationDto);   
  }

  @Delete(':id')
  @ApiResponseSwagger(deleteSwagger(ResponseMedicationDto,controllerName))  
  async delete(@Param('id', ObjectIdValidationPipe)id: ObjectId, @Query() query): Promise<Medication> {
    return this.service.delete(id,{_id: id, deletedAt: null});
  }
}